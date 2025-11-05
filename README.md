# 🧭 Admin Dashboard — Modern Agency Management Platform

A **production-ready React + React Router v7** admin dashboard built for agencies to manage users, clients, analytics, and internal tools.
This project features a **responsive Syncfusion-powered UI**, **modular architecture**, and **clean TypeScript integration**.

---

## 🚀 Tech Stack

**Frontend Framework**

* ⚛️ [React 19](https://react.dev/)
* 🧭 [React Router v7](https://reactrouter.com/)
* 🌀 [Tailwind CSS 4](https://tailwindcss.com/)

**UI Components**

* 🎛️ [Syncfusion React Components](https://www.syncfusion.com/react-components)

  * Sidebar, Grids, Dropdowns, Charts, Maps, SplitButtons, and more.

**Utilities**

* 📅 [Day.js](https://day.js.org/) — lightweight date manipulation
* 🤖 [isbot](https://github.com/omrilotan/isbot) — bot detection
* 🧩 TypeScript for type-safety and maintainability

**Build & Dev Tools**

* ⚡ [Vite](https://vitejs.dev/) — blazing fast bundler
* 🧠 [vite-tsconfig-paths](https://github.com/aleclarson/vite-tsconfig-paths) — TS alias support
* 🧱 [@react-router/dev](https://reactrouter.com/en/main/guides/start/dev) — server + routes integration
* 🎨 [TailwindCSS + Vite plugin](https://tailwindcss.com/docs/installation) — for modern styling

---

## 🏗️ Features

✅ **Responsive Sidebar Navigation**

* Mobile sidebar built with Syncfusion’s `SidebarComponent`
* Auto-closes on route change or backdrop click
* Integrated `NavItems` for both desktop and mobile layouts

✅ **Admin Layout Architecture**

* `AdminLayout` defines a master layout with responsive sidebar and main content area
* Uses `<Outlet />` for nested routes (`/dashboard`, `/users`, etc.)

✅ **TypeScript Safe & Scalable**

* Strongly typed props and reusable components
* Clean separation between logic, layout, and UI

✅ **Syncfusion Integration**

* Advanced UI widgets (charts, grids, maps)
* Smooth gestures and transitions for mobile devices

✅ **Modern Developer Experience**

* Hot Module Reloading via `react-router dev`
* Ready for SSR builds using `react-router build`
* Built-in TypeScript checking

---

## 📁 Project Structure

```
src/
├── components/
│   ├── MobileSidebar.tsx      # Responsive mobile sidebar using Syncfusion
│   ├── NavItems.tsx           # Sidebar navigation items with user profile
├── routes/
│   └── admin/
│       ├── AdminLayout.tsx    # Main admin dashboard layout
│       ├── Dashboard.tsx
│       └── Users.tsx
├── app/lib/utils.ts           # Utility functions (includes `cn` for class merging)
├── constants/
│   └── index.ts               # Sidebar item config
```

---

## ⚙️ Scripts

| Command             | Description                                   |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Start the development server                  |
| `npm run build`     | Build the production bundle                   |
| `npm start`         | Serve the production build                    |
| `npm run typecheck` | Run TypeScript + React Router type generation |

---

## 🧰 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/admin-dashboard.git
cd admin-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

Your app will be running at **[http://localhost:5173](http://localhost:5173)**

---

## 🧠 Key Components Overview

### `MobileSidebar.tsx`

Responsive mobile navigation using Syncfusion’s `SidebarComponent`.
Supports toggle, backdrop closing, and smooth transitions.

### `NavItems.tsx`

Reusable sidebar item list with:

* Active route highlighting
* Dynamic icons from constants
* User section with logout action

### `AdminLayout.tsx`

Base layout for all admin routes.
Combines `MobileSidebar` and desktop sidebar for a unified experience.

---

## 💄 Styling

* Built using **Tailwind CSS 4** with responsive utility classes.
* The `cn()` utility merges Tailwind class names safely and avoids conflicts.


## 🛠️ Future Enhancements




---

## 🧑‍💼 Author

**Vineeth Kumar**
React.js Developer | Frontend Engineer
📧 [vineethkumar1607@gmail.com](mailto:vineethkumar1607@gmail.com)

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use and modify for your own projects.

---

### 💚 Summary

A clean, scalable, and responsive **React 19 + React Router v7 Admin Dashboard**
powered by **Syncfusion** and **Tailwind CSS**, ready for real-world agency operations.
