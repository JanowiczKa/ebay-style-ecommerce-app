import React from 'react'
import SellerRating from './SellerRating';

export default function Product(props) {
    const {product} = props;
    return (
        <div key={product._id} className = "product">

            <a href={`/product/${product._id}`}>
                <img className="medium" src={`/images/${product.ImageAddress}`} alt={product.ProductName} />

                <div className="product-body">
                    <h2>{product.ProductName}</h2>
                </div>
            </a>

            <div className="price">
                <h2>£{product.Price}</h2>
            </div>
                    
             <a className="seller" href={`profilePage/${product.SellerId}`}>
                <h3>Ad by {product.SellerName}</h3> 
                <SellerRating userId={product.SellerId}></SellerRating>
            </a>
        </div>
    )
}