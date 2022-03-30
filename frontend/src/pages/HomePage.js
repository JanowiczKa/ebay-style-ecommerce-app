import React, { useEffect, useState } from 'react'
import Product from '../components/Product';
import axios from 'axios';

export default function HomePage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get("api/products");
            setProducts(data);
            console.log(data);
        }
        fetchData();
    }, []); /* runs only on the first render */
    
    return (

        <div>
            <div className = "row centre"> 
            {/* currently passing one so I only need one thing to be rendered */}
                {<Product key={products._id} product={products}></Product>}
{/* 
                {products.map((product) => (
                    <Product key={product._id} product={product}></Product>
                ))} */}
            </div>
        </div>
    );
}