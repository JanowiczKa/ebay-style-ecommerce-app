import React from 'react'
import Product from '../components/Product';
import data from '../data';

export default function HomePage() {
    return (
        <div>
            <div className = "row centre">
                {data.products.map((product) => (
                    <Product key={product._id} product={product}></Product>
                ))}
            </div>
        </div>
    );
}
