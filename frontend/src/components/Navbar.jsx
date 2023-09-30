import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { useState } from 'react';
import { NavbarData } from './NavbarData';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import '../assets/styles/navbar.css';
import React from 'react';

function Navbar() {
    const [sidebar, setSidebar] = useState(false);
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const showSidebar = () => {
        setSidebar(!sidebar);
        };

    const handleClick = () => {
        logout();
    }
    return (
        <>
            <div className='navbar'>
                <div className='menu-bars' onClick={() => showSidebar()}> <FaIcons.FaBars /> </div>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={() => showSidebar()}>
                    <li key='toggle' className='navbar-toggle'>
                        <div className='menu-bars'> <AiIcons.AiOutlineClose/> </div>
                    </li>
                    {NavbarData.map((item, index) => {
                    return (
                        <li key={index} className={item.cName}>
                        <Link to={item.path}>
                            {item.icon}
                            <span>{item.title}</span>
                        </Link>
                        </li>
                    );
                    })}
                    {user && (
                        <div className='user'>
                            <li key='logout' className='logout' onClick={handleClick}>Logout</li>
                        </div>
                    )}
                    {!user && (
                    <div className='login-signup'>
                        <li key='login' className='nav-text'><Link to='/login'><AiIcons.AiOutlineLogin /><span>Login</span></Link></li>
                        <li key='signup' className='nav-text'><Link to='/signup'><AiIcons.AiOutlineUserAdd /><span>Signup</span></Link></li>
                    </div>
                    )}
                </ul>
            </nav>
        </>
    )
}
export default Navbar;