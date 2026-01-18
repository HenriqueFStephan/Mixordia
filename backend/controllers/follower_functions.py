import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from itsdangerous import URLSafeTimedSerializer
import os
import json
from datetime import datetime

# This secret key MUST be constant. Store securely.
SECRET_KEY = 'your-very-secret-key'
CONFIRMATION_URL = 'http://localhost:5000/confirm_email'
FOLLOWERS_FILE = os.path.join(
    os.path.dirname(__file__),
    '..',
    'files',
    'followers.json'
)

FOLLOWERS_FILE = os.path.abspath(FOLLOWERS_FILE)

def generate_confirmation_token(follower_data: dict):
    serializer = URLSafeTimedSerializer(SECRET_KEY)
    # store entire form data inside the token
    return serializer.dumps(follower_data, salt='email-confirmation-salt')


def confirm_token(token, expiration=3600):
    serializer = URLSafeTimedSerializer(SECRET_KEY)
    try:
        data = serializer.loads(
            token,
            salt='email-confirmation-salt',
            max_age=expiration
        )
        # now "data" is the full follower dict
        return data
    except Exception:
        return False



def send_confirmation_email(data):
    # try both keys so you can rename later without breaking
    name = data.get('fullName') or data.get('name') or 'there'
    email = data.get('email')

    # token now includes ALL fields
    token = generate_confirmation_token(data)
    confirm_link = f"{CONFIRMATION_URL}?token={token}"

    html_body = f"""
        <html>
        <body>
            <div style="text-align: center;">
            <h2>Hi {name}, confirm your subscription to Mixordia's data base</h2>
            <p>
                <a href="{confirm_link}">Click here to confirm your email</a>
            </p>
            <p>Thanks for joining us!</p>
            </div>
        </body>
        </html>
    """

    subject = 'Please confirm your subscription'

    sender_email = os.environ.get('SMTP_USER')
    sender_password = os.environ.get('SMTP_PASSWORD')
    smtp_server = os.environ.get('SMTP_SERVER')
    smtp_port = int(os.environ.get('SMTP_PORT'))

    message = MIMEMultipart()
    message['From'] = sender_email
    message['To'] = email
    message['Subject'] = subject
    message.attach(MIMEText(html_body, 'html'))

    try:
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, email, message.as_string())

        return {'message': 'Confirmation email sent successfully!'}
    except Exception as e:
        return {'message': f'Failed to send email: {str(e)}'}



def save_follower(follower_data: dict):
    """
    follower_data: full dict from the form (decoded from token)
    """
    email = follower_data.get('email')

    follower_entry = {
        **follower_data,
        'date': datetime.now().strftime('%d/%m/%Y')
    }

    if not os.path.exists(FOLLOWERS_FILE):
        with open(FOLLOWERS_FILE, 'w') as f:
            json.dump([], f)

    with open(FOLLOWERS_FILE, 'r') as f:
        followers = json.load(f)

    # Optional: Check if email is already registered
    if any(f.get('email') == email for f in followers):
        return {'message': 'Email already confirmed and saved.'}

    followers.append(follower_entry)

    with open(FOLLOWERS_FILE, 'w') as f:
        json.dump(followers, f, indent=4)

    return {'message': 'Follower saved successfully.'}


