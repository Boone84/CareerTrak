import React from 'react';
import { Link } from 'react-router-dom';


const Landing = () => {
  return (
    <section>
      <h1>CareerTrak</h1>
      <section>
        <img src="" />
      </section>
      <section>
        <Link id='login-link' to="/login">Login</Link>
        <Link id='register-link' to="/register">Register</Link>
      </section>
    </section>
  );
}

export default Landing;