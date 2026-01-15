# 🌍 Opportunities HQ Website

A student-first web platform built to **centralize scholarships, programs, competitions, and enrichment opportunities** in one accessible place.

This repository contains the **original implementation** of the Opportunities HQ website, which supported the organization during its early growth phase and is now preserved in **maintenance mode**.

---

## ✨ Overview

Students often face fragmented information spread across dozens of websites, newsletters, and social platforms. Opportunities HQ addressed this by offering:

* A **single discovery hub** for curated opportunities
* A **fast, no-login experience** accessible on school networks
* **Client-side persistence** so users could bookmark opportunities instantly

This codebase represents the technical foundation that enabled early adoption and scale.

---

## 📌 Project Status

**Status:** 🟡 Maintenance / Legacy

* The site is **no longer under active feature development**
* Core functionality remains intact
* Repository is retained for transparency, documentation, and future reference

This is a **completed, impact-driven project**, not an abandoned one.

---

## 🚀 Key Features

* **Opportunity Discovery**

  * JSON-based listings of academic and career opportunities
  * Category and keyword filtering for fast exploration

* **Bookmarks Without Accounts**

  * Persistent client-side bookmarks using browser `localStorage`
  * No authentication or personal data required

* **Lightweight & Accessible**

  * Static site architecture for fast load times
  * Designed to work on low-bandwidth school networks

* **Privacy-First Analytics**

  * SEO insights via Google Search Console
  * Traffic tracking using GoatCounter (no invasive user profiling)

---

## 🛠 Tech Stack

* **Frontend:** HTML, CSS, JavaScript
* **Data Layer:** JSON
* **Persistence:** Browser `localStorage`
* **Analytics:** Google Search Console, GoatCounter
* **Deployment:** Static hosting

---

## 📁 Project Structure

```text
/
├── index.html              # Main entry point
├── styles.css              # Global styles
├── script.js               # Filtering, bookmarks, UI logic
├── data/
│   └── opportunities.json  # Opportunity listings
└── assets/                 # Images and static assets
```

---

## 📈 Impact (During Active Use)

* Helped scale the student user base from **~1,000 to 17,500+**
* Supported broader community growth to **24,000+ social followers**
* Centralized resources that were previously scattered across platforms

---

## 🧠 Design Philosophy

* **Zero friction**: no accounts, no onboarding
* **Accessibility-first**: simple UI, low bandwidth
* **Privacy-conscious**: minimal tracking
* **Content scalability**: easy to update listings via JSON

---

## 🔧 Local Development (Optional)

```bash
git clone https://github.com/<org>/opportunities-hq
cd opportunities-hq
python -m http.server
```

Then open `http://localhost:8000` in your browser.

---

## 📝 Notes for Contributors & Reviewers

This repository is best viewed as:

* A snapshot of **early-stage nonprofit engineering**
* Evidence of **end-to-end ownership** (frontend, data, analytics)
* A foundation that could be modernized with a framework-based stack if revisited

---

## 📄 License

MIT License

---
