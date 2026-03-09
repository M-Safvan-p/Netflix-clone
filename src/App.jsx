import React from 'react'
import Landing from "./pages/Home/Landing"
import Login from './pages/Auth/Login'
import { Routes, Route } from 'react-router-dom'


const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />}/>
        <Route path='/login' element={<Login />}/>
      </Routes>
    </>
  )
} 

export default App
