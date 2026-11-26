"""
app.py

The entry point and startup space for the web app
"""
from flask import Flask, render_template
from api.api_parent import api_bp

app = Flask(__name__)
app.register_blueprint(api_bp)


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


if __name__ == "__main__":
    app.run(debug=True)