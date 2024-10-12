import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home'; 
import About from './pages/About'; 
import Login from './pages/Login'; 
import Dashboard from './pages/Dashboard';
import IncidentReport from './pages/IncidentReport';
import CreateAnnouncements from './pages/CreateAnnouncements';
import UploadPrograms from './pages/UploadPrograms';
import ColorLegend from './pages/ColorLegend';

function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/reports" element={<IncidentReport />}/>
        <Route path="/create" element={<CreateAnnouncements />}/>
        <Route path="/upload" element={<UploadPrograms />}/>
        <Route path="/create" element={<CreateAnnouncements />}/>
        <Route path="/color" element={<ColorLegend />}/>
      </Routes>
    </Router>
  );
}

export default App;
