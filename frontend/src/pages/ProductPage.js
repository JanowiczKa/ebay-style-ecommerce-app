import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SellerRating from '../components/SellerRating';

export default function ProductPage() {

    let { productId } = useParams();
    const [product, setProduct] = useState([]);
    const [quantity, setQuantity] = useState(1);

    async function addToCart() {

        let y = quantity;

        if (quantity > product.Quantity){
            y = product.Quantity;
        }
    
        const response = await axios.post('/api/addToCart',
        {
          itemId: product._id,
          userId: localStorage.getItem("userId"),
          quantitySelected: y
        })
        .catch(function (error) {
          alert(`error: ${error}`);
        });

        //alert(response);
    }

    useEffect( () => {

        const fetchData = async () => {
            const data = await axios.post('/api/getProduct',
            {
                prodId: productId
            });
    
            setProduct(data.data);
    
            //the reason for why the ratings don't load is 
            //because it recieves no data due to setProduct being async ;c
    
            console.log(`product is: ${product}`);
        }

        fetchData();

    }, []); /* runs only on the first render */
    
    if (!product){ 
        return <div>Product not found or is no longer available</div>
    }

    return (
        /*
            Back to search result link
        */
        <div className="row displayProduct">

            <div className='product-page'>
                <div className='product-image'>            
                    <img className="big" src={`/images/${product.ImageAddress}`} alt="primary"></img>
                </div>

                <div>
                    <input type="file"/>
                    <button>Upload</button>
                </div>  
            </div>

            <div className='additional-info'>
                
                {!!product ?
                    <a className="seller" href={`profilePage/${product.SellerId}`}>
                        <h3>Ad by {product.SellerName}</h3> 
                        <SellerRating userId={product.SellerId}></SellerRating>
                    </a>
                :
                <h3 className='no-left-margin'>{product.SellerId}</h3>
                }

                <h1 className='no-left-margin'>{product.ProductName}</h1>
                <h2 className='no-left-margin'>£{product.Price}</h2>

                {localStorage.getItem("userId") ? 
                    <button className='button-cart' 
                    onClick={() => addToCart()}>
                    Add to Cart
                    </button>
                    :
                    <button className='button-cart'>
                    Log in
                    </button>
                }

                <div>
                    <label htmlFor="qty">Quantity:</label>
                    <input type="number" 
                    id="qty" 
                    name="qty" 
                    min='1' 
                    max={product.Quantity} 
                    value={quantity} 
                    onChange={(i) => setQuantity(i.target.value)} 
                    /><br/>
                </div>
                
                <h2 className='no-left-margin'>{product.Description}</h2>

            </div>
        </div>
    )
}