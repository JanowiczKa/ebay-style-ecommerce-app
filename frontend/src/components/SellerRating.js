import React from 'react'

export default function SellerRating(props) {
    const {rating, reviewNums} = props;
    return (
        <div> {/*this is really messy but it'll do for now*/}
            <div className="rating">
                {rating >= 1 ? <img className="icon" src="/images/star-full.png"/>: 
                rating >= 0.5 ? <img className="icon" src="/images/star-half.png"/>: 
                <img className="icon" src="/images/star-empty.png"/>}
                {rating >= 2 ? <img className="icon" src="/images/star-full.png"/>: 
                rating >= 1.5 ? <img className="icon" src="/images/star-half.png"/>: 
                <img className="icon" src="/images/star-empty.png"/>}
                {rating >= 3 ? <img className="icon" src="/images/star-full.png"/>: 
                rating >= 2.5 ? <img className="icon" src="/images/star-half.png"/>: 
                <img className="icon" src="/images/star-empty.png"/>}
                {rating >= 4 ? <img className="icon" src="/images/star-full.png"/>: 
                rating >= 3.5 ? <img className="icon" src="/images/star-half.png"/>: 
                <img className="icon" src="/images/star-empty.png"/>}
                {rating >= 5 ? <img className="icon" src="/images/star-full.png"/>: 
                rating >= 4.5 ? <img className="icon" src="/images/star-half.png"/>: 
                <img className="icon" src="/images/star-empty.png"/>}
                <h3>({rating})</h3>
            </div>
        </div>
    )
}
