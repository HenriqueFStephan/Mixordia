from flask import Flask
from routes.add_follower import follower_data
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


app.register_blueprint(follower_data)


if __name__ == '__main__':
    app.run(debug=True)
