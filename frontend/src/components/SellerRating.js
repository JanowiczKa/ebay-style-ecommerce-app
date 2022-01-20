import React from 'react'

export default function SellerRating(props) {
    const {rating} = props;
    return (
        <div> {/*this is really messy but it'll do for now (conditional rendering)*/}
            <div className="rating">
                {rating >= 1 ? <img className="icon" src="/images/star-full.png" alt=""/>: 
                rating >= 0.5 ? <img className="icon" src="/images/star-half.png" alt=""/>: 
                <img className="icon" src="/images/star-empty.png" alt=""/>}
                {rating >= 2 ? <img className="icon" src="/images/star-full.png" alt=""/>: 
                rating >= 1.5 ? <img className="icon" src="/images/star-half.png" alt=""/>: 
                <img className="icon" src="/images/star-empty.png" alt=""/>}
                {rating >= 3 ? <img className="icon" src="/images/star-full.png" alt=""/>: 
                rating >= 2.5 ? <img className="icon" src="/images/star-half.png" alt=""/>: 
                <img className="icon" src="/images/star-empty.png" alt=""/>}
                {rating >= 4 ? <img className="icon" src="/images/star-full.png" alt=""/>: 
                rating >= 3.5 ? <img className="icon" src="/images/star-half.png" alt=""/>: 
                <img className="icon" src="/images/star-empty.png" alt=""/>}
                {rating >= 5 ? <img className="icon" src="/images/star-full.png" alt=""/>: 
                rating >= 4.5 ? <img className="icon" src="/images/star-half.png" alt=""/>: 
                <img className="icon" src="/images/star-empty.png" alt=""/>}
                <h3>({rating})</h3>
            </div>
        </div>
    )
}
