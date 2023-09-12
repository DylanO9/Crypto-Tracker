import { Link, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import App from '../pages/App';
import Account from '../pages/Account';
import Chart from './Chart';
import News from '../pages/News';
import Settings from '../pages/Settings';

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
        </div>
    )
}
export default Navbar;