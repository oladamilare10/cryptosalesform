import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Crypto from './Pages/Crypto'
import BuyCrypto from './Pages/BuyCrypto'
import Track from './Pages/Track'
import Dashboard from './Pages/dashboard'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Crypto" element={<Crypto />} />
        <Route path="/Crypto/Buy" element={<BuyCrypto />} />
        <Route path="/transaction/:id" element={<Track />} />
        <Route path="/DashLogin" element={<BuyCrypto />} />
        <Route path="/DashLoadQ286Ut" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
