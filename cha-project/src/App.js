// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer'
import NavBar from './components/NavBar';
import ScrollTop from './components/ScrollTop';
import LandingPage from './pages/LandingPage';
import AdminHomePage from './pages/AdminHomePage'
import AdminOrgPage from './pages/AdminOrgPage'
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Category } from './pages/Category';
import { CategoryItem } from './pages/CategoryItem';
import { About } from './pages/About';
import NewLandingPage from './pages/new-landing-page'; // Correct import statement
import Customer from './pages/Customer';
import RegisterOrg from './pages/RegisterOrg'

const AppContent = () => {
    const location = useLocation();

    return (
        <>
            {!(location.pathname === '/Login' || location.pathname === '/Register' || location.pathname.includes("meow")) && (location.pathname === '/' ? <Header /> : <NavBar />)}
            <ScrollTop />
            <Routes>
                <Route path="/" element={<NewLandingPage />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/Shop" element={<Shop />} />
                <Route path="/About" element={<About />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/Corporate" element={<Category type="Corporate" />} />
                <Route path="/Government" element={<Category type="Government" />} />
                {/* <Route path="/Customer" element={<Customer />} /> */}
                {/* Dynamic Route for CategoryItem */}
                <Route path="/Corporate/:company" element={<CategoryItem />} />
                <Route path="/Customer" element={<Customer />} />
                <Route path="/meow/dashboard" element={<AdminHomePage />} />
                <Route path="/meow/corporate/orgs" element={<AdminOrgPage />} />
                <Route path="/meow/corporate/orgs/register" element={<RegisterOrg />} />

            </Routes>
            {!(location.pathname === '/Login' || location.pathname === "/" || location.pathname === '/Register' || location.pathname.includes("meow")) && <Footer />}
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
