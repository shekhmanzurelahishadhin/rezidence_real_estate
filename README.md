# Homely — Luxury Real Estate Next.js Template

A modern, **light-themed** luxury real estate website built with **Next.js 15 App Router**, **TypeScript**, and **Tailwind CSS v4**. Inspired by the Homely Framer template — featuring a bold hero with floating property cards, category grid, featured property spotlight, testimonials, blog strip, animated marquee ticker, FAQ accordion, and a full contact form.

---

## 📂 Folder Structure

```
rezidence/
├── package.json
├── tsconfig.json
├── next.config.mjs
└── src/
    ├── app/                          ← Next.js App Router pages
    │   ├── layout.tsx                ← Root layout (Navbar + Footer)
    │   ├── page.tsx                  ← Home page
    │   ├── properties/
    │   │   └── page.tsx              ← Properties listing
    │   ├── blogs/
    │   │   └── page.tsx              ← Blog listing + newsletter
    │   └── contact/
    │       └── page.tsx              ← Contact form + info
    ├── components/                   ← Reusable UI components
    │   ├── Navbar.tsx                ← Sticky nav with mobile menu
    │   ├── Footer.tsx                ← 4-col footer + newsletter
    │   ├── PropertyCard.tsx          ← Property card with gradient image
    │   ├── BlogCard.tsx              ← Blog card with gradient header
    │   └── FAQAccordion.tsx          ← Expandable FAQ items
    ├── assets/
    │   └── icons/
    │       └── index.tsx             ← 16 SVG icon components
    ├── data/
    │   └── index.ts                  ← All data + TypeScript interfaces
    └── styles/
        └── globals.css               ← Tailwind import + theme tokens + keyframes
```

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

### 3. Open in browser

```
http://localhost:3000
```

---

## 📄 Pages

| Route         | Description                                                        |
|---------------|--------------------------------------------------------------------|
| `/`           | Hero, categories, featured property, testimonials, blogs, FAQ, CTA |
| `/properties` | Full property grid with category filters                           |
| `/blogs`      | Blog articles with category filters + newsletter signup            |
| `/contact`    | Contact info, map placeholder, and submission form                 |

---

## 🎨 Design System

Defined in `globals.css` under `@theme`:

| Token                  | Value              |
|------------------------|--------------------|
| `--color-primary`      | `#1a1a2e`          |
| `--color-accent`       | `#e8a838` (gold)   |
| `--color-bg`           | `#ffffff`          |
| `--color-bg-gray`      | `#f5f5f7`          |
| `--font-display`       | Playfair Display   |
| `--font-sans`          | DM Sans            |

### Key Animations

| Class                  | Effect                              |
|------------------------|-------------------------------------|
| `.animate-fadeInUp`    | Fade + slide up on mount            |
| `.animate-marquee`     | Infinite horizontal scroll ticker   |
| `.animate-pulse-slow`  | Gentle opacity pulse                |

---

## 📦 Tech Stack

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4** (`tailwindcss` + `@tailwindcss/next`)
- **Google Fonts** — Playfair Display + DM Sans

---

## ✏️ Customisation

1. **Data** — Edit `src/data/index.ts` to add/remove properties, blogs, categories, and FAQs.
2. **Colors** — Change `--color-accent` in `globals.css` for a different brand colour.
3. **Fonts** — Swap the Google Fonts link in `layout.tsx` and update `--font-display` / `--font-sans`.
4. **Images** — Replace the gradient placeholders in `PropertyCard.tsx` and `BlogCard.tsx` with `<next/image>` pointing to real photos.
5. **Hero** — The hero pulls `properties[0]` as the featured listing. Swap the index or add a dedicated `heroProperty` export.
