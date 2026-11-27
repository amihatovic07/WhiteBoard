from flask import Blueprint, jsonify, request
import data.profile_manager as profile_manager

profiles_bp = Blueprint("profiles", __name__, url_prefix="/profiles")

@profiles_bp.get("/")
def all_profiles():
    return jsonify(profile_manager.get_all())

@profiles_bp.get("/<username>")
def one_profile(username):
    profile_data = profile_manager.get(username)
    if profile_data is None:
        return {"error": f"bad username: {username}"}, 404
    else:
        return jsonify(profile_data)

@profiles_bp.post("/save")
def save_profile():
    profile_data = request.get_json()

    username = profile_data.get("username")
    timezone = profile_data.get("timezone")

    is_saved = profile_manager.save_timezone(username, timezone)
    if not username:
        return {"error" : "bad username: {username}"}, 400
    elif is_saved == "failure":
        return {"error" : "bad timezone: {timezone}"}, 400
    else:
        return jsonify(profile_data)
