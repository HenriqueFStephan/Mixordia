from flask import Flask
from routes.follower_functions import follower_data
from routes.google_drive_images import google_drive_bp
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Configure CORS to allow Vercel frontend and local development
CORS(app, resources={
    r"/*": {
        "origins": [
            "https://mixordia.vercel.app",
            "http://localhost:3000",
            "http://localhost:5000"
        ]
    }
})

# Register Blueprints
app.register_blueprint(follower_data)
app.register_blueprint(google_drive_bp)

if __name__ == '__main__':
    app.run(debug=True)
