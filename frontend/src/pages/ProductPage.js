import React from 'react';
import { useParams } from 'react-router-dom';
import SellerRating from '../components/SellerRating';
import data from '../data';


export default function ProductPage(props) {
    let { productId } = useParams();
    const product = data.products.find((x) => x._id === productId);
    if (!product){ 
        return <div>product not found or is no longer available</div>
    }
    return (
        /*
            Back to search result link
        */
        <div className='row'>
            <div className='product-page'>

                <div className='scroller'>
                    <img className='clickable' src={product.image} alt={product.name}></img>
                    <img className='clickable' src={product.image} alt={product.name}></img>
                    <img className='clickable' src={product.image} alt={product.name}></img>
                    <img className='clickable' src={product.image} alt={product.name}></img>
                    <img className='clickable' src={product.image} alt={product.name}></img>
                    <img className='clickable' src={product.image} alt={product.name}></img>
                    <img className='clickable' src={product.image} alt={product.name}></img>
                </div>

                <div className='product-image'>            
                    <img className="big" src={product.image} alt="primary"></img>
                </div>
                
            </div>

            
            <div className='additional-info'>
                <a className="seller" href="profie.html">
                    <h3 className='no-left-margin'>Ad by {product.seller}</h3>  
                    <SellerRating rating={product.seller_rating} reviewNums={product.rating_nums}></SellerRating>
                </a>
                
                <h1 className='no-left-margin'>{product.name}</h1>
                <h2 className='no-left-margin'>£{product.price}</h2>
                <h2 className='no-left-margin'>{product.description}</h2>

                {/*
                Buy Now (button)
                Add to Basket (button)
                Condition (new, refurbished, used, broken)
                Quantity available (1-9999)
                Quantity to buy (input, how many user wants to buy)
                Description
                Shipping Info
                */}

            </div>
        </div>
    )
}