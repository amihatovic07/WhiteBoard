"""
api_parent.py

Registration for APIs
"""

from flask import Blueprint, jsonify, request
from api.whiteboard_routes import board_bp

api_bp = Blueprint("api", __name__, url_prefix="/api")

api_bp.register_blueprint(board_bp)

@api_bp.before_request
def log_api_request():
    print(f"API request received from {request.remote_addr} : {request.method} : {request.endpoint} : {request.path}")