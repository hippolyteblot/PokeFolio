// Profile.js
import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';
import '../../App.css';
import Header from "../../components/Header/Header";

const Profile = () => {
    const { logout } = useAuth();
    const [username, setUsername] = useState('exampleUser'); // Initialisez avec la valeur actuelle
    const [password, setPassword] = useState(''); // Vous pouvez également récupérer le mot de passe actuel du backend
    const [newPassword, setNewPassword] = useState('');
    const [profileImage, setProfileImage] = useState(''); // URL de l'image de profil, récupérée du backend
    const [collectionValue, setCollectionValue] = useState(0); // Valeur de la collection, récupérée du backend

    const handleUpdateProfile = () => {
        console.log('Profile mis à jour !');
    };

    return (
        <div className="main-container">
            <Header />
            <h2>Your Profile</h2>
            <div className="profile-info">
                <img src={profileImage} alt="Profile" className="profile-image" />
                <div className="standard-form">
                    <div className={"form-item"}>
                        <label>
                            Username:
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className={"form-item"}>
                        <label>
                            Current Password:
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className={"form-item"}>
                        <label>
                            New Password:
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </label>
                    </div>
                </div>
            </div>
            <div className="collection-info">
                <p>Collection Value: {collectionValue}</p>
            </div>
            <button onClick={handleUpdateProfile}>Update Profile</button>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Profile;
