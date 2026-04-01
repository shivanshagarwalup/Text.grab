# 📋 Online Clipboard

An ephemeral, ultra-fast, and secure text-sharing platform built with the MERN stack. Share text snippets across devices instantly using a 6-character unique code.

---

## ✨ Features

- **🚀 Instant Sharing**: Generate a unique, short 6-character code for your text in milliseconds.
- **🕒 Ephemeral Storage**: Clips are temporary and automatically expire after **1 hour** for privacy.
- **🌓 Dark Mode**: Sleek, modern UI with glassmorphism effects and light/dark theme toggle.
- **⚡ Fast & Minimal**: No accounts, no ads, no wait times. Just paste, share, and go.
- **📱 Responsive Design**: Fully optimized for mobile, tablet, and desktop browsing.
- **🔔 Notifications**: Real-time feedback with toast notifications for every action.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Components**: [Radix UI](https://www.radix-ui.com/) (Headless primitives)
- **State/API**: [Axios](https://axios-http.com/) & [React Hooks](https://react.dev/reference/react/hooks)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (using [Mongoose](https://mongoosejs.com/))
- **Utilities**: [Nanoid](https://github.com/ai/nanoid) (Short unique IDs), [CORS](https://github.com/expressjs/cors), [Dotenv](https://github.com/motdotla/dotenv)

---

## 📂 Project Structure

```text
Clipboard/
├── backend/            # Express server and database logic
│   ├── config/         # DB connection setup
│   ├── controllers/    # Request handlers (Create/Fetch)
│   ├── models/         # Mongoose schemas (with TTL index)
│   └── routes/         # API endpoints definition
├── frontend/           # Vite + React client
│   ├── src/
│   │   ├── components/ # Reusable UI components (Shadcn-like)
│   │   └── App.jsx     # Main application dashboard
│   └── tailwind.config.js
└── README.md           # This file!
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB account (Atlas or local instance)

### 1. Backend Setup

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add your configuration:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   ```
4. Start the server:
   ```bash
   node server.js
   ```

### 2. Frontend Setup

1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/clip/create` | Create a new clip (expects `{ "text": "..." }`) |
| `GET` | `/api/clip/:code` | Retrieve a clip by its 6-character code |

---