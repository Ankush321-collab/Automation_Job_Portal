
# Automation Job Portal

A modern, full-stack job portal web application with animated dashboard, glassmorphism navbar, and responsive design.

## Features

- User authentication (login/signup)
- Role-based dashboard (Job Seeker & Employer)
- Animated, split-screen dashboard (sidebar 30% / content 70%)
- Modern glassmorphism navbar (fixed on scroll)
- Responsive, mobile-first design
- Post, view, and apply for jobs
- Manage applications and profiles
- Animated sidebar navigation with smooth transitions
- Theme-ready and accessible UI

## Tech Stack

- **Frontend:** React, Redux, Vite, CSS (custom, modern, BEM)
- **Backend:** Node.js, Express, MongoDB
- **Other:** React Router, React Icons, Toastify

## Folder Structure

```
frontend/
  src/
    Components/        # Reusable React components
    pages/             # Main pages (Dashboard, Login, Signup, etc.)
    store/             # Redux store and slices
    styles/            # CSS files
    hooks/             # Custom React hooks
    assets/            # Images and static assets
    App.jsx            # Main app component
    main.jsx           # Entry point
  public/              # Static files
  package.json         # Frontend dependencies
backend/
  Controller/          # Express controllers
  Middlewares/         # Auth, error handling, etc.
  Models/              # Mongoose schemas
  routes/              # Express routes
  utils/               # Utility functions
  index.js             # Server entry point
  package.json         # Backend dependencies
```

## Setup & Run

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB

### 1. Clone the repository
```
git clone <repo-url>
cd Automation_Job_Portal
```

### 2. Install dependencies
```
cd backend
npm install
cd ../frontend
npm install
```

### 3. Configure environment variables
- Create a `.env` file in `backend/` for MongoDB URI, JWT secret, etc.

### 4. Start the backend
```
cd backend
npm start
```

### 5. Start the frontend
```
cd frontend
npm run dev
```

### 6. Open in browser
Visit: [http://localhost:5173](http://localhost:5173)

## Customization
- **Dashboard:** Sidebar navigation is animated and shows different options based on user role. Clicking a sidebar item loads the corresponding component in the main area.
- **Navbar:** Modern, glassy, and fixed at the top. Responsive for all devices.
- **Styling:** All styles are in `frontend/src/App.css` and follow BEM and modern CSS best practices.

## Screenshots
_Add screenshots here to showcase the UI_

## License
MIT

---

For any issues or contributions, please open an issue or pull request.
