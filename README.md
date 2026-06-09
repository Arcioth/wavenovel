# Wavenovel

I wanted to make a custom version of wavemaker cards v4 as it was "lacking" in some places such as the UI in my case and decided to take this approach. Its fairly an upgrade to wacemaker but I plan on improving this further by adding zen mode and image support.

A beautiful, extensible, and powerful novel writing software.  
Wavenovel is a modernized and significantly upgraded fork of the acclaimed [Wavemaker-v4](https://github.com/wavemakercards/wavemaker-v4), engineered to provide a richer, more customizable writing experience.

---

## Core Features

- **Advanced Dynamic Theming** — Swap seamlessly between multiple tailored aesthetic themes (Dark, Cyberpunk, Glass, Purple, Gold, etc.) utilizing a CSS variable injection system.
- **Granular Color Overrides** — Take total control of your writing environment with HSLA sliders to override both Page Background and Typography colors globally.
- **Distraction-Free Typewriter Mode** — Focus entirely on your words with a beautiful, centered, distraction-free editing layout.
- **Modular Extensions Manager** — Enable or disable the features you actually need.
  - *Cards Database* — Track characters, locations, and lore seamlessly.
  - *Timeline & Snowflake* — Plan out your narrative structure.
  - *Mindmaps & Gridplanner* — Visually organize scenes and chapters.
- **Glassmorphism UI** — Deeply integrated blur overlays and window blackout controls for an immersive, premium interface.
- **Spellcheck Control** — Toggle your native browser's spellcheck engine on the fly directly from the settings.
- **Offline-First PWA** — Write anywhere, anytime. Wavenovel acts as a fully featured Progressive Web App. Your data stays with you.

---

## Installation & Setup

### Running Locally (Development)

Wavenovel is built using Vue 3 and Vite.

1. Clone the repository and install dependencies:
```bash
git clone https://github.com/Arcioth/wavenovel.git
cd wavenovel
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open `http://localhost:5173` in your browser.

### Building for Production

To compile the application for production (this will bundle the frontend and generate the PWA service workers):

```bash
npm run build
```

You can then host the contents of the `dist/` (or `docs/`) folder on any static web server (GitHub Pages, Netlify, Vercel, etc.).

---

## Credits & Acknowledgements

- **Original Developer**: [Iain / wavemakercards](https://github.com/wavemakercards) - The creator of the original Wavemaker-v4 engine.
- **Upgrades & Maintenance**: [Arcioth](https://github.com/Arcioth) - Rewritten theming engine, extensions module, UI/UX overhaul, and advanced settings.

---

## License

This project is open-source. Please refer to the repository for licensing information based on the original Wavemaker-v4 license.
