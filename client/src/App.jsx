
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Landing from './pages/landing';
import RegisterForm from './components/registerform';
import LoginForm from './components/loginform';
import React from 'react';

const App = () => {

  return (
    <Router>
      
      <Routes>
        <Route path="/" exact element={<Landing />} />
        <Route path="/Login" element={<LoginForm />} />
        <Route path="/Register" element={<RegisterForm />} />
      </Routes>
    </Router>
    
    
  );
}

export default App
