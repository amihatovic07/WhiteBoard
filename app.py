import uuid
from flask import Flask, render_template, jsonify


app = Flask(__name__)


# navigation endpoints 

@app.route("/")
@app.route("/home")
def home():
    return render_template("home.html")

@app.route("/profile")
def profile():
    user = {"name": "John Doe"}
    return render_template("profile.html", user=user)

@app.route("/notes")
def notes():
    return render_template("notes.html")

@app.route("/clock")
def clock():
    return render_template("clock.html")

@app.route("/whiteboard")
def whiteboard():
    return render_template("whiteboard.html")

@app.route("/projects")
def projects():
    return render_template("projects.html")

@app.route("/forum")
def forum():
    return render_template("forum.html")

@app.post("/api/boards")
def create_board():
    board_id = str(uuid.uuid4())
    return jsonify({"board_id": board_id})



if __name__ == "__main__":
    app.run(debug=True)