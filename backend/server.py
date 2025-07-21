from flask import Flask
from routes.follower_functions import follower_data
from flask_cors import CORS
import os

os.environ['SMTP_USER'] = 'henrique.f.stephan@gmail.com'
os.environ['SMTP_PASSWORD'] = 'dpso pczv mtvi lvwi'
os.environ['SMTP_SERVER'] = 'smtp.gmail.com'
os.environ['SMTP_PORT'] = '587'

app = Flask(__name__)
CORS(app)

# Register Blueprints
app.register_blueprint(follower_data)

if __name__ == '__main__':
    app.run(debug=True)
