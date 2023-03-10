// import logo from './logo.svg';
// import './App.css';
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router , Routes, Route} from "react-router-dom";
// import {Container, AppBar, Typhography, Grow, Grid} from '@material-ui/core';
// component
import MenuNavbar from "./components/MenuNavbar";
import Footer from "./components/footer";
// page
import HomePage from "./screen/HomePage";
import AboutUs from "./screen/AboutUs";
import Contact from "./screen/Contact";
import Shop from "./screen/Shop";

import ProductDetail from "./screen/ProductDetail";
import ProductCategory from "./screen/ProductCategory";
import Cart from "./screen/Cart";
import Wishlist from "./screen/Wishlist";
import Checkout from "./screen/Checkout";

// import Breadcrumbs from './components/Breadcrumbs';z
import Login from "./screen/Login";
import SignUp from "./screen/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";


import MyDashboard from "./screen/MyDashboard";
import OrderDetail from "./screen/OrderDetail";
import MyAccount from "./screen/MyAccount";

// page 404 not found
import Page404 from "./screen/page404";


export default function App() {
  return (

    <Router>
      {/* <dataFetching/> */}
      <MenuNavbar />

      {/* <Breadcrumbs/> */}  
      
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/product_detail/:id" element={<ProductDetail />} />
          <Route path="/shop/product_category/:id" element={<ProductCategory/>} />
          <Route path="/shop/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/shop/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/sign-up" element={<SignUp/>}></Route>
          <Route path="/my-dashboard" element={<ProtectedRoute><MyDashboard/></ProtectedRoute>}></Route>
          <Route path="/my-dashboard/order-detail/:id" element={<ProtectedRoute><OrderDetail/></ProtectedRoute>}></Route>
          <Route path="/my-account" element={<ProtectedRoute><MyAccount/></ProtectedRoute>}></Route>
          <Route path="*" element={<Page404/>} />
      </Routes>
      
      <Footer />
    </Router>

  );
}
