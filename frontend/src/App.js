import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import SignInPage from './pages/SignInPage';
import ProfilePage from './pages/ProfilePage';
import ListProductPage from './pages/ListProductPage';

function App() {
    
    const handleLogout = () => {
        localStorage.clear();
        window.location.reload();
    };

    return (
        <BrowserRouter>
            <div className="grid-container">
                <header>
                    <div className="row top">
                        <div>
                            <Link className="brand" to="/">Kamazon</Link>
                        </div>

                        <div className="menu">

                        {localStorage.getItem('userId') ? 
                        <Link className="menuButton" to="listProductPage">
                        Sell Item
                        </Link> 
                        : 
                        ''
                        }

                        {localStorage.getItem('userId') ? 
                        <Link className="menuButton" to={`profilePage/${localStorage.getItem('userId')}`}>
                        Profile
                        </Link> 
                        : 
                        ''
                        }
                                
                        {localStorage.getItem('userId') ? 
                        <Link className="menuButton" to="cartPage">
                        Cart
                        </Link> 
                        : 
                        ''
                        }

                        {localStorage.getItem('userId') ? 
                        <Link className="menuButton" to="signInPage" onClick={() => handleLogout()}>
                        Sign Out
                        </Link> 
                        :
                        <Link className="sign-in" to="signInPage">
                        Sign In
                        </Link>                  
                        }

                        </div>
                    </div>
                </header>
                <main>
                    <Routes>
                        <Route path="product/:productId" element={<ProductPage/>}></Route>
                        <Route path="/" element={<HomePage/>} exact></Route>
                        <Route path="cartPage" element={<CartPage/>}></Route>
                        <Route path="signInPage" element={<SignInPage/>}></Route>
                        <Route path="profilePage/:profileId" element={<ProfilePage/>}></Route>
                        <Route path="listProductPage" element={<ListProductPage/>}></Route>
                    </Routes>
                </main>
                <footer className="row centre">All rights reserved</footer>
            </div>
        </BrowserRouter>
  );
}

export default App;
