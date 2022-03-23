import React from "react";

const SingleCard = ({ zIndex = 0, cards }) => {
    const backgroundImage = cards && cards[1].photos[0];

if (!cards) return null;
return (
    <div className="card" style={{ zIndex, backgroundColor: 'black', backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.25) 20%, rgba(0,0,0,0.25) 20%), url(${backgroundImage})` }}>
    <div className="infoContainer">
        <h1>{cards[1].name}</h1>
            <ul className="foodStyle">
            {cards[1].categories.map((category, index) => <li key={index}>{category.title}</li>)}
        </ul>
        <p className="rating">Rating: {cards[0].rating}</p>
    </div>
    </div>
)};

export default SingleCard;
