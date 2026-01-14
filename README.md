# KIN SF — Landing Page + Waitlist

**KIN SF** is a community strength gym concept based in San Francisco, integrating  
**strength training, education, mental well-being, and social connection** — built for people who want to get stronger and feel better.

This repository contains the initial landing page used to collect early interest and waitlist signups prior to launch.

---

## 🔗 Live Site

(Once deployed, add your link here)

Example:  
https://kin-sf.netlify.app

---

## ✨ Features

- Clean, responsive landing page
- Waitlist form with:
  - Name
  - Email
  - Optional neighborhood + phone
  - Optional interest notes
- Submissions stored automatically in **Google Sheets**
- Mobile-friendly and lightweight (no frameworks)

---

## 🧰 Tech Stack

- **HTML / CSS / JavaScript**
- **Google Apps Script** (acts as form → Google Sheets API)
- Hosting: Netlify (recommended) or similar static hosting

---

## 📋 How Waitlist Submissions Work

1. User submits form on the landing page
2. Frontend sends POST request to Google Apps Script Web App
3. Script validates fields and appends a new row to Google Sheet

No API keys are exposed in the frontend.

---

## 🚀 Local Development

You can run this locally by simply opening `index.html` in a browser.

For form submissions to work, you must:

1. Create a Google Sheet
2. Deploy the Apps Script as a Web App
3. Paste the Web App URL into:

```js
const GOOGLE_SHEETS_WEBAPP_URL = "https://script.google.com/macros/s/XXXX/exec";

