# Making HTML Templates

##### LyleSnake | November 11, 2026

When making a website, there are several different approaches to how to set up the navigation. Do you make separate, complete, whole HTML pages and link them together in an index? Do you make one base HTML and switch out parts with JavaScript? 

Well, my preferred approach is to use Flask's `render_template()` function with Jinja2 templates. I like it because Flask gives me complete control over the URL and API, and it's also a good excuse to use Python (my favorite programming language). The web app foundation allows me to add extra app functionality, which we will explore in this project. The Jinja templates allow me to have one template with my site-wide features like navbar and footer, and simply write each page's unique content and swap them in and out, avoiding copying and pasting the same HTML on each page. 

This method is known as server-side rendering. Since we are going to add user accounts, we will be able to attach permissions to those accounts and check authorization on the server. Then, if the user is not authorized, they will not be able to see the pages even if they make the API request manually. 

## Base Template

The `main.html` is our base template. It is the app shell, and it is what unifies the entire page. It contains the navbar and the footer, which we want to show up on every page so people instantly know that the entire site is WhiteBoard. 

I won't go over every aspect of it, since most of it is Bootstrap and plain HTML, but the Jinja template part is here: 

```html
<main class="main-content">
    {% block content %}
    {% endblock %}
</main>
```

I set up a custom class for the main content so that we can use CSS to style it later. Then I use Jinja's "block content" and "endblock" template tags, which essentially tell the Jinja that, when it is given a block, to place that block right here. The "content" part is a custom name, and it could be anything, but "content" is the conventional word to use. "Title", "subtitle", and "script" are some other common block names that I have seen. 


## Making Blocks

A block is basically a puzzle piece; it is a customizable section of a page. The rest of `main.html` is the entire puzzle with a hole in the middle. In this hole, we can swap out the different puzzle pieces. 

For example, take the placeholder HTML for the Projects page. 

```html
{% extends "main.html" %}
{% block content %}

<h1>Projects</h1>

<p>Placeholder text</p>

{% endblock %}
```
On its own, this page is just a single header and a one-line paragraph, but after it is rendered with Jinja, it inherits the base template's HTML structure and content. 

The "extends" keyword tells Jinja which template to inherit from (an app can have more than one base template). The "block" keyword tells Jinja that the actual custom content to show on the template we extended is starting now. The "content" keyword says that this is the block named "content", so the parent template must provide space for a block of the same name. Then the "endblock" keyword tells Jinja the content block is done.

Before the app is rendered in the browser, Jinja builds the page. That's what the `render_template()` function does. The browser receives a complete HTML document to display. 

This can be verified by using the developer tools in the browser and viewing the HTML. 

```html
<body>
    <nav class="navbar navbar-expand-lg bg-body-tertirary" style="background-color: var(--navbar-bg);" data-bs-theme="light">
        ...
    </nav>	
    <main class="main-content">
        <h1>Projects</h1>
        <p>Placeholder text</p>
    </main>
    <footer>
        <p>© 2026 WhiteBoard</p>
    </footer>
</body>
``` 

As seen above, the `<main>` tag is filled with the text from `projects.html`. 

## Linking HTML Templates with Flask

In order for the app to know *when* to render a template, it is necessary to set up navigation endpoints. 

There are probably lots of valid ways to do this, but in my experience, the simplest way is to use Flask's `app.get()` decorator and create a matching function that returns the rendered template. The `app.get()` decorator takes the address `/projects` as an argument, and does something when a GET request is made at that address. 

```python
@app.get("/projects")
def projects():
    return render_template("projects.html")
```

The GET request is linked in the navbar: 

```html
<li class="nav-item">
    <a class="nav-link" href="/projects">Projects</a>
</li>
```

The navbar item uses HTML's `href` attribute to link to the URL we used for the endpoint. 

Essentially, this is the high-level overview of the process: 

Step 1: User clicks the `Projects` button in the navbar. 
Step 2: The browser goes to `http://127.0.0.1:5000/projects`, sending a GET request to `/projects`.
Step 3: Flask receives the request and executes our custom `projects()` function.
Step 4: Flask passes `projects.html` to Jinja in the `render_template("projects.html")` function.
Step 5: Jinja renders the template. 
    Step 5.1: Jinja reads `projects.html` and sees the `{% extends "main.html" %}` keyword
    Step 5.2: Jinja reads `main.html` and sees `{% block content %}` and `{% endblock %}`
    Step 5.3: Jinja goes back to `projects.html` and pastes everything inside of `{% block content %}` into `main.html` in its `block content` section
    Step 5.4: Jinja generates a completed HTML string with no Jinja syntax and sends it back to the caller, Flask
Step 6: Flask returns the response to the browser
Step 7: The browser shows the exact content we wanted to see at `http://127.0.0.1:5000/projects` 

## Changing URLs 

One major drawback of this approach, however, is that all the URL linked in the navbar has to match exactly with the Flask decorator. What if the URL needs to change? That could mean going through the app's endpoints and templates, and looking for every mention of it, and updating it manually. Well, luckily Flask has the `url_for()` function that can help with this. 

Instead of hardcoding the path in the navbar like so: 

`<a class="nav-link" href="/projects">Projects</a>`

We can actually reference the function using Jinja: 

`<a href="{{ url_for('projects') }}">Projects</a>`

Then Flask can find the endpoint `projects` and use the correct URL, even if we change it in `app.py` later. 

## Spinning it up

Okay, enough explanation. How do we see it in action? 

When I set up a project, I always make a new folder for it, `cd` into that folder, then create a virtual environment: 

`python -m venv .venv` 

This ensures my project dependencies stay separate. Once the venv exists, VS Code can automatically enable it for you, but if you don't see `(.venv)` in your terminal, just execute: 

`.venv\Scripts\activate` (Windows)

Then once you see (.venv) in your terminal, install Flask:

`pip install flask` (all lowercase)

It will install the package and its dependencies (including Jinja). 

Then just start the app:

`python app.py` 

Navigate to the URL Flask gives you, and you'll be able to see it live. 

Example:

```
(.venv) PS C:\Users\Lyle\Documents\Python\whiteboard> python app.py
 * Serving Flask app 'app'
 * Debug mode: on
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on http://127.0.0.1:5000
Press CTRL+C to quit
```

## Conclusion

The Flask app server, written in Python, handles the routing. Flask comes with Jinja, a way to customize HTML pages with templates. Rendering HTML on the server means we can enforce permissions. 

It's customizable, scalable, and fun! 