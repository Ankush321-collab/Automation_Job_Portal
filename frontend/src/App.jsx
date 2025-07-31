import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { Notfound } from './pages/Notfound'
import { Dashboard } from './pages/Dashboard'
import { Job } from './pages/Job'
import { PostApplication } from './pages/postApplication'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { ProtectedRoute } from './components/ProtectedRoute'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import "./App.css"



function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/notfound' element={<Notfound />} />
        <Route path="*" element={<Notfound />} />

        {/* Protected Routes */}
        <Route path='/' element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }/>
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }/>
        <Route path='/application/:id' element={
          <ProtectedRoute>
            <PostApplication />
          </ProtectedRoute>
        }/>
        <Route path='/job' element={
          <ProtectedRoute>
            <Job />
          </ProtectedRoute>
        }/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App

