# Notes Hub - 3-Tier Notes Management System

Notes Hub is a premium, secure, and fully containerized notes management web application. It features light/dark mode toggling, categorization, pinning, note searching, and JWT authentication.

The project is built using a **3-tier architecture** containerized and orchestrated via **Docker Compose**.

---

## 🏗️ Architecture Overview

The system is partitioned into three decoupled tiers connected via an isolated internal bridge network (`notes-network`):

```
                       ┌──────────────────────────────────────────────┐
                       │               Nginx (Port 80)                │
                       │             (Reverse Proxy & Web)            │
                       └──────────────────────┬───────────────────────┘
                                              │
                       ┌──────────────────────▼───────────────────────┐
                       │            Node.js API (Port 5000)           │
                       │             (Application Tier)               │
                       └──────────────────────┬───────────────────────┘
                                              │
                       ┌──────────────────────▼───────────────────────┐
                       │             MySQL 8.4 (Port 3306)            │
                       │               (Database Tier)                │
                       └──────────────────────────────────────────────┘
```

1. **Web & Proxy Tier (Nginx)**: Serves as the single gateway. It serves compiled static React frontend assets and proxies any API requests (matching `/api/*`) internally to the backend.
2. **Application Tier (Node.js/Express)**: Handles login, registration, password hashing (`bcrypt`), JSON Web Token (JWT) generation, verification middlewares, and notes/categories transactions.
3. **Database Tier (MySQL 8.4)**: Stores persistent data. It initializes user tables, categories, and foreign keys automatically upon startup.

---

## ⚡ Tech Stack

* **Frontend**: React 19 (Vite), CSS Variables (Glassmorphism & Light/Dark styling)
* **Backend**: Node.js, Express, `mysql2/promise` connection pool
* **Database**: MySQL 8.4
* **Proxy / Web Server**: Nginx
* **Orchestration**: Docker Compose

---

## 🚀 Quick Start (Docker Deployment)

Follow these instructions to build, run, and verify the project using Docker.

### 1. Prerequisites
Ensure you have **Docker Desktop** installed and running on your system.

### 2. Startup Command
Navigate to the project root directory and run:
```bash
docker-compose up --build
```
* *Note: The `--build` flag compiles the latest code versions for the Nginx proxy and Node backend containers.*

### 3. Detached Mode (Background)
To run the containers in the background, run:
```bash
docker-compose up --build -d
```
To check service logs in this mode:
```bash
docker-compose logs -f
```

### 4. Stop Services
To stop and remove the containers:
```bash
docker-compose down
```
To stop and wipe database volumes to start fresh:
```bash
docker-compose down -v
```

---

## 🔗 Port Mappings & Services

| Service | Container Name | External Port | Internal Port | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **Nginx (Frontend)** | `notes_nginx` | `80` | `80` | Entrypoint: Serves web UI & proxies API |
| **Express (Backend)** | `notes_backend` | `5000` | `5000` | Process core backend requests |
| **MySQL (Database)** | `notes_mysql` | `3306` | `3306` | Persistent SQL database |

* Open your browser and go to **`http://localhost`** to access the application.

---

## 📂 Project Structure

```text
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│       ├── config/        # Pool database setup
│       ├── controllers/   # Route actions logic
│       ├── middleware/    # JWT validators
│       ├── models/        # MySQL raw query scripts
│       ├── routes/        # Router endpoints mapping
│       ├── services/      # Encryption & JWT service logic
│       ├── utils/         # JSON formatter handlers
│       └── app.js
├── database/
│   └── init.sql           # Schema setup script
├── frontend/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── src/
│       ├── components/    # Auth, Dashboard, NoteCard, NoteModal
│       ├── index.css      # Styling tokens & Dark theme variables
│       └── main.jsx
├── nginx/
│   ├── Dockerfile         # Multi-stage frontend compiler & web-server build
│   └── default.conf       # Proxies API and serves build/dist folder
├── .env                   # Environment keys & database settings
├── .gitignore             # Ignores local node_modules, build outputs, and env variables
└── docker-compose.yml     # Service orchestrator
```

---

## 🔐 Environment Configurations

Configuration keys are stored in the [.env](file:///.env) file at the root:
```env
PORT=5000
DB_HOST=mysql
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_NAME=notesdb
JWT_SECRET=supersecretkey
```
