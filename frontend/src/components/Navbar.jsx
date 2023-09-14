import { Link} from 'react-router-dom';

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