from flask import Blueprint, request, jsonify, redirect
from controllers.follower_functions import send_confirmation_email, confirm_token, save_follower

follower_data = Blueprint('follower_data', __name__)

@follower_data.route('/send_confirmation_email', methods=['POST'])
def handle_send_confirmation_email():
    data = request.get_json()
    print(data)
    result = send_confirmation_email(data)
    return jsonify(result)

@follower_data.route('/confirm_email', methods=['GET'])
def handle_confirm_email():
    token = request.args.get('token')
    data = confirm_token(token)
    if data:
        result = save_follower(data['name'], data['email'])
        # ✅ Redirect to frontend confirmation page
        return redirect('http://localhost:3000') #/confirmation-success
    else:
        return redirect('http://localhost:3000') #/confirmation-failed
 