"""
api.whiteboard_routes.py

All API routes for the whiteboard
"""
import uuid
from flask import Blueprint, jsonify
from engines.whiteboard import Whiteboard


board_bp = Blueprint("boards", __name__, url_prefix="/boards")

# the path is {base_url}/api/boards/____
# use `url_for("api.boards._____")` to reference these endpoints 


@board_bp.post("/create")
def create():
    board = Whiteboard(str(uuid.uuid4()))

    print(f"board created: {board.idnum}")
    
    return jsonify({"board_id": board.idnum})
