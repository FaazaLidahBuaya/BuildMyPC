import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import BuilderPage from './pages/BuilderPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-white selection:bg-accent selection:text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/build" element={<BuilderPage />} />
        </Routes>
        <footer className="py-8 text-center text-gray-600 font-mono text-xs uppercase tracking-widest border-t border-white/5 mt-auto">
          &copy; {new Date().getFullYear()} BuildMyPC. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;
