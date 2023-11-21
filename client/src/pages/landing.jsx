import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./landing.css";

const Landing = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <section id='landing-parent'>
      <h1>CareerTrak</h1>
      <section>
        {/* <img src="" alt="CareerTrak" /> */}
      </section>
      <section className='links'>
        <button id='login-link' onClick={handleLoginClick}>Login</button>
        <button id='register-link' onClick={handleRegisterClick}>Register</button>
      </section>
    </section>
  );
}

export default Landing;
