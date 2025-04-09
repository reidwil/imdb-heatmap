# 📊 IMDb Episode Ratings Heatmap

A browser-based app that visualizes IMDb episode ratings for any TV show as a heatmap — one column per season, one row per episode. Built with Plotly.js and powered by the [OMDb API](http://www.omdbapi.com/).

![](/assets/example.png)

---

## 🔍 Features

- 🎬 Search any TV show by title
- 📈 View ratings across all seasons as a heatmap
- 🟥 Higher ratings are red, lower are green
- 🖱️ Hover to see episode title, rating, and season/episode
- 📱 Mobile-friendly layout
- 🖼️ Show poster displayed automatically

---

## 🚀 Live Demo

**[➡ View the app on Netlify](https://your-site-name.netlify.app)**  
(Replace with your actual Netlify URL)

---

## 🧪 Local Development

1. Clone the repo:
   ```bash
   git clone https://github.com/reidwil/imdb-heatmap.git
   cd imdb-heatmap
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Add your OMDb API key as an environment variable:
   ```bash
   export OMDB_API_KEY=your-api-key
   ```

4. Run the build script:
   ```bash
   node build.js
   ```

5. Open `index.html` in your browser (or serve it with `python -m http.server`).

---

## 🌍 Deployment via Netlify

1. Push the project to GitHub
2. Create a new Netlify site from that repo
3. In Netlify settings:
   - Set build command: `node build.js`
   - Set publish directory: `.`
   - Add environment variable: `OMDB_API_KEY = your-api-key`
4. Netlify will auto-inject your key during deploy and serve the app

---

## 📦 Files

- `index.html` – HTML structure
- `style.css` – Styles
- `script.js` – Heatmap logic
- `build.js` – Injects API key at build time
- `netlify.toml` – Netlify config

---

## 🔐 Notes on API Key Security

This setup injects the key at build time, so it’s not checked into version control.  
For full security, consider using Netlify functions to proxy API requests and hide the key from the browser.

---

## 🙌 Credits

- Plotly.js for the heatmap
- OMDb API for episode + rating data
- Poster art via IMDb/OMDb

---
