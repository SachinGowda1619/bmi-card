import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import QrCode from './components/QrCode';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/qrCode" element={<QrCode />} />
      </Routes>
    </Router>
  );
}

export default App;