import uuid
from flask import Flask, render_template, jsonify


app = Flask(__name__)


# navigation endpoints 

@app.get("/")
def root():
    return render_template("home.html")

@app.get("/notes")
def notes():
    return render_template("notes.html")

@app.get("/whiteboard")
def whiteboard():
    return render_template("whiteboard.html")

@app.get("/projects")
def projects():
    return render_template("projects.html")

@app.get("/forum")
def forum():
    return render_template("forum.html")

@app.post("/api/boards")
def create_board():
    board_id = str(uuid.uuid4())
    return jsonify({"board_id": board_id})



if __name__ == "__main__":
    app.run(debug=True)