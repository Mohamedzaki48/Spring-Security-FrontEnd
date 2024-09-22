import React from 'react';

const HomePage = () => {
    const handleButtonClick = async () => {
        try {
            const response = await fetch('http://localhost:8080/test');
            const data = await response.json();
            console.log(data); 
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div style={styles.container}>
            <h1>Welcome to the Home Page</h1>
            <p>This is a protected area, accessible only to authenticated users.</p>
            <button onClick={handleButtonClick} style={styles.button}>
                Call URL
            </button>
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
        textAlign: 'center'
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '20px'
    }
};

export default HomePage;
