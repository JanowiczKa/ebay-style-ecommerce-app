import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function CartItemDisplay(props) {
    
    const {cartItemId} = props;
    const [cartItem, setCartItem] = useState([]);
    //const [cartObject, setCartObject] = useState([]);
    
    useEffect(() => {

        const fetchData = async () => {

            const { data } = await axios.post("api/retrieveCartItem",{
                cartId: cartItemId
            }); //returns an array of all cart item Id's

            console.log(data);
            setCartItem(data);
        }

        fetchData();

    }, [cartItemId]); /* runs only on the first render */

    return (
        <div className = "cartItem">

            <div className=''>            
                <img className="small" src={`/images/${cartItem.ImageAddress}`} alt={cartItem.ProductName}></img>
            </div>

            <a href={`/product/${cartItem._id}`}>{cartItem.ProductName}</a>

            <div className="price">
                <h2>£{cartItem.Price}</h2>
            </div>

            <div className="qty">
                <h2>Stock: {cartItem.Quantity}</h2>
                <input type="number" 
                    id="qty" 
                    name="qty" 
                    min='1' 
                    max={cartItem.Quantity} 
                    value={1} 
                    />
            </div>

            <a>Remove</a>
        </div>
    )
}