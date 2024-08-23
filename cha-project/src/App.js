// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer'
import NavBar from './components/NavBar';
import ScrollTop from './components/ScrollTop';
import LandingPage from './pages/LandingPage';
import About from './pages/About';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Category } from './pages/Category';

const AppContent = () => {
    const location = useLocation();

    return (
        <>
            {(location.pathname === '/' ? <Header /> : null)}
            <ScrollTop />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/Shop" element={<Shop />} />
                <Route path="/About" element={<About />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/Corporate" element={<Category type="Corporate" />} />
                <Route path="/Government" element={<Category type="Government" />} />
            </Routes>
            {/* {!(location.pathname === '/Login' || location.pathname === '/Register') && <Footer />} */}
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
