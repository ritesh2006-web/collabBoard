import React from 'react'
import Header from './components/Header'
import { Routes, Route } from "react-router-dom"
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Project from './pages/Project'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/home'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path='/project/:id' element={<ProtectedRoute><Project /></ProtectedRoute>} />
      </Routes >

    </>
  )
}

export default App
