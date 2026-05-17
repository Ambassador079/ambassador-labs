# AMBSSADOR — name.labs Portfolio

A cinematic, premium frontend developer portfolio built with React, Framer Motion, GSAP, Lenis, and Tailwind CSS.

---

## ✦ Features

- **Cinematic Preloader** — Split-screen horizontal reveal with progress counter
- **Floating Glass Navbar** — Pill-shaped island with active section indicator & theme switcher
- **Hero Section** — Massive display type, mouse-reactive parallax, floating particles, typing animation
- **About Section** — Animated word-by-word headline, skill progress bars, floating stat cards
- **Tools Section** — Interactive icon grid + infinite horizontal ticker loop
- **Projects Section** — Featured 2 cards + "View All" expansion + full detail modal
- **Contact Section** — Glassmorphism form, copy-email button, social links
- **Footer** — Animated accent line, clean layout
- **5 Themes** — Matte Black, Midnight Blue, Neon Cyber, Haze, Pure White (with localStorage)
- **Custom Cursor** — Dual-ring cursor with spring lag effect
- **Mouse Glow** — Ambient light follows cursor
- **Grain Overlay** — Subtle film grain texture
- **Scroll Progress Bar** — Neon gradient progress indicator
- **Lenis Smooth Scroll** — Ultra-silky 60fps scrolling

---

## ✦ Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## ✦ Customization Guide

### 1. Personal Info
Edit these files:
- `src/components/sections/Hero.jsx` — SOCIAL_LINKS, hero text
- `src/components/sections/Contact.jsx` — EMAIL constant, SOCIAL_LINKS
- `src/components/layout/Footer.jsx` — Name, links

### 2. Projects
Edit `src/components/sections/Projects.jsx`:

```js
// In the PROJECTS array, replace each entry:
{
  id: 1,
  title: 'Your Project Name',
  subtitle: 'Short tagline',
  desc: 'Project description...',
  tech: ['React', 'Tailwind'],
  featured: true,        // ← Set to true for the first 2 shown
  color: '#00f5ff',      // ← Accent color for this card
  emoji: '🚀',           // ← Placeholder until you add real images
  live: 'https://your-live-site.com',
  github: 'https://github.com/you/repo',
  year: '2024',
  tag: 'Featured',
}
```

#### Adding real project images:
1. Place images in `src/assets/images/`
2. Import at top of `Projects.jsx`:
   ```js
   import proj1 from '../../assets/images/project1.png'
   ```
3. Replace the emoji display in `ProjectCard` with:
   ```jsx
   <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
   ```
4. Add `image: proj1` to the project object

### 3. Tools / Tech Stack
Edit `src/components/sections/Tools.jsx`:

#### Adding real PNG icons:
1. Place icons in `src/assets/icons/` (recommended: 64x64 or 128x128 PNG)
2. Import at top of `Tools.jsx`:
   ```js
   import reactIcon from '../../assets/icons/react.png'
   ```
3. Add `type: 'image', icon: reactIcon` to the tool entry
4. In `ToolCard`, replace the emoji div with:
   ```jsx
   {tool.type === 'image' 
     ? <img src={tool.icon} alt={tool.name} className="w-10 h-10 object-contain" />
     : <span>{tool.emoji}</span>
   }
   ```

### 4. Themes
Themes are defined in `src/index.css` under `[data-theme="..."]` selectors.
Theme IDs and labels are in `src/context/ThemeContext.jsx`.
Add new themes by adding a CSS block and a new entry to the `THEMES` array.

### 5. Contact Form
The form currently simulates submission. Integrate with a real service:

**Formspree** (easiest):
```js
const handleSubmit = async (e) => {
  e.preventDefault()
  setSending(true)
  await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  })
  setSending(false)
  setSent(true)
}
```

**EmailJS**: See https://emailjs.com/docs/

---

## ✦ Folder Structure

```
src/
├── assets/
│   ├── icons/          ← Place your tool PNG icons here
│   └── images/         ← Place your project screenshots here
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── sections/
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Tools.jsx
│   │   ├── Projects.jsx
│   │   └── Contact.jsx
│   └── ui/
│       ├── CustomCursor.jsx
│       ├── MouseGlow.jsx
│       ├── Preloader.jsx
│       └── ScrollProgress.jsx
├── context/
│   └── ThemeContext.jsx
├── hooks/
│   ├── useLenis.js
│   ├── useMagneticHover.js
│   └── useScrollProgress.js
├── App.jsx
├── index.css
└── main.jsx
```

---

## ✦ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI Framework |
| Tailwind CSS 3 | Utility styling |
| Framer Motion 11 | Animations & transitions |
| GSAP 3 | Magnetic hover effects |
| Lenis 1.1 | Smooth scrolling |
| Three.js | 3D capability (ready to use) |
| React Three Fiber | R3F wrapper (ready to use) |
| React Router | Navigation |
| Vite 5 | Build tool |

---

## ✦ Performance Tips

- All animations use `will-change` and GPU-accelerated transforms
- Framer Motion `useInView` with `once: true` prevents re-triggering
- Lenis uses `requestAnimationFrame` for 60fps scrolling
- Images: use WebP format at 2x resolution for retina displays
- Lazy load project images with React's `loading="lazy"` attribute

---

## ✦ Build for Production

```bash
npm run build
npm run preview
```

Deploy the `dist/` folder to Vercel, Netlify, or any static host.

---

## ✦ License

Personal use. Customize freely.

Built by **AMBSSADOR — name.labs** ✦
