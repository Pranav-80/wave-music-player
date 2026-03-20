# 🌊 Wave Music Player

A sleek, responsive, client-side web music player built entirely from scratch. Wave features a modern, dark-themed UI inspired by popular streaming platforms, allowing users to browse albums, control playback, and manage volume seamlessly.

🎥 Project Demo

https://github.com/user-attachments/assets/bea42bfb-b796-483d-bdb8-97f29d55bc20

## ✨ Key Features
* **Dynamic Song Library:** Uses JavaScript to dynamically generate playlists and album cards based on local folder structures.
* **Full Audio Controls:** Play, pause, skip forward, and skip backward functionality.
* **Interactive Timeline:** Clickable seek bar that visually updates in real-time alongside the track's duration.
* **Volume Management:** Custom volume rocker with quick mute/unmute toggles and dynamic UI icons based on volume levels.
* **Responsive Layout:** Adapts to smaller screens with a custom hamburger menu that slides the library sidebar in and out.
* **JSON Metadata Parsing:** Fetches album art, artist names, and titles via localized `info.json` files.

## 🛠️ Tech Stack
* **HTML5:** Semantic structure and native `<audio>` API integration.
* **CSS3:** Custom styling, flexbox/grid layouts, CSS transitions, filter inversions, and media queries for mobile responsiveness.
* **Vanilla JavaScript (ES6+):** Advanced DOM manipulation, asynchronous fetching (`async/await`), event listeners, and time-formatting logic.

## ⚠️ Important Note on Execution (CORS & Directory Fetching)
This project uses the JavaScript `fetch` API to dynamically read the local `/songs` directory to build the library. Because modern web browsers and cloud hosting platforms (like GitHub Pages) block directory listing for security reasons, **this player will not load the music library if hosted statically on the web.**

To experience the fully functional player, it must be run on a local development server.

## 🚀 How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Pranav-80/wave-music-player.git](https://github.com/Pranav-80/wave-music-player.git)
