import React from 'react';
import './dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    
    const firstName = localStorage.getItem('firstName');
    const navigate = useNavigate();
    // console.log('Retrieved first name:', firstName);

    const handleOpenListClick = () => {
        navigate('/applications');
    };


    return (
        <section>
            <section className="dashboard">
                <h1>Dashboard</h1>
                <p>Welcome, {firstName}</p>
                <section id="dash-buttons">
                    <button onClick={handleOpenListClick}>open list</button>
                    <button>new application</button>
                </section>
            </section>
            <nav>
                <ul className="navbar">
                    <li>About Us</li>
                    <li>Sign Out</li>
                </ul>
            </nav>
        </section>
    );
};

export default Dashboard;
