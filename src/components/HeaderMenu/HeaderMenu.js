// HeaderMenu.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import './HeaderMenu.css';

const HeaderMenu = ({ isOpen, onClose }) => {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        onClose();
    };

    const handleClickOutside = (event) => {
        console.log('Is open:', isOpen);
        if (isOpen) {
            console.log('Click en dehors du menu');
            onClose();
        }
    };

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                document.addEventListener('click', handleClickOutside);
            }
            , 0);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen, onClose]);

    return (
        <div className={`header-menu ${isOpen ? 'open' : ''}`}>
            <div className="menu-items">
                <Link to="/main" onClick={onClose}>Main</Link>
                <Link to="/add-card" onClick={onClose}>Add card</Link>
                <Link to="/profile" onClick={onClose}>Profile</Link>
            </div>
        </div>
    );
};

export default HeaderMenu;
