import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App'
import Navbar from './components/Navbar'
import Account from './pages/Account'
import Chart from './components/Chart'
import News from './pages/News'
import Settings from './pages/Settings'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    {/* <Navbar/> */}
    <Routes>
        <Route path="/" element={<App />} />
        <Route path="/account" element={<Account />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/news" element={<News />} />
        <Route path="/settings" element={<Settings />} />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
