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
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { CorporateShop } from './pages/CorporateShop';
import { Shop1Item } from './pages/Shop1Item';
import { GovtShop } from './pages/GovtShop';
import { Shop2Item } from './pages/Shop2Item';
import { ItemDetail } from './pages/ItemDetail';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import AdminLogin from './pages/AdminLogin'
import NewLandingPage from './pages/new-landing-page'; // Correct import statement
import Customer from './pages/Customer';
import RegisterOrg from './pages/RegisterOrg'

const AppContent = () => {
    const location = useLocation();

    return (
        <>
            {!(location.pathname === '/Login' || location.pathname === '/Register' || location.pathname.includes("admin")) && (location.pathname === '/' ? <Header /> : <NavBar />)}
            <ScrollTop />
            <Routes>
                <Route path="/" element={<NewLandingPage />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/About" element={<About />} />
                <Route path="/Contact" element={<Contact />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/Shop1" element={<CorporateShop />} />
                <Route path="/Shop1/:company" element={<Shop1Item />} />
                {/* Shop2 Temporary Path to access Government shop */}
                <Route path="/Shop2" element={<GovtShop />} />
                <Route path="/Shop2/:company" element={<Shop2Item />} />

                <Route path="/Shop1/:company/:name" element={<ItemDetail />} />
                {/* <Route path="/Customer" element={<Customer />} /> */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/Customer" element={<Customer />} />
                <Route path="/admin/dashboard" element={<AdminHomePage />} />
                <Route path="/admin/corporate/orgs" element={<AdminOrgPage />} />
                <Route path="/admin/corporate/orgs/register" element={<RegisterOrg />} />

            </Routes>
            {!(location.pathname === '/Login' || location.pathname === "/" || location.pathname === '/Register' || location.pathname.includes("admin")) && <Footer />}
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
