"""
data.board_manager.py

Storing/retrieving board data 
"""

# just a temporary dict until Alex builds the database 
boards = {}


def load(b_id):
    """
    Returns an existing board or None if that board ID was not found. 
    """
    print("data.board_manager.load() successfully called")
    print(boards)
    print(f"board id = {b_id}")

    if b_id in boards:
        return boards[b_id]
    else:
        return None

def save(b_id, b_image_data, b_date):
    """
    Saves updates to an existing board. 
    """
    print("data.board_manager.save() successfully called")
    print(boards)
    print(f"board id = {b_id}")

    if b_id in boards:
        boards[b_id]["image_data"] = b_image_data
        boards[b_id]["date_last_updated"] = b_date
        print("saved according to board manager")
        print(boards[b_id])
        return "Success"
    else:
        print("failed according to board manager")
        return "Failure"


