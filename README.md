# Zomagram 🍔📸

Welcome to **Zomagram**! This project is a unique blend of **Zomato** and **Instagram**, bringing together the best of food discovery and visual social media. It serves as a unified platform where users can discover delicious food items through a visually appealing feed, and food partners (restaurants/creators) can showcase their offerings with high-quality images and videos.

## 🚀 Live Links
- **Frontend (Vercel):** [Zomagram Frontend](https://zomagram-lemon.vercel.app/)
- **Backend (Render):** Deployed and serving APIs via Render.

## 📖 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [API Endpoints Overview](#api-endpoints-overview)

---

## ✨ Features

- **Split-Role Authentication 🔐**
  - Distinct login and registration flows for **Users** and **Food Partners**.
  - Secure authentication using **JWT** and HTTP-only cookies.
  - Responsive Auth UI inspired by Zomato's red theme and Instagram's vibrant gradient accents.
  - Built-in **Light & Dark Mode** support adapting to system preferences.

- **Interactive Food Feed 📱**
  - Users can scroll through an engaging feed of food items uploaded by partners.
  - Seamless **"Visit Store"** redirection to view a food partner's complete profile and menu.

- **Food Partner Dashboard 🍽️**
  - Dedicated `Create Food` page for partners to effortlessly upload new menu items.
  - Support for uploading rich media (images and videos) integrated with **ImageKit**.
  - Partner profile pages acting as a digital storefront.

- **Cross-Origin Resource Sharing (CORS) Optimized 🌐**
  - Smooth interaction between the Vercel-hosted frontend and Render-hosted backend with securely configured credentials and headers.

---

## 🛠️ Tech Stack

### Frontend
- **React 19** (via Vite)
- **React Router DOM** (Client-side routing)
- **CSS3 / CSS Variables** (Theming and centralized styling)
- **Axios** (API requests)

### Backend
- **Node.js & Express.js**
- **MongoDB & Mongoose** (Database and ODM)
- **JWT & bcryptjs** (Authentication and Security)
- **Multer & ImageKit** (Media storage and optimization)

---

## 🏗️ Project Architecture

The repository is structured into two main directories:

```text
zomato/
├── frontend/          # React + Vite application
│   ├── src/
│   │   ├── pages/     # Auth, Home, Create Food, Profile pages
│   │   ├── routes/    # App routing logic
│   │   ├── App.jsx    # Root component
│   │   └── index.css  # Global styles and themes
│   └── package.json
└── backend/           # Node.js + Express application
    ├── src/
    │   ├── controllers/
    │   ├── routes/    # Auth, Food, Food-Partner routes
    │   ├── models/    # Mongoose schemas
    │   └── app.js     # Express App entry point
    └── package.json
```

---

## ⚙️ Installation & Setup

To run this project locally, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/your-username/zomagram.git
cd zomagram
```

### 2. Setup Backend
```bash
cd backend
npm install
```
- Create a `.env` file in the `backend` directory (see [Environment Variables](#environment-variables)).
- Start the server:
```bash
npm run dev
# or
node main.js
```

### 3. Setup Frontend
Open a new terminal window:
```bash
cd frontend
npm install
```
- Start the Vite development server:
```bash
npm run dev
```

---

## 🔑 Environment Variables

To run the backend, you'll need to configure the following environment variables in `backend/.env`:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ImageKit_PUBLIC_KEY=your_imagekit_public_key
ImageKit_PRIVATE_KEY=your_imagekit_private_key
ImageKit_URL_ENDPOINT=your_imagekit_url_endpoint
```

---

## 📡 API Endpoints Overview

- **Auth Routes (`/api/auth`)**
  - User & Partner Registration/Login
- **Food Routes (`/api/food`)**
  - Fetch food feed items
- **Food Partner Routes (`/api/food-partner`)**
  - Upload food items (handling `FormData` for ImageKit)
  - Fetch partner profiles

---

### *Made with ❤️ for food and tech!*
