// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer'
import NavBar from './components/NavBar';
import ScrollTop from './components/ScrollTop';
import AdminHomePage from './pages/AdminHomePage'
import AdminOrgPage from './pages/AdminOrgPage'
import AdminProdPage from './pages/AdminProdPage';
import AdminOrgGovtPage from './pages/AdminOrgGovt'
import ViewAllOrder from './pages/viewAllOrder'
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Profile } from './pages/Profile';
import { OrderHistory } from './pages/OrderHistory';
import { CorporateShop } from './pages/CorporateShop';
import { Shop1Item } from './pages/Shop1Item';
import { GovtShop } from './pages/GovtShop';
import { Shop2Item } from './pages/Shop2Item';
import { ItemDetail } from './pages/ItemDetail';
import { ShoppingCart } from './pages/ShoppingCart';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { SnapLogin } from './pages/SnapStitchLogin'
import { SnapRegister } from './pages/SnapStitchRegister'
import CreateEmployee from './pages/RegisterEmp'
import AdminLogin from './pages/AdminLogin'
import NewLandingPage from './pages/new-landing-page'; // Correct import statement
import RegisterOrg from './pages/RegisterOrg'
import RegisterProd from './pages/RegisterProd'
import RegisterProdBulk from './pages/RegisterProdBulk'

const ProtectAdminRoute = ({ element }) => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');

    if (!token) {
        navigate('/admin/login');
        return null;
    }

    return element;
}

const AppContent = () => {
    const location = useLocation();

    return (
        <>

            {!(location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/shoppingcart' || location.pathname === "/profile" || location.pathname === "/orderhistory" || location.pathname.includes("admin")) && (location.pathname === '/' ? <Header /> : <NavBar />)}

            <ScrollTop />
            <Routes>
                <Route path="/" element={<NewLandingPage />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/orderhistory" element={<OrderHistory />} />
                <Route path="/admin/login" element={<AdminLogin />} />

                {/* Protect the following admin routes */}
                {/* <Route path="/admin/dashboard" element={<ProtectAdminRoute element={<AdminHomePage />} />} />
                <Route path="/admin/corporate/orgs" element={<ProtectAdminRoute element={<AdminOrgPage />} />} />
                <Route path="/admin/corporate/orgs/register" element={<ProtectAdminRoute element={<RegisterOrg />} />} /> */}

                <Route path="/admin/dashboard" element={<AdminHomePage />} />
                <Route path="/admin/corporate/orgs" element={<AdminOrgPage />} />
                <Route path="/admin/corporate/orgs/register" element={<RegisterOrg />} />

                {/* for gov */}
                <Route path="/admin/government/orgs" element={<AdminOrgGovtPage />} />
                <Route path="/admin/go/orgs/register" element={<RegisterOrg />} />


                <Route path="/Shop1" element={<CorporateShop />} />
                <Route path="/Shop1/:company" element={<Shop1Item />} />
                {/* Shop2 Temporary Path to access Government shop */}
                <Route path="/Shop2" element={<GovtShop />} />
                <Route path="/Shop2/:company" element={<Shop2Item />} />

                <Route path="/Shop1/:company/:name" element={<ItemDetail />} />

                <Route path="/shoppingcart" element={<ShoppingCart />} />

                {/* <Route path="/Customer" element={<Customer />} /> */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminHomePage />} />
                <Route path="/admin/dashboard/view-orders" element={<ViewAllOrder />} />
                <Route path="/admin/corporate/orgs" element={<AdminOrgPage />} />
                <Route path="/admin/corporate/orgs/register" element={<RegisterOrg />} />
                <Route path="/admin/corporate/products" element={<AdminProdPage />} />
                <Route path="/admin/corporate/products/register" element={<RegisterProd />} />
                <Route path="/admin/corporate/products/registerBulk" element={<RegisterProdBulk />} />

                <Route path="/snap/login" element={<SnapLogin />} />
                <Route path="/snap/register" element={<SnapRegister />} />
                <Route path="/snap" element={<CreateEmployee />} />

            </Routes>

            {!(location.pathname === '/login' || location.pathname === "/" || location.pathname === '/register' || location.pathname.includes("admin")) && <Footer />}

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
