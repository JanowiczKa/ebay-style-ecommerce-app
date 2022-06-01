import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CartItemDisplay from '../components/CartItemDisplay';

export default function CartPage() {
  
  const [cartItems, setCartItems] = useState([]); //array of cart ids

  const handlePurchase = async event => {

    event.preventDefault();

    alert(cartItems);

    const response = await axios.post('/api/purchaseGoods',
    {
      user: localStorage.getItem('userId'),
      cartIds: cartItems,
    })
    .catch(function (error) {
      alert(`error: ${error}`);
    });

    alert(response.data);
    if (response.data  === "success"){
    }
    else{
    }

    window.location.reload();
  }

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

          <form onSubmit={handlePurchase}>
            <input className='button-cart' type="submit" value="Proceed to Checkout"></input>
          </form>  

        </div>
    </div>
);
}
