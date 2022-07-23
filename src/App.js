import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
import {
  SingleProduct,
  About,
  AuthWrapper,
  ErrorPage,
  CartPage,
  CheckoutPage,
  PrivatePage,
  Products,
  Home,
} from "./pages/index";

function App() {
  return (
    <AuthWrapper>
      <Router>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route
            path="/checkout"
            element={
              <PrivatePage>
                <CheckoutPage />
              </PrivatePage>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </Router>
    </AuthWrapper>
  );
}

export default App;
