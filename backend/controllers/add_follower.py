import os
import json
import datetime


def handle_add_follower(data):
    name = data.get('name')
    country = data.get('country')
    email = data.get('email')
    date = datetime.datetime.now().strftime("%d/%m/%Y")

    follower_entry = {
        "name": name,
        "country": country,
        "email": email,
        "date": date
    }

    json_path = os.path.join(os.path.dirname(__file__), '..', 'files', 'followers.json')

    # Load existing JSON data
    if os.path.exists(json_path):
        with open(json_path, 'r', encoding='utf-8') as f:
            try:
                json_data = json.load(f)
            except json.JSONDecodeError:
                json_data = {"data": {}}
    else:
        json_data = {"data": {}}

    # Use a unique key like a timestamp
    entry_id = datetime.datetime.now().strftime("%Y%m%d%H%M%S%f")
    json_data["data"][entry_id] = follower_entry

    # Save updated JSON back to file
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(json_data, f, ensure_ascii=False, indent=2)

    print(f"Name: {name}")
    print(f"Country: {country}")
    print(f"Email: {email}")
    print(f"Date: {date}")

    return {"message": "Follower submitted successfully!"}



