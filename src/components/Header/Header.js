// Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderMenu from '../HeaderMenu/HeaderMenu';
import { useAuth } from '../../AuthContext';
import '../../App.css';
import './Header.css';

const Header = () => {
    const { logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <div className="header">
            <h2>Pokefolio</h2>
            <button onClick={toggleMenu}>Menu</button>
            <HeaderMenu isOpen={isMenuOpen} onClose={closeMenu} />
        </div>
    );
};

export default Header;
