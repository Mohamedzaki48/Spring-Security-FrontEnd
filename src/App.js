import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import Login from './Login';

function App() {
    const navigate = useNavigate();

    // Function to check session validity
    const checkSession = async () => {
        try {
            // Get the JWT token from localStorage
            const token = localStorage.getItem('jwtToken');
            
            if (!token) {
                // If no token, redirect to login
                navigate("/login");
                return;
            }

            // Send request with JWT token in Authorization header
            const response = await fetch('http://localhost:8080/test', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`  // Attach token to request
                },
            });

            // If the request fails, navigate to login
            if (response.status === 401 || response.status === 403) {
                navigate("/login");
            } else {
                navigate('/home');
            }

        } catch (error) {
            console.error('Session check failed:', error);
            navigate("/login");
        }
    };

    useEffect(() => {
        checkSession();
    }, []);

    return (
        <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
        </Routes>
    );
}

export default App;
