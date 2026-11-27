"""
api_parent.py

Registration for APIs
"""

from flask import Blueprint, jsonify, request
from api.whiteboard_routes import board_bp
from api.profile_routes import profiles_bp

api_bp = Blueprint("api", __name__, url_prefix="/api")

api_bp.register_blueprint(board_bp)
api_bp.register_blueprint(profiles_bp)

@api_bp.before_request
def log_api_request():
    print(f"API request received from {request.remote_addr} | method: {request.method} | endpoint: {request.path}")