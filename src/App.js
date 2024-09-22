// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import Login from './Login';

function App() {
    const navigate = useNavigate();
    const checkSession = async () => {
        try {
            debugger;
            const response = await fetch('http://localhost:8080/test', {
                method: 'GET',
                credentials: 'include',  // Include cookies in the request
            });

            if (!response.redirected) {
                navigate('/home');
            } else {
                navigate("/login")
            }
        } catch (error) {
            console.error('Session check failed:', error);
            navigate("/login")
        }
    };

    useEffect(() => { checkSession() }, [])

    return (

        <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
            {/* Add more routes as needed */}
        </Routes>
    );
}

export default App;









