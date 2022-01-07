import data from './data';

function App() {
  return (
    <div className="grid-container">
            <header className="row">
                <div>
                    <a className="brand" href="index.html">Kamazon</a>
                </div>
                <div>
                    <a href="cart.html">Cart</a>
                    <a href="signin.html">Sign In</a>
                </div>
            </header>
            <main>
                <div className = "row centre">

                  {
                    data.products.map(product => (
                      <div key={product._id} className = "product">

                        <a href={`/product/${product._id}`}>
                            <img className="medium" src={product.image} alt={product.name} />
                            <div className="product-body">
                                <h2>{product.name}</h2>
                            </div>
                        </a>
                        <div className="price">
                            <h2>£{product.price}</h2>
                        </div>
                        <div className="seller">
                            <a href="profie.html">
                                <h3>sold by {product.seller}</h3>  
                            </a>
                        </div>
                    </div>
                    ))
                  }
                </div>
            </main>
            <footer className="row centre">All rights reserved</footer>
        </div>
  );
}

export default App;
