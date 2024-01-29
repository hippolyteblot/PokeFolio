// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Home from './pages/Home/Home';
import Main from './pages/Main/Main';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Profile from './pages/Profile/Profile';
import AddCard from "./pages/AddCard/AddCard";
import CardViewer from "./pages/CardViewer/CardViewer";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/main" element={<Main />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/add-card" element={<AddCard />} />
                    <Route path="/card-viewer/:id" element={<CardViewer />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
