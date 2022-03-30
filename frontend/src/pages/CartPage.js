import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CartItemDisplay from '../components/CartItemDisplay';

export default function CartPage() {
  
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
      const fetchData = async () => {

          const { data } = await axios.post("api/cart",{
            userId: localStorage.getItem("userId"),
          }); //returns an array of all cart item Id's

          setCartItems(data);
          //console.log(data);
      }
      fetchData();
  }, []); /* runs only on the first render */

  if (cartItems.length === 0){
    return (<div>Cart is Empty</div>)
  }

  return (
    /*
        Back to search result link
    */
    <div className="row displayProduct">

        <div className='scroller'>

            {cartItems.map((cartItem) => (
                    <CartItemDisplay key={cartItem} cartItemId={cartItem}></CartItemDisplay>
            ))} 
        </div>

        <div className='additional-info'>
            
            <div>
              <label >Total: </label>
            </div>

              
            <div>
              <button className='button-cart'>Proceed to Checkout</button>
            </div>
            
        </div>
    </div>
);
}
