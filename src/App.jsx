import { useState } from 'react'
import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Login from './screens/Login/Login'
import Home from './screens/Home/Home'
function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        {localStorage.getItem("logged-in")?
          <Route path='*' element={<Home/>}/>
          :
          <Route path='*' element={<Login/>}/>
          }
      </Routes>
    </BrowserRouter>
  )
}

export default App
