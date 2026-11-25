"""
whiteboard.py

The backend for the whiteboard
"""

class Whiteboard:
    def __init__(self, idnum):
        self.idnum = idnum 
        self.authors = []

    def save_to_db(self):
        # Hey Alex this is where you can save the whiteboard to the database
        pass

    def add_author(self, new_author):
        try:
            if new_author not in self.authors:
                self.authors.append(new_author)
                return f"{new_author} added to contributors list"
            else:
                return f"{new_author} already in contributors list"
        except: 
            return "Something went wrong"


