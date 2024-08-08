// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import NavBar from './pages/NavBar';
import LandingPage from './pages/LandingPage';
import About from './pages/About';
import Login from './pages/login'
import { HomePage } from './pages/HomePage';

const AppContent = () => {
    const location = useLocation();

    return (
        <>
            {location.pathname !== '/login' && (location.pathname === '/' ? <Header /> : <NavBar />)}
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/homepage" element={<HomePage />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </>
    );
};

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;
