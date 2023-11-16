import { useState } from "react";
import React from 'react';
import { useSignup } from "../hooks/useSignup";
import { Link } from "react-router-dom";
import '../assets/styles/signup.css';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, error, isLoading } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signup(email, password);
    };

    return (
        <main>
            <form id='signup' onSubmit={handleSubmit}>
                <h1>Sign up</h1>

                <label>Email: </label>
                <input
                    type='email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <label>Password: </label>
                <input
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />

                <button disabled={isLoading}>Sign up</button>
                {error && <div className='error'>{error}</div>}
                <p> <Link to='/login'><span>Already a member? Log in</span></Link></p>
            </form>
        </main>
    )
}

export default Signup;