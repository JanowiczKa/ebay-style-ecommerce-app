import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import SignInPage from './pages/SignInPage';

function App() {
  return (
    <BrowserRouter>
        <div className="grid-container">
            <header>
                <div className="row top">
                    <div>
                        <Link className="brand" to="/">Kamazon</Link>
                    </div>
                    <div>
                        Search Bar
                    </div>
                    <div className="menu">
                            <Link className="cart" to="cartPage">
                                Cart
                            </Link>
                            <a className="sign-in" href="signInPage">
                                Sign In
                            </a>   
                    </div>
                </div>
            </header>
            <main>
                <Routes>
                    <Route path="/product/:productId" element={<ProductPage/>}></Route>
                    <Route path="/" element={<HomePage/>} exact></Route>
                    <Route path="cartPage" element={<CartPage/>}></Route>
                    <Route path="signInPage" element={<SignInPage/>}></Route>
                </Routes>
            </main>
            <footer className="row centre">All rights reserved</footer>
        </div>
    </BrowserRouter>
  );
}

export default App;
