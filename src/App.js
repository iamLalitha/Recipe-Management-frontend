import React from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppRoutes from './Routes';
import './App.css';


function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="container mt-4">
          <Routes>
          <Route path="/*" element={<AppRoutes />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
