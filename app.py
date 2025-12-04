from flask import Flask, render_template, request, jsonify
import re
import html

app = Flask(__name__)

def split_sentences(text):
    # split on end punctuation followed by space(s)
    sentences = re.split(r'(?<=[.!?])\s+', text.strip())
    return [s for s in sentences if s]

def summarize_text(text, max_sent=2):
    sents = split_sentences(text)
    if not sents:
        return ""
    return " ".join(sents[:max_sent])

def highlight_keywords(text, keywords=None):
    if keywords is None:
        keywords = ["important", "note", "key", "main"]
    # escape user text to avoid HTML injection
    escaped = html.escape(text)
    # replace keywords with <mark>keyword</mark> (case-insensitive)
    def repl(m):
        return f"<mark>{m.group(0)}</mark>"
    for kw in keywords:
        # use word boundary to avoid partial matches
        pattern = re.compile(rf'\b({re.escape(kw)})\b', flags=re.IGNORECASE)
        escaped = pattern.sub(repl, escaped)
    # preserve line breaks as <br>
    escaped = escaped.replace("\n", "<br>")
    return escaped

@app.route("/", methods=["GET"])
def home():
    return render_template("index.html")

@app.route("/process", methods=["POST"])
def process():
    data = request.get_json(silent=True) or {}
    text = data.get("text", "").strip()
    if not text:
        return jsonify({"error": "No text provided"}), 400

    summary = summarize_text(text, max_sent=2)
    highlighted = highlight_keywords(text)

    return jsonify({
        "summary": html.escape(summary).replace("\n","<br>"),
        "highlighted": highlighted
    })

if __name__ == "__main__":
    app.run(debug=True)
