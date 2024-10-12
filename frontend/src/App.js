import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home'; // Correct path
import About from './pages/About'; // Correct path
import Login from './pages/Login'; // Correct path
import Dashboard from './pages/Dashboard';
import IncidentReport from './pages/IncidentReport';

function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard route */}
        <Route path="/reports" element={<IncidentReport />}/>
      </Routes>
    </Router>
  );
}

export default App;
