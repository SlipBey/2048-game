# 🎮 2048 Game — Next.js + TypeScript + TailwindCSS

A modern recreation of the **2048** puzzle game, built using **Next.js App Router**, **TypeScript**, and **TailwindCSS**.  
Fast, minimal, and responsive — experience the classic logic challenge with a fresh look.

🔗 **Live Demo:** [https://2048-oyunu.vercel.app](https://2048-oyunu.vercel.app)

---

## 🚀 Features

- ⚡ **Next.js App Router** (v13+)
- 🧠 **TypeScript** type-safety
- 🎨 **TailwindCSS** responsive design
- 🎮 Keyboard & touch support
- 💾 Local score saving (via localStorage)
- 🔁 Restart & Undo functionality
- 🌙 Optional **Dark Mode**

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Framework | [Next.js 15](https://nextjs.org/docs) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [TailwindCSS](https://tailwindcss.com/) |
| Router | App Router |
| Hosting | [Vercel](https://vercel.com/) or custom server |

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/slipbey/2048-game.git
cd <repo>
```

Install dependencies:

```bash
npm install
# or
yarn install
```

Run the development server:

```bash
npm run dev
```

Then open your browser at:
```
http://localhost:3000
```

---

## 🧩 Project Structure

```
src/
 ├── app/
 │   ├── page.tsx          → Main game page
 │   ├── layout.tsx        → App layout
 │   └── globals.css       → Tailwind global styles
 ├── features/game/
 │   ├── Game2048.tsx      → Game board logic
 │   ├── ScoreBoard.tsx    → Score display
 │   ├── LoseOverlay.tsx   → Game over overlay
 │   ├── SizeSelector.tsx  → Grid size selection
 │   └── index.ts          → Game exports
 ├── lib/                  → Utilities and helpers
 └── ui/                   → Reusable UI components
```

---

## 🎯 Controls

| Key | Action |
|-----|--------|
| ⬆️ | Move Up |
| ⬇️ | Move Down |
| ⬅️ | Move Left |
| ➡️ | Move Right |
| R | Restart |

---

## 🧠 Developer Notes

The full 2048 logic (merge, movement, new tile generation, and win/loss detection)  
is implemented from scratch using a pure React + TypeScript state system.

Everything is written with maintainability and performance in mind.

Contributions are welcome! 🎉

---

## 📸 Preview

<p align="center">
  <img src="https://github.com/slipbey/2048-game/public/screenshot.png" width="500" alt="2048 Game Screenshot">
</p>

---

## 📄 License

GPL-3.0 license © 2025 — Created by Slipbey  
Feel free to use, modify, and distribute with attribution.

---

## 👨‍💻 Author

**SlipBey**  
[Discord](https://slip.slipyme.com/discord) • [LinkedIn](https://slip.slipyme.com/linkedin) • [Website](https://slip.slipyme.com)
