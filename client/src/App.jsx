import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/landing';
import RegisterForm from './components/registerform';
import LoginForm from './components/loginform';
import React from 'react';
import Dashboard from './pages/dashboard';
import Applications from './components/applications'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/applications" element={<Applications />} />
      </Routes>
    </Router>
  );
}

export default App;
