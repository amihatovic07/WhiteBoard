from flask import Flask, render_template

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



if __name__ == "__main__":
    app.run(debug=True)