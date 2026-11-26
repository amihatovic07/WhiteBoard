"""
whiteboard.py

The backend for the whiteboard
"""
from datetime import datetime

from data.board_manager import boards as b

now = datetime.now()

class Whiteboard:
    def __init__(self, b_id):
        self.b_id = b_id 
        self.authors = []
        self.image_data = None
        self.date_created = now # the exact time it was initialized
        self.date_late_update = now # the exact time it was initialized


    def add_self_to_data(self):
        """
        This function is used to save a newly created board to the data store solution, be it a temporary dict or permanent database. 

        To save updates to an existing board, see the board_manager.
        """
        # Hey Alex this is where you can save the whiteboard to the database
        # just replace this function since it is only the temporary dict 
        
        b[self.b_id] = {
            "image_data": self.image_data,
            "authors": [author for author in self.authors],
            "date_created": self.date_created, # the exact time it was originally initialized
            "date_late_update": now # the exact time it was just saved
        }


    def add_author(self, new_author):
        try:
            if new_author not in self.authors:
                self.authors.append(new_author)
                return f"{new_author} added to contributors list"
            else:
                return f"{new_author} already in contributors list"
        except: 
            return "Something went wrong"


