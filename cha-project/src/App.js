// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer'
import NavBar from './pages/NavBar';
import LandingPage from './pages/LandingPage';
import About from './pages/About';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import Login from './pages/login'

const AppContent = () => {
    const location = useLocation();

    return (
        <>
            {location.pathname !== '/login' && (location.pathname === '/' ? <Header /> : <NavBar />)}
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/home" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
            </Routes>
            {location.pathname !== "/" ? <Footer /> : null}
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
