import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Home from './pages/Home'
import Login from './pages/Login'
import { Signup } from './pages/Signup'
import { Notfound } from './pages/Notfound'
import { Dashboard } from './pages/Dashboard'
import { Job } from './pages/Job'
import { PostApplication } from './pages/postApplication'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import "./App.css"



function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    const publicRoutes = ['/login', '/signup', '/'];
    const isPublicRoute = publicRoutes.includes(location.pathname);

    if (!isAuthenticated && !isPublicRoute && location.pathname !== '/login') {
      navigate('/login', { replace: true });
    } else if (isAuthenticated && location.pathname === '/login') {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, location.pathname, navigate]);


  return (
    <>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path='/' element={isAuthenticated?<Home/>:<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/notfound' element={<Notfound/>}/>
        <Route path='/dashboard' element={isAuthenticated?  <Dashboard/>:<Login/>}/>
        <Route path='/application' element={isAuthenticated?  <PostApplication/>:<Login/>}/>
        <Route path='/job' element={isAuthenticated?<Job/>:<Login/>}/>
        <Route path="*" element={<Notfound/>}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App
