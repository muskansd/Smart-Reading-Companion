// Elements
const textBox = document.getElementById("textBox");
const charCount = document.getElementById("charCount");
const wordCount = document.getElementById("wordCount");
const form = document.getElementById("mainForm");
const submitBtn = document.getElementById("submitBtn");
const summaryBox = document.getElementById("summaryBox");
const highlightBox = document.getElementById("highlightBox");

function updateCounts() {
  const text = textBox.value || "";
  charCount.textContent = `${text.length} chars`;
  const words = text.trim().split(/\s+/).filter(w => w.length);
  wordCount.textContent = `${words.length} words`;
  // auto-resize
  textBox.style.height = "auto";
  textBox.style.height = Math.min(textBox.scrollHeight, 520) + "px";
}

if (textBox) {
  textBox.addEventListener("input", updateCounts);
  // initial
  updateCounts();
}

// Submit handler uses fetch to call /process and update outputs
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const text = textBox.value.trim();
    if (!text) {
      summaryBox.innerText = "Please paste or type some text.";
      highlightBox.innerHTML = "";
      return;
    }
    submitBtn.disabled = true;
    submitBtn.textContent = "Processing...";
    try {
      const res = await fetch("/process", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ text })
      });
      const data = await res.json();
      if (!res.ok) {
        summaryBox.innerText = data.error || "Processing error";
        highlightBox.innerHTML = "";
      } else {
        summaryBox.innerHTML = data.summary || "";
        highlightBox.innerHTML = data.highlighted || "";
      }
    } catch (err) {
      summaryBox.innerText = "Network error";
      highlightBox.innerHTML = "";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Generate";
    }
  });

  // Ctrl+Enter to submit
  window.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "Enter") {
      form.requestSubmit();
    }
  });
}
