// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import '../../App.css';

const Home = () => {
    const { isLoggedIn } = useAuth();

    return (
        <div className="main-container">
            <h1>Welcome to Pokefolio</h1>
            <p>Explore the world of Pokémon and manage your Pokémon collection with Pokefolio.</p>
            {isLoggedIn ? (
                <Link to="/main">Go to Main Page</Link>
            ) : (
                <div id="auth-buttons">
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                    <span>or</span>
                    <Link to="/signup">
                        <button>Create an Account</button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Home;
