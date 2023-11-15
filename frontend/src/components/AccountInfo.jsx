import { useAuthContext } from "../hooks/useAuthContext";
import React from 'react';
import { useState, useEffect } from "react";
import '../assets/styles/accountinfo.css';

function AccountInfo() {
    const { user } = useAuthContext();
    const [ profile, setProfile ] = useState([]);
    const [ name, setName ] = useState('');
    const [ age, setAge ] = useState('');
    const [ username, setUsername ] = useState('');
    const [ foundProfile, setFoundProfile ] = useState(false);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        console.log(user);
        if(user) {
            fetchProfile();
        }
    }, [user]);


    const fetchProfile = async () => {
        try{
            const responseProfile = await fetch('api/profiles', {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });
            const jsonProfile = await responseProfile.json();
            console.log('fetching profile');
            if(responseProfile.ok) {
                console.log('succeeded in fetching profiles');
                const matchedProfile = jsonProfile.find(profile => profile.email === user.email);
                if(matchedProfile) {
                    setFoundProfile(true);
                    setProfile(matchedProfile);
                } else {
                    setFoundProfile(false);
                }
            }
        } catch (error) {
            console.log(error.message);
        }

    }

    const removeNullAndEmptyStrings = (obj) => {
        return Object.keys(obj).reduce((acc, key) => {
          const value = obj[key];
          
          // Check if the value is not null or an empty string
          if (value !== null && value !== '') {
            acc[key] = value;
          }
          
          return acc;
        }, {});
      }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const values = { age, name, username };
        const updateProfile = removeNullAndEmptyStrings(values);
        console.log(updateProfile);
        try {
            const response = await fetch('api/profiles/' + user.email, {
                method: 'PATCH',
                body: JSON.stringify(updateProfile),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
    
            if(response.ok) {
                setError(null);
                console.log('Profile Updated');
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const createAccount = async () => {
        try {
            const response = await fetch('api/profiles/', {
                method: 'POST',
                body: JSON.stringify({ email: user.email }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });
            if(response.ok) {
                setError(null);
                console.log('Profile Created');
                setFoundProfile(true);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <section className='account-info-section'>
        {foundProfile && user ? (
            <form className='account-info-form' onSubmit={handleSubmit}>
                    <h2 className='account-info-title'>Account Information</h2>
                    <label className='account-info-email'>Email: {user ? user.email : 'no data'}</label>
                        <label className='account-info-username'>Username:</label>
                        <input type='text' onChange={(e) => setUsername(e.target.value)} placeholder={user ? profile.username : 'username'} className='account-info-username-input'></input>
                    <h2 className='personal-info-title'>Personal Information</h2>
                        <label className='personal-info-name'>Name: </label>
                        <input type='text' onChange={(e) => setName(e.target.value)} placeholder={user ? profile.name : 'name'} className='personal-info-name-input'></input>
                        <label className='personal-info-age'>Age: </label>
                        <input type='number' onChange={(e) => setAge(e.target.value)} placeholder={user ? profile.age : 'age'} className='personal-info-age-input'></input>

                {error && <p className='error'>{error}</p>}
            </form> )
            : (
                <div className='no-account'>
                    <h1>There seems to be no profile linked to your account</h1>
                    <button className='form-button' onClick={createAccount}>create acc</button>
                </div>
            ) }
        </section>
    )
}

export default AccountInfo