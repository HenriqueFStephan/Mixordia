from flask import Flask
from routes.follower_functions import follower_data
from routes.google_drive_images import google_drive_bp
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Set SMTP variables (these could also be moved to .env)
os.environ['SMTP_USER'] = 'mixordianewsletter@gmail.com'
os.environ['SMTP_PASSWORD'] = 'ocgs wwvp ivxi smta'
os.environ['SMTP_SERVER'] = 'smtp.gmail.com'
os.environ['SMTP_PORT'] = '587'

app = Flask(__name__)
CORS(app)

# Register Blueprints
app.register_blueprint(follower_data)
app.register_blueprint(google_drive_bp)

if __name__ == '__main__':
    app.run(debug=True)
