
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Landing from './pages/landing';
import Navbar from './components/navbar';

const App = () => {

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" exact element={<Landing />} />

      </Routes>
    </Router>
    
    
  );
}

export default App
