import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    username,
                    password,
                }),
               // credentials: 'include',  // Include cookies in the request
            });

            if (response.ok) {
                const data = await response.json();             
                if (data.token) {
                    // Save JWT token to localStorage
                    localStorage.setItem('jwtToken', data.token);
                    
                    // Navigate to the home page after successful login
                    navigate('/home');
                } else {
                    setError('Login failed: No token received.');
                }
            } else if (response.redirected) {
                // Handle redirection from the backend (Spring Security default behavior)
                if (response.url.includes('error')) {
                    setError('Invalid username or password');
                } else {
                    navigate('/home');
                }
            } else {
                setError('Invalid username or password');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };			


    return (
        <div style={styles.container}>
            <h1>Login Page</h1>
            <form onSubmit={handleLogin} style={styles.form}>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <br />
                <button type="submit">Login</button>
                {error && <p style={styles.error}>{error}</p>}
            </form>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    error: {
        color: 'red',
    },
};

export default LoginPage;
