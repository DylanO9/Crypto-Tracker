import '../assets/styles/settings.css';
import React from 'react';
import Navbar from '../components/Navbar';
import AccountInfo from '../components/AccountInfo';
import Help from '../components/Help';
import About from '../components/About';
import { useState } from 'react';

function Settings() {
    const [activeComponent, setActiveComponent] = useState('account');

    const renderComponent = () => {
        switch (activeComponent) {
            case 'account':
                return <AccountInfo />;
            case 'help':
                return <Help />;
            case 'about':
                return <About />;
            default: 
            return <AccountInfo />;
        }
    }
    return (
        <>
        <header>
            <Navbar />
            <h1 className='settings-title'>My Settings</h1>
        </header>
        <main>
            <ul id='settings-list'>
                <li onClick={() => setActiveComponent('account')} className='settings-list-item'>Account</li>
                <li onClick={() => setActiveComponent('help')} className='settings-list-item'>Help</li>
                <li onClick={() => setActiveComponent('about')} className='settings-list-item'>About</li>
            </ul>
            <section id='settings-component'>
                {renderComponent()}
            </section>
        </main>
        </>
    )
}
export default Settings;