# 🧭 Admin Dashboard — Modern Agency Management Platform

A **modern, production-ready React 19 + React Router v7** admin dashboard built for managing users, trips, analytics, and internal tools for an agency platform.
It features a **Syncfusion-powered responsive UI**, a **scalable TypeScript architecture**, and **Tailwind CSS 4 styling** for consistency and performance.

---

## 🔍 Overview

The **Admin Dashboard** provides a unified interface for admins to:

* 👤 Manage users and roles
* 🧳 Monitor trip activity and travel data
* 📊 Track analytics through responsive charts and KPIs
* 🧭 Navigate via an optimized sidebar (desktop + mobile)
* ⚙️ Extend functionality easily with modular components

Built with **industry-standard React practices**, this project demonstrates:

* **Reusable component design**
* **Syncfusion enterprise UI integration**
* **Clean routing structure**
* **Responsive, accessible, and maintainable codebase**

---



This project was built completely from scratch using **React 19**, **TypeScript**, and **Tailwind CSS 4**, integrating **Syncfusion UI components** for a smooth and production-grade experience.

### 💡 Core Implementations

#### 🔹 Admin Layout System

* Created a **responsive admin layout** (`AdminLayout.tsx`) for consistent design across routes.
* Integrated both **mobile and desktop sidebars** using Syncfusion’s `SidebarComponent`.
* Enabled nested routing with `<Outlet />` for dashboard and user pages.

#### 🔹 Sidebar Navigation

* Implemented `NavItems.tsx` for **dynamic route-based navigation** with active link highlighting.
* Built `MobileSidebar.tsx` for **responsive menus** with toggle and backdrop functionality.

#### 🔹 Dashboard Interface

* Developed `Dashboard.tsx` featuring:

  * `Header` — Dynamic user greeting and page title.
  * `StatsCard` — Displays growth metrics with trend calculations.
  * `TripsCard` — Showcases recent trips with tags and pricing using Syncfusion Chips.

#### 🔹 Utility & Architecture

* Centralized static data in `constants/index.ts`.
* Used `lib/utils.ts` for helper functions like `cn()` (Tailwind class merging).
* Strong TypeScript typing for reusable, maintainable components.

---

## 📂 Folder Structure

```
## 📂 Folder Structure

The project is organized for clarity and scalability, following a **modular architecture** pattern.

```
project-root/
├── public/
│   └── assets/
│       ├── icons/               # All SVG icons used across the app (arrows, logout, etc.)
│       ├── images/              # User avatars, trip images, etc.
│       └── logo.svg             # App logo and branding assets
│
├── src/
│   ├── app/
│   │   └── lib/
│   │       └── utils.ts         # Utility helpers (e.g., `cn()` for Tailwind class merging)
│   │
│   ├── components/
│   │   ├── Header.tsx           # Page header with title and description
│   │   ├── StatsCard.tsx        # KPI stats card (monthly comparisons + trends)
│   │   ├── TripsCard.tsx        # Trip cards with Syncfusion chips and pricing
│   │   ├── NavItems.tsx         # Sidebar navigation with user profile and logout
│   │   ├── MobileSidebar.tsx    # Responsive sidebar using Syncfusion
│   │
│   ├── constants/
│   │   └── index.ts             # Static mock data (dashboard stats, trips, sidebar config)
│   │
│   ├── routes/
│   │   └── admin/
│   │       ├── AdminLayout.tsx  # Master layout wrapping all admin routes
│   │       ├── Dashboard.tsx    # Dashboard page with stats and trips overview
│   │       └── Users.tsx        # (Future) User management page
│   │
│   ├── main.tsx                 # React entry point with React Router setup
│   └── App.tsx                  # Root-level routing and layout definitions
│
├── .gitignore                   # Ensures .env files and other sensitive data are ignored
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite + React Router dev setup
└── tailwind.config.ts           # TailwindCSS configuration
```

### 🧭 Highlights

* **`public/assets`** — Centralized static icons and images for easy reference.
* **`components/`** — Reusable UI modules following atomic structure principles.
* **`routes/admin/`** — Organized page-level components with layout hierarchy.
* **`constants/`** — Source of truth for mock and static data.
* **`lib/utils.ts`** — Shared helper functions for class handling and reusability.

---

This version is **clear**, **accurate to your setup**, and **developer-friendly** — perfect for GitHub or portfolio visibility.

Would you like me to also add a **“📁 Folder Responsibilities Summary”** table (1 line per folder explaining its purpose — looks great for recruiters)?

```

---

## 🧩 Tech Stack

| Category         | Tools / Libraries            |
| ---------------- | ---------------------------- |
| **Framework**    | React 19, React Router v7    |
| **UI Library**   | Syncfusion React Components  |
| **Styling**      | Tailwind CSS 4               |
| **Language**     | TypeScript                   |
| **Build Tool**   | Vite + vite-tsconfig-paths   |
| **Utilities**    | Day.js, isbot, cn utility    |
| **Architecture** | Modular + Responsive Layouts |

---


