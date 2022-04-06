import React, { ComponentType } from 'react';

export interface iCard {
  name: string;
  rating: number;
  url: string;
  review_count: number;
  price: string;
  photos: string[];
  categories: [{ title: string }];
  hours: [{ is_open_now: boolean; open: [{ start: string; end: string; day: number }] }];
  location: {
    address1: string;
    city: string;
    state: string;
    country: string;
  };
}

interface CardProps {
  zIndex?: number;
  cards?: iCard[];
}

const Card: ComponentType<CardProps> = ({ zIndex = 0, cards }) => {
  const backgroundImage = cards && cards[0].photos[0];

  if (!cards) return null;
  return (
    <div
      className="card"
      style={{
        zIndex,
        backgroundColor: 'black',
        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.25) 20%, rgba(0,0,0,0.25) 20%), url(${backgroundImage})`
      }}>
      <div className="infoContainer">
        <h1>{cards[0].name}</h1>
        <ul className="foodStyle">
          {cards[0].categories.map((category, index: number) => (
            <li key={index}>{category.title}</li>
          ))}
        </ul>
        <p className="rating">Rating: {cards[0].rating}</p>
      </div>
    </div>
  );
};

export default Card;
