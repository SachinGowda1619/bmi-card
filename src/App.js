import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import QrCode from './components/QrCode';
import Admin from './components/Admin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/qrCode" element={<QrCode />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
