// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer'
import NavBar from './components/NavBar';
import ScrollTop from './components/ScrollTop';
import AdminHomePage from './pages/AdminHomePage'
import AdminOrgPage from './pages/AdminOrgPage'
import AdminProductPage from './pages/AdminProductPage';
import ViewAllOrder from './pages/viewAllOrder'
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Profile } from './pages/Profile';
import { OrderHistory } from './pages/OrderHistory';
import { Shop1Item } from './pages/Shop1Item';
import { GovtShop } from './pages/GovtShop';
import { Shop2Item } from './pages/Shop2Item';
import { ItemDetail } from './pages/ItemDetail';
import { ShoppingCart } from './pages/ShoppingCart';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { SnapLogin } from './pages/SnapStitchLogin'
import { SnapRegister } from './pages/SnapStitchRegister'
import { CartProvider } from './components/CartContext'
import ResetPassword from './components/resetPassword';
import CreateEmployee from './pages/RegisterEmp'
import AdminLogin from './pages/AdminLogin'
import AdminOrderPage from './pages/AdminOrderPage';
import NewLandingPage from './pages/new-landing-page'; // Correct import statement
import RegisterOrg from './pages/RegisterOrg'
import RegisterProduct from './pages/RegisterProduct'
import RegisterProductBulk from './pages/RegisterProductBulk'
import EditInfo from './components/EditInfo'
import ViewAllOrg from './pages/viewAllOrg';
import ViewAllProduct from './pages/viewAllProduct';
import OrderDetailPage from './pages/OrderDetailPage'
import DeactivateOrganization from './pages/DeactivateOrg';
import ProtectAdminRoute from './components/ProtectAdminRoute';
import ProtectTempAccRoute from './components/ProtectTempAccRoute';
import { SnapStitchHome } from './pages/SnapStitchHome';
import { OrderCompleted } from './pages/OrderCompleted';
import { AdminNotFoundPage } from './pages/AdminNotFoundPage';
import { NotFoundPage } from './pages/NotFoundPage';


