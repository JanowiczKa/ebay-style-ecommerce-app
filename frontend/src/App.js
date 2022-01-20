import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';

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
                            <a className="cart" href="cart.html">
                                Cart
                            </a>
                            <a className="sign-in" href="signin.html">
                                Sign In
                            </a>   
                    </div>
                </div>
            </header>
            <main>
                <Routes>
                    <Route path="/product/:productId" element={<ProductPage/>}></Route>
                    <Route path="/" element={<HomePage/>} exact></Route>
                </Routes>
            </main>
            <footer className="row centre">All rights reserved</footer>
        </div>
    </BrowserRouter>
  );
}

export default App;
