from flask import Blueprint, request, jsonify
from controllers.add_follower import handle_add_follower

follower_data = Blueprint('add_follower', __name__)



@follower_data.route('/add_follower', methods=['POST'])
def add_follower():
    data = request.get_json()
    result = handle_add_follower(data)
    return jsonify(result), 200

