# 🧭 Admin Dashboard — Modern Agency Management Platform

A **modern, production-ready React 19 + React Router v7** admin dashboard built for managing users, trips, analytics, and internal tools for an agency platform.
It features a **Syncfusion-powered responsive UI**, a **scalable TypeScript architecture**, **Appwrite authentication**, and **Tailwind CSS 4** for consistency and performance.

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
* **Appwrite backend setup**
* **Clean routing structure and maintainable codebase**

---

## ☁️ Appwrite Integration

### 🔹 Appwrite Setup

Located in `src/app/appwrite/`

| File          | Description                                                                         |
| ------------- | ----------------------------------------------------------------------------------- |
| **client.ts** | Initializes Appwrite SDK with Client, Account, Database, and Storage instances.     |
| **auth.ts**   | Handles user authentication logic including login, logout, and user data retrieval. |

### 🔧 Configuration

Appwrite credentials are stored securely in environment variables:

```bash
VITE_APPWRITE_API_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_API_SECRET=your_secret_api_key
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_USERS_TABLE=your_users_table_id
VITE_APPWRITE_TRIPS_TABLE=your_trips_table_id
```

### 🔐 Auth Functions

#### `loginWithGoogle`

Performs secure Google OAuth login using Appwrite’s new `createOAuth2Token` API.

```ts
await account.createOAuth2Token(OAuthProvider.Google);
```

#### `getGooglePicture`

Fetches user’s **name**, **email**, and **profile picture** from Google People API using the access token:

```ts
const response = await fetch("https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses,photos");
```

#### `logoutUser`

Logs out the currently active user session:

```ts
await account.deleteSession("current");
```

#### `getUser`

Fetches current logged-in Appwrite user:

```ts
const user = await account.get();
```

---

## 🧩 Core Implementations

* Configured **Appwrite backend integration** for authentication and data storage.
* Developed **Google OAuth flow** and user data retrieval.
* Added **logout handling** and secure session management.
* Integrated **reusable Appwrite client** across project modules.
* Built responsive **dashboard UI** with stats, trips, and navigation.

---

## 📂 Folder Structure

```
project-root/
├── public/
│   └── assets/
│       ├── icons/               # SVG icons used across the app
│       ├── images/              # User avatars and trip images
│       └── logo.svg             # App logo and branding assets
│
├── src/
│   ├── app/
│   │   ├── appwrite/
│   │   │   ├── client.ts        # Appwrite Client, Account, Database, Storage setup
│   │   │   └── auth.ts          # Authentication utilities (login, logout, getUser)
│   │   └── lib/
│   │       └── utils.ts         # Utility helpers (e.g., `cn()` for Tailwind merging)
│   │
│   ├── components/
│   │   ├── Header.tsx           # Page header with title and description
│   │   ├── StatsCard.tsx        # KPI stats card (monthly trends)
│   │   ├── TripsCard.tsx        # Trip cards using Syncfusion chips
│   │   ├── NavItems.tsx         # Sidebar navigation with user info and logout
│   │   └── MobileSidebar.tsx    # Responsive sidebar using Syncfusion
│   │
│   ├── constants/
│   │   └── index.ts             # Static mock data (stats, trips, sidebar config)
│   │
│   ├── routes/
│   │   └── admin/
│   │       ├── AdminLayout.tsx  # Layout wrapping all admin routes
│   │       ├── Dashboard.tsx    # Dashboard page showing stats and trips
│   │       └── Users.tsx        # (Future) User management page
│   │
│   ├── main.tsx                 # React entry point with Router setup
│   └── App.tsx                  # Root-level routing definitions
│
├── .gitignore                   # Ignores .env files and build directories
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite + React Router dev setup
└── tailwind.config.ts           # TailwindCSS configuration
```

---

## 🧠 Key Tech Stack

| Category           | Tools / Libraries           |
| ------------------ | --------------------------- |
| **Framework**      | React 19, React Router v7   |
| **Backend / Auth** | Appwrite Cloud              |
| **UI Library**     | Syncfusion React Components |
| **Styling**        | Tailwind CSS 4              |
| **Language**       | TypeScript                  |
| **Build Tool**     | Vite + vite-tsconfig-paths  |
| **Utilities**      | Day.js, isbot, cn utility   |
| **Architecture**   | Modular + Responsive        |

---

## 💻 Scripts

| Command             | Description                             |
| ------------------- | --------------------------------------- |
| `npm run dev`       | Start development server                |
| `npm run build`     | Build production bundle                 |
| `npm start`         | Serve production build                  |
| `npm run typecheck` | Run TypeScript + Router type generation |

---

## 👤 Author

**Vineeth Kumar**
React.js Developer | Frontend Engineer
📧 [vineethkumar1607@gmail.com](mailto:vineethkumar1607@gmail.com)

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use and modify it for your own projects.

---
