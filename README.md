# Automation Job Portal
# 
Automation Job Portal is a full-stack web application for job seekers and employers. It allows employers to post jobs and manage applications, while job seekers can search, apply, and manage their profiles.

---

## Project Structure

```
E:\JOB PORTAL
│
├── backend/
│   ├── index.js
│   ├── package.json
│   ├── automation/
│   ├── Controller/
│   ├── Middlewares/
│   ├── Models/
│   ├── routes/
│   └── utils/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
└── README.md
```

---

## Backend API

### Main Endpoints

#### Auth & User
- `POST /api/signup` — Register user
- `POST /api/login` — Login user
- `GET /api/me` — Get current user
- `POST /api/updateprofile` — Update user profile
- `POST /api/updatepassword` — Update password

#### Jobs
- `POST /api/postjob` — Post a new job (employer only)
- `GET /api/getalljobs` — Get all jobs (with filters: city, preference, keyword)
- `GET /api/getmyjob` — Get jobs posted by current employer
- `GET /api/get/:id` — Get single job details
- `DELETE /api/delete/:id` — Delete a job (employer only)

#### Applications
- `POST /api/application` — Apply for a job
- `GET /api/jobseeker/getall` — Get all applications for job seeker
- `GET /api/employer/getall` — Get all applications for employer

---

## Directory Details

### backend/
- **Controller/** — Contains business logic for jobs, users, applications
- **Middlewares/** — Error handling, authentication, authorization
- **Models/** — Mongoose schemas for User, Job, Application
- **routes/** — Express route definitions
- **utils/** — Utility functions (JWT, mail, etc.)

### frontend/
- **src/Components/** — React components (Dashboard, MyJobs, etc.)
- **src/pages/** — Page-level components (Home, Login, Dashboard)
- **src/store/** — Redux slices and store setup
- **src/hooks/** — Custom hooks
- **src/styles/** — CSS files

---

## Workflow

### Employer
1. Register/Login as employer
2. Post jobs via `/api/postjob`
   - JSON fields:
     ```json
     {
       "title": "Software Engineer",
       "jobtype": "Full Time",
       "location": "Delhi",
       "companyname": "ABC Corp",
       "introduction": "Job intro...",
       "responsibilities": "List...",
       "qualification": "List...",
       "offers": "List...",
       "salary": 50000,
       "hiringmultiple": false,
       "personalwebsitetitle": "Company Site",
       "personalwebsiteurl": "https://abc.com",
       "preference": "IT"
     }
     ```
3. View posted jobs in dashboard (MyJobs)
4. Delete jobs via `/api/delete/:id`
5. View applications for jobs

### Job Seeker
1. Register/Login as job seeker
2. Search jobs via `/api/getalljobs`
3. Apply for jobs via `/api/application`
   - JSON fields:
     ```json
     {
       "jobId": "<job_id>",
       "coverletter": "Why I am a fit...",
       "resume": "<file_url>"
     }
     ```
4. View own applications in dashboard
5. Update profile and password

---

## .env Example

Create a `.env` file in backend directory:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/jobportal
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

---

## How It Works
- Backend: Node.js, Express, MongoDB, JWT Auth
- Frontend: React, Redux, Vite
- Employers can post/manage jobs, view applications
- Job seekers can search/apply for jobs, manage profile
- All API requests require authentication except job search

---

## Getting Started
1. Clone repo
2. Setup `.env` in backend
3. Run `npm install` in both backend and frontend
4. Start backend: `npm start`
5. Start frontend: `npm run dev`
6. Access app at `http://localhost:5173`

---

## Contact
For issues, contact Ankush321-collab on GitHub.

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
