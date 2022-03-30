import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function SellerRating(props) {
    const {userId} = props;
    const [userRatings, setUserRatings] = useState([]);
    
    useEffect(() => {
        
        const fetchData = async () => {

            const data = await axios.post('/api/reviews',
                {
                  sellerId: userId
                });
            setUserRatings(data.data);
        }
        fetchData();

        console.log(`hi, the user data is ${userRatings}`);
    }, []); /* runs only on the first render */

    return (
        <div> {/*this is really messy but it'll do for now (conditional rendering)*/}           
            <div className="rating">
                {userRatings.Rating >= 1 ? <img className="icon" src="/images/star-full.png" alt=""/>: 
                userRatings.Rating >= 0.5 ? <img className="icon" src="/images/star-half.png" alt=""/>: 
                <img className="icon" src="/images/star-empty.png" alt=""/>}
                {userRatings.Rating >= 2 ? <img className="icon" src="/images/star-full.png" alt=""/>: 
                userRatings.Rating >= 1.5 ? <img className="icon" src="/images/star-half.png" alt=""/>: 
                <img className="icon" src="/images/star-empty.png" alt=""/>}
                {userRatings.Rating >= 3 ? <img className="icon" src="/images/star-full.png" alt=""/>: 
                userRatings.Rating >= 2.5 ? <img className="icon" src="/images/star-half.png" alt=""/>: 
                <img className="icon" src="/images/star-empty.png" alt=""/>}
                {userRatings.Rating >= 4 ? <img className="icon" src="/images/star-full.png" alt=""/>: 
                userRatings.Rating >= 3.5 ? <img className="icon" src="/images/star-half.png" alt=""/>: 
                <img className="icon" src="/images/star-empty.png" alt=""/>}
                {userRatings.Rating >= 5 ? <img className="icon" src="/images/star-full.png" alt=""/>: 
                userRatings.Rating >= 4.5 ? <img className="icon" src="/images/star-half.png" alt=""/>: 
                <img className="icon" src="/images/star-empty.png" alt=""/>}
                <h3>({userRatings.Ratings})</h3>
            </div>
        </div>
    )
}