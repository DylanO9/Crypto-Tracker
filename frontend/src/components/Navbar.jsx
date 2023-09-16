import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { useState } from 'react';
import { NavbarData } from './NavbarData';
import '../styles/navbar.css';

function Navbar() {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => {
        setSidebar(!sidebar);
        console.log(sidebar);
        };
    return (
        <>
            <div className='navbar'>
                <div className='menu-bars' onClick={() => showSidebar()}> <FaIcons.FaBars /> </div>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={() => showSidebar()}>
                    <li classname='navbar-toggle'>
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
                </ul>
            </nav>
        </>
    )
}
export default Navbar;