"""
api.whiteboard_routes.py

All API routes for the whiteboard
"""
import uuid
from flask import Blueprint, jsonify, request
from engines.whiteboard import Whiteboard
import data.board_manager as board_manager

board_bp = Blueprint("boards", __name__, url_prefix="/boards")

# the path for endpoints in this module is
#       {base_url}/api/boards/function
# use url_for("api.boards.function") to reference these endpoints elsewhere

@board_bp.post("/create")
def create():
    this_board = Whiteboard(str(uuid.uuid4()))

    this_board.add_self_to_data()

    print(f"board created: {this_board.b_id}")

    return jsonify({"board_id": this_board.b_id})

@board_bp.get("/<b_id>")
def load(b_id):
    print("msg from whiteboard load endpoint")
    try: 
        board_data = jsonify(board_manager.load(b_id))
        print(board_data)
        return board_data
    except:
        return {"error": "board not loaded"}

@board_bp.post("/save/<b_id>")
def save(b_id):
    try: 
        board_data = request.get_json()

        image_data = board_data["image_data"]
        date_last_updated = board_data["date_last_updated"]

        msg = board_manager.save(b_id, image_data, date_last_updated)

        if msg == "Success":
            return {"success": f"board {b_id} saved to dict"}, 200
        else:
            return {"error": "bad board ID"}, 400
    except:
        return {"error": "board not saved"}, 500

