from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
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
    
    # Get SendGrid API key from environment
    sendgrid_api_key = os.environ.get('SENDGRID_API_KEY')
    sender_email = os.environ.get('SMTP_USER', 'mixordianewsletter@gmail.com')

    try:
        message = Mail(
            from_email=sender_email,
            to_emails=email,
            subject=subject,
            html_content=html_body
        )
        
        sg = SendGridAPIClient(sendgrid_api_key)
        response = sg.send(message)
        
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


