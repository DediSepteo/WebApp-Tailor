// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import NavBar from './pages/NavBar'
// import Home from './pages/Home';
import About from './pages/About';
import LandingPage from './pages/LandingPage';
import { HomePage } from './pages/HomePage'

function App() {
    return (
        <Router>
            {/* <Header /> */}
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<About />} />
                <Route path="/landingpage" element={<LandingPage />} />
            </Routes>
        </Router>
    );
}

export default App;
