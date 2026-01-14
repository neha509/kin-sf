// 1) Paste your Google Apps Script Web App URL here:
const GOOGLE_SHEETS_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbz0eef1kH1dghGDIYxofQdrYaBclDE05wsLWq5WzLSbaM-ucOZd-9jXAtdX4jfxquWP/exec";

const form = document.getElementById("waitlistForm");
const statusText = document.getElementById("statusText");
const submitBtn = document.getElementById("submitBtn");
document.getElementById("year").textContent = new Date().getFullYear();

// basic "source" tracking
const params = new URLSearchParams(window.location.search);
const source = params.get("src") || document.referrer || "direct";
document.getElementById("source").value = source;

function setStatus(msg, isError = false) {
  statusText.textContent = msg;
  statusText.style.color = isError
    ? "rgba(255,180,180,0.95)"
    : "rgba(207,199,184,0.95)";
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!GOOGLE_SHEETS_WEBAPP_URL || GOOGLE_SHEETS_WEBAPP_URL.includes("PASTE_")) {
    setStatus("Paste your Google Sheets endpoint URL into script.js.", true);
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Joining…";
  setStatus("");

  const payload = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    neighborhood: document.getElementById("neighborhood").value.trim(),
    excitedAbout: document.getElementById("excitedAbout").value.trim(),
    source: document.getElementById("source").value.trim(),
  };

  try {
    const res = await fetch(GOOGLE_SHEETS_WEBAPP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok || !data.ok) {
      throw new Error(data.error || `Request failed (${res.status})`);
    }

    form.reset();
    // keep source set after reset
    document.getElementById("source").value = source;

    setStatus("You’re on the list. We’ll be in touch soon.");
  } catch (err) {
    console.error(err);
    setStatus("Something went wrong. Try again in a moment.", true);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Join the waitlist";
  }
});