const AppContent = () => {
    console.log("part 1")
    const location = useLocation();

    const [isContentShort, setIsContentShort] = useState(false);

    const updateFooterPosition = (value) => {
        if (value) {
            setIsContentShort(value);
        } else {
            const contentHeight = document.body.scrollHeight;
            const windowHeight = window.innerHeight;

            if (isContentShort !== (contentHeight < windowHeight)) {
                console.log(contentHeight, windowHeight);
                setIsContentShort(contentHeight < windowHeight);
            }
        }
    };

    // No way to wait individual element to load first, so hardcode paths that have images / content that have absolute position    
    useEffect(() => {
        console.log("part 2");

        const pathname = location.pathname.toLowerCase();
        if (
            pathname.includes("home") ||
            pathname.includes("profile") ||
            pathname.includes("orderhistory") ||
            pathname.includes("shop")
        ) {
            setIsContentShort(false);
        } else {
            updateFooterPosition();
        }
    }, [location, updateFooterPosition]);




    return (
        <>
            {/* // <CartProvider> */}

            {/* {!(location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/shoppingcart' || location.pathname === "/profile" || location.pathname === "/orderhistory" || location.pathname.includes("admin") || location.pathname.includes("snap") || location.pathname.includes("success")) && (location.pathname === '/' ? <Header /> : <NavBar />)} */}

            <ScrollTop />
            <Routes>
                {/* <Route path="*" element={<NotFoundPage />} />
                <Route path="/" element={<NewLandingPage />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} /> */}
                {/* <Route path="/profile" element={<ProtectTempAccRoute element={<Profile />} />} />
                <Route path="/orderhistory" element={<OrderHistory />} />
                <Route path="/success" element={<OrderCompleted />} /> */}

                {/* reset password */}
                {/* <Route path="/reset-password/:token" element={<ResetPassword />} /> */}

                {/* Protect the following admin routes */}
                {/* <Route path="/admin/dashboard" element={<ProtectAdminRoute element={<AdminHomePage />} />} />
                <Route path="/admin/corporate/orgs" element={<ProtectAdminRoute element={<AdminOrgPage />} />} />
                <Route path="/admin/corporate/orgs/register" element={<ProtectAdminRoute element={<RegisterOrg />} />} /> */}

                {/* <Route path="/Shop1/" element={<CorporateShop />} /> */}
                {/* <Route path="/Shop1" element={<Shop1Item />} /> */}
                {/* Shop2 Temporary Path to access Government shop */}
                {/* <Route path="/Shop2" element={<GovtShop />} /> */}
                {/* <Route path="/Shop2/:company" element={<Shop2Item />} /> */}


                {/* <Route path="/Shop1/:name" element={<ItemDetail />} /> */}

                {/* <Route path="/shoppingcart" element={<ShoppingCart />} /> */}

                {/* Protect the following admin routes */}
                {/* <Route path="/admin/*" element={<ProtectAdminRoute element={<AdminNotFoundPage />} />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminHomePage />} />
                <Route path="/admin/dashboard" element={<ProtectAdminRoute element={<AdminHomePage />} />} />
                <Route path="/admin/dashboard/view-orders" element={<ProtectAdminRoute element={<ViewAllOrder />} />} />
                <Route path="/admin/corporate/orgs" element={<ProtectAdminRoute element={<AdminOrgPage />} />} />
                <Route path="/admin/corporate/orgs/register" element={<ProtectAdminRoute element={<RegisterOrg />} />} />
                <Route path="/admin/corporate/orgs/deactivate" element={<ProtectAdminRoute element={<DeactivateOrganization />} />} />
                <Route path="/admin/corporate/view-orgs" element={<ProtectAdminRoute element={<ViewAllOrg type="corporate" />} />} />
                <Route path="/admin/corporate/products" element={<ProtectAdminRoute element={<AdminProductPage />} />} />
                <Route path="/admin/corporate/products/register" element={<ProtectAdminRoute element={<RegisterProduct />} />} />
                <Route path="/admin/corporate/products/registerBulk" element={<ProtectAdminRoute element={<RegisterProductBulk />} />} />
                <Route path="/admin/corporate/view-products" element={<ProtectAdminRoute element={<ViewAllProduct type="corporate" />} />} />
                <Route path="/admin/corporate/orders" element={<ProtectAdminRoute element={<AdminOrderPage />} />} />
                <Route path="/admin/corporate/view-ready-orders" element={<ProtectAdminRoute element={<ViewAllOrder type="corporate" isReady={true} />} />} />
                <Route path="/admin/corporate/view-orders" element={<ProtectAdminRoute element={<ViewAllOrder type="corporate" />} />} />
                <Route path="/admin/corporate/orders/detail" element={<ProtectAdminRoute element={<OrderDetailPage />} />} />
                <Route path="/admin/edit" element={<ProtectAdminRoute element={<EditInfo />} />} />
                <Route path="/admin/order-details" element={<ProtectAdminRoute element={<OrderDetailPage />} />} /> */}

                {/* Government pages */}
                {/* <Route path="/admin/government/orgs" element={<ProtectAdminRoute element={<AdminOrgPage />} />} />
                <Route path="/admin/government/orgs/register" element={<ProtectAdminRoute element={<RegisterOrg />} />} />
                <Route path="/admin/government/orgs/deactivate" element={<ProtectAdminRoute element={<DeactivateOrganization />} />} />
                <Route path="/admin/government/orgs/view-orgs" element={<ProtectAdminRoute element={<ViewAllOrg type="government" />} />} />
                <Route path="/admin/government/products" element={<ProtectAdminRoute element={<AdminProductPage />} />} />
                <Route path="/admin/government/products/register" element={<ProtectAdminRoute element={<RegisterProduct />} />} />
                <Route path="/admin/government/products/registerBulk" element={<ProtectAdminRoute element={<RegisterProductBulk />} />} />
                <Route path="/admin/government/view-orgs" element={<ProtectAdminRoute element={<ViewAllOrg type="government" />} />} />
                <Route path="/admin/government/view-products" element={<ProtectAdminRoute element={<ViewAllProduct type="government" />} />} />
                <Route path="/admin/government/orders" element={<ProtectAdminRoute element={<AdminOrderPage />} />} />
                <Route path="/admin/government/view-ready-orders" element={<ProtectAdminRoute element={<ViewAllOrder type="government" isReady={true} />} />} />
                <Route path="/admin/government/view-orders" element={<ProtectAdminRoute element={<ViewAllOrder type="government" />} />} /> */}



                <Route path="/snap/login" element={<SnapLogin />} />
                <Route path="/snap/register" element={<SnapRegister />} />
                <Route path="/snap" element={<CreateEmployee />} />
                <Route path="/snap/home" element={<SnapStitchHome />} />

            </Routes>

            {!(location.pathname === '/login' || location.pathname === "/" || location.pathname === '/register' || location.pathname.includes("admin") || location.pathname.includes("snap") || location.pathname.includes("success")) && <Footer isContentShort={isContentShort} />}
            {/* </CartProvider > */}
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
