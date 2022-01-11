import React from 'react'
import SellerRating from './SellerRating';

export default function Product(props) {
    const {product} = props;
    return (
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
                    
             <div>
                <a className="seller" href="profie.html">
                    <h3>Ad by {product.seller}</h3>  
                    <SellerRating rating={product.seller_rating} reviewNums={product.rating_nums}></SellerRating>
                </a>
            </div>
        </div>
    )
}