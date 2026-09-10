# Product Requirements Document (PRD) & Design Brief
**Project:** rogerthat.dev  
**Author:** Roger Martinez (Staff Systems Engineer / DevRel)  
**Status:** In Progress / v1.0 Baseline  
**Target Form Factor:** Desktop Web (Primary), Responsive Mobile (Secondary)

---

## 1. Executive Summary & Vision

**rogerthat.dev** is a personal engineering website, technical publication platform, and digital garden for Roger Martinez. It bridges deep technical systems engineering (distributed consensus, local-first architectures, web runtime internals, WASM) with developer relations and community craft.

The site embodies a **minimalist, high-performance, precision-engineered aesthetic**: ultra-fast load times, zero bloat, clean typography, and a deliberate editorial layout free of visual clutter or aggressive branding.

---

## 2. Core Objectives & Goals

1. **Portfolio & Professional Identity:** Serve as the authoritative canonical hub for Roger Martinez’s professional persona, open-source work, contact info, and social links.
2. **Long-Form Technical Writing (Blog):** Provide a distraction-free reading experience for essays, benchmarks, and deep-dive technical explorations.
3. **Microblog / Stream:** A dedicated space for ephemeral, low-friction micro-updates, TILs (Today I Learned), quick performance findings, and status notes without the ceremony of a full article.
4. **Ergonomic Information Architecture:** Clean separation between long-form writing and live stream updates, supported by intuitive global navigation and RSS feeds.

---

## 3. Visual Identity & Design System

*Based on Design System: `Precision Slate Minimal`*

* **Color Palette:**
  * **Primary Surface:** Crisp White (`#FFFFFF`) & Subtle Slate Neutral (`#F8F9FF` / `#EFF4FF`)
  * **Dividers & Borders:** Cool slate hairline borders (`#E2E8F0` / `#CBD5E1`)
  * **Text Primary:** Deep Slate/Zinc (`#0F172A`) for optimal contrast and readability
  * **Text Secondary & Muted:** Slate grey (`#475569` / `#64748B`) for metadata, timestamps, and subtitles
  * **Accents:** Minimal monochrome / terminal accents with subtle status badge tints (e.g., green live indicator, neutral category tags)
* **Typography:**
  * **Body & Headers:** Clean, highly legible sans-serif / humanist grotesk (`Hanken Grotesk` or system sans)
  * **Code, Metadata & Timestamps:** Monospace font for dates, tags, reading times, and technical specs (`JetBrains Mono`, `Fira Code`, or monospace fallbacks)
* **Design Tenets:**
  * Strict whitespace rhythm and hairline border separation.
  * No superfluous shadows, heavy gradients, or decorative clutter.
  * Information density balanced with editorial clarity.

---

## 4. Information Architecture & Navigation

### 4.1 Header & Global Navigation
* **Brand Lockup:**
  * Icon / Logo: `R/M` minimalist terminal monogram.
  * Site URL / Brand title: `rogerthat.dev`.
  * Top-right sub-bar or metadata status (default `FIREBASE / CLOUD / DEVREL`).
* **Sub-Header Navigation Bar:**
  * Dedicated horizontal bar below the site identity.
  * Right-aligned primary routes:
    * `Home` (Active state indicated with subtle underline)
    * `Blog` (Archive of all long-form essays)
    * `Github` (External link to code repositories)
    * `LinkedIn` (External link to professional network)

### 4.2 Home Page Structure (`/`)
1. **Hero & Profile Block:**
   * High-fidelity portrait photo of Roger Martinez.
   * Name, version badge (`v3.9.3`), contact email (`roger@email.com`), and role title (`Staff Systems Engineer / Developer Relations Engineer`).
   * Concise bio blurb articulating focus areas: *Distributed consensus, local-first architectures, web runtime internals, and developer ergonomics.*
2. **Main Content Grid (Two-Column Layout):**
   * **Left Column — Recent Writing (Primary Feed):**
     * Section header with total publication count counter (`Explore all essays & articles ->`).
     * List of the last 5 published technical articles.
     * Each article entry includes:
       * Monospaced publication date and read-time estimate (e.g., `2025.05.12 · 00 · 8 min read`).
       * Bold, high-contrast article title.
       * 1–2 sentence substantive excerpt / synopsis.
       * Category tags (e.g., `#distributed-systems`, `#sqlite`, `#wasm`, `#rust`, `#performance`).
   * **Right Column — Microblog & Status Notes (Side Pane):**
     * Narrow secondary column for quick updates and sync notes.
     * Section title: `Status & Notes` (`MICRO // SYNC`).
     * Chronological timeline of short notes with relative timestamps (e.g., `2 hours ago`, `Yesterday`, `May 08`).
     * Tag badges for note categories (`PERF`, `WEB`, `READING`, `TOOLING`).
     * Direct link to RSS feed for micro-notes.
3. **Footer:**
   * Copyright notice (`© 2025 rogerthat.dev`).
   * Global syndication links (`RSS`, `Git`, `Colophon`).

---

## 5. Functional Requirements & Roadmap

### Phase 1: MVP (Completed / In Review)
- [x] Responsive desktop homepage layout with hero profile, recent writing list (5 articles), and microblog side pane.
- [x] Crisp, slate-tinted minimalist design system (eliminated warm beige).
- [x] Global navigation header bar with right-aligned links.
- [x] Monospace metadata and category tag styling.

### Phase 2: Full Section Realization (Next Up)
- [ ] **Blog Archive Page (`/blog`):** Complete index of all 38+ essays with year/month sorting, tag filtering, and search.
- [ ] **Article Detail View (`/blog/:slug`):** Long-form editorial typography, syntax-highlighted code blocks, copy-to-clipboard snippets, table of contents, and footnotes.
- [ ] **Microblog Stream Archive (`/stream` or `/micro`):** Full chronological feed of TILs, bookmarks, and status notes with dedicated RSS feed (`feed.xml`).
- [ ] **Mobile Responsiveness:** Collapsible navigation drawer and stacked layout (hero -> recent writing -> status notes).

### Phase 3: Technical & Performance Features
- [ ] Static Site Generation (SSG) with client-side hydration or pure HTML/CSS.
- [ ] Dynamic RSS / Atom feed generation for both long-form essays and micro-notes.
- [ ] PGP key verification link and colophon / tech spec page.
- [ ] Light / Dark mode toggle (preserving slate contrast principles).

---

## 6. Success Metrics
* **Performance:** 100 Lighthouse scores across Performance, Accessibility, Best Practices, and SEO.
* **Speed:** First Contentful Paint (FCP) < 500ms; zero layout shift (CLS = 0).
* **Usability:** Fast scannability of both long-form thinking and rapid status updates.
