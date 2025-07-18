import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Notfound } from './pages/Notfound'
import { Dashboard } from './pages/Dashboard'
import { Job } from './pages/Job'
import { PostApplication } from './pages/postApplication'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import "./App.css"


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/notfound' element={<Notfound/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/application' element={<PostApplication/>}/>
        <Route path='/job' element={<Job/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
