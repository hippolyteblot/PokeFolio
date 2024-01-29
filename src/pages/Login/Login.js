// src/pages/Login/Login.js
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import '../../App.css';
import { useAuth } from '../../AuthContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoggedIn } = useAuth(); // Utilisez le hook useAuth pour accéder aux fonctions login et isLoggedIn

    const handleLogin = (e) => {
        e.preventDefault();
        login(username, password);
    };

    // Si l'utilisateur est connecté, redirigez-le vers la page "Main"
    if (isLoggedIn) {
        return <Navigate to="/main" />;
    }

    return (
        <div className={'main-container'}>
            <h2>Login Page</h2>
            <form onSubmit={handleLogin} className={'standard-form'}>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Login</button>
                <br />
                <span>or</span>
                <br />
                <a href="/signup">Create an Account</a>
            </form>
        </div>
    );
};

export default Login;
