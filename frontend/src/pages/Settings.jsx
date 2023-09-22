import '../assets/styles/settings.css';
import Navbar from '../components/Navbar';
import AccountInfo from '../components/AccountInfo';

function Settings() {
    return (
        <>
        <div className='settings'>
            <div className='settings-top'>
                <Navbar />
                <h1 className='settings-title'>My Settings</h1>
            </div>
            <div className='settings-main'>
                <ul className='settings-list'>
                    <li className='settings-list-item'>Account</li>
                    <li className='settings-list-item'>Privacy</li>
                    <li className='settings-list-item'>Notifications</li>
                    <li className='settings-list-item'>Help</li>
                    <li className='settings-list-item'>About</li>
                </ul>
                <AccountInfo />
            </div>
        </div>
        </>
    )
}
export default Settings;