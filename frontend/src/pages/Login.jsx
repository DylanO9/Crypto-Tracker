import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";
import '../assets/styles/login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isLoading } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            await login(email, password);
        } catch (err) {
            console.log('help');
        }
    };

    return (
        <div className="login">
            <form className='login-form' onSubmit={handleSubmit}>
                <h1 className='login-title'>Log in</h1>

                <label className='login-label'>Email: </label>
                <input
                    className='login-input'
                    type='email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email} />
                <label className='login-label'>Password: </label>
                <input
                    className='login-input'
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password} />

                <button className='login-button' disabled={isLoading}>Log in</button>
                {error && (<div className='error'>{error}</div>)}
            </form>
            <p className='signup'> <Link to='/signup'><span>Not a member yet? Sign up</span></Link></p>
        </div>
    )
}

export default Login;