import './App.css';
import { BrowserRouter as HashRouter, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import QrCode from './components/QrCode';
import Admin from './components/Admin';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/bmi-card" element={<Home />} />
        <Route path="/qrCode" element={<QrCode />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
