# Baddalni Platform

Baddalni is a full-stack bartering and exchange platform where users can offer items they own and discover items they want to exchange them for. 

This repository is built as a **Monorepo**, meaning it contains both the frontend and backend applications configured to run seamlessly together from a single workspace.

## 🚀 Tech Stack

- **Frontend:** React (Vite), TailwindCSS, Framer Motion
- **Backend:** Laravel 12, PHP 8.2+

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your machine:
- Node.js & npm
- PHP ^8.2
- Composer

## 🔧 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd baddalni-react
   ```

2. **Install Root Dependencies:**
   ```bash
   npm install
   ```
   *(This installs the workspace manager so both servers can start with one command)*

3. **Install Frontend Dependencies:**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. **Setup the Laravel Backend:**
   ```bash
   cd backend
   composer install
   npm install
   cp .env.example .env
   php artisan key:generate
   php artisan migrate
   cd ..
   ```

## 💻 Running the Application

You do not need to open separate terminals. You can start both the Laravel backend API and the React frontend simultaneously by running a single command from the **root** folder:

```bash
npm run dev
```

- **Frontend Portal:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://127.0.0.1:8000](http://127.0.0.1:8000)
