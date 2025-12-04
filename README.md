Smart Reading Companion

A modern, web-based text assistant that summarizes text and highlights important keywords. Built with Python (Flask), HTML, CSS, and JavaScript, this app provides a smooth, interactive reading experience.

Features:

Paste or type any text into the app.

Live character and word count while typing.

Generate a short summary (first 2 sentences).

Highlight important keywords like "important", "note", "key", "main".

Modern and responsive UI with gradient backgrounds and glass-like cards.

Works entirely locally — no AI integration required.

Ctrl + Enter keyboard shortcut for quick submission.

Demo:
The app runs locally in your browser:

Start the Flask server: python app.py

Open http://127.0.0.1:5000
 in your browser.

Paste text, click Generate, and see the summary and highlights.

File Structure:
smart-reading-companion/

app.py (Flask backend)

templates/

index.html (Frontend HTML)

static/

styles.css (CSS styling)

script.js (Frontend JavaScript)

How It Works:

Frontend: Users type or paste text in a textarea. JavaScript updates live character/word counts.

Form Submission: Clicking Generate sends the text to the Flask backend using a POST request.

Backend Processing: Python splits text into sentences for summary and highlights predefined keywords.

Response: JSON response is sent back. JavaScript updates the summary and highlighted text dynamically.

Technologies Used:

Python 3.10+

Flask (lightweight web server)

HTML5 & CSS3 (modern layout and styling)

JavaScript (ES6) (dynamic interactivity and AJAX fetch)

Security & UX:

Escapes HTML input to prevent XSS attacks.

Highlights keywords safely using <mark> tags.

Auto-resizing textarea for better readability.

Responsive design ensures usability on mobile devices.

How to Run Locally:

Clone the repository: git clone <your-repo-url>

Navigate into the folder: cd smart-reading-companion

Install Flask: pip install flask

Start the app: python app.py

Open your browser at http://127.0.0.1:5000

Future Improvements:

Add custom keyword lists.

Allow downloadable summaries.

Include history tracking for past texts.

Enhance summary with more advanced logic (optional AI integration).
