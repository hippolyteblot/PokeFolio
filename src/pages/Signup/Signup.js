import React, { useState } from 'react';
import '../../App.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSignup = async (e) => {
        e.preventDefault();

        // Vérifier si les mots de passe correspondent
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            // Request to the backend to create an account
            const response = await fetch('http://127.0.0.1:3000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                // If the request was successful, redirect to the login page
                window.location.href = '/login';
            } else {
                // If the request was unsuccessful, display the error
                const data = await response.json();
                setError(data.error || 'An error occurred.');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred.');
        }
    };

    return (
        <div className={'main-container'}>
            <h2>Signup Page</h2>
            <form onSubmit={handleSignup} className={'standard-form'}>
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
                <label>
                    Confirm Password:
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </label>
                <br />
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Create Account</button>
                <br />
                <span>or</span>
                <br />
                <a href="/login">Login</a>
            </form>
        </div>
    );
};

export default Signup;
