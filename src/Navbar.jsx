import { Link, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import App from './App';
import Account from './Account';
import Chart from './Chart';
import News from './News';
import Settings from './Settings';

function Navbar() {
    return (
        <div className='navbar'>
            <nav className='nav-menu'>
                <Link to='/' className='nav-links'>Dashboard</Link>
                <Link to='/account' className='nav-links'>Account</Link>
                <Link to='/chart' className='nav-links'>Chart</Link>
                <Link to='/news' className='nav-links'>News</Link>
                <Link to='/settings' className='nav-links'>Settings</Link>
            </nav>
            <Routes>
                <Route path="/account" element={<Account />} />
                <Route path="/chart" element={<Chart />} />
                <Route path="/news" element={<News />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
        </div>
    )
}
export default Navbar;