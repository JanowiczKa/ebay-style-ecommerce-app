import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';

function App() {
  return (
    <BrowserRouter>
        <div className="grid-container">
            <header>
                <div className="row top">
                    <div>
                        <a className="brand" href="index.html">Kamazon</a>
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
                    <Route path="/product/:id" element={<ProductPage/>}></Route>
                    <Route path="/" element={<HomePage/>} exact></Route>
                </Routes>
            </main>
            <footer className="row centre">All rights reserved</footer>
        </div>
    </BrowserRouter>
  );
}

export default App;
