import React, { ComponentType, ReactNode } from 'react';

import styled from 'styled-components';

export interface iCard {
  name: string;
  rating: number;
  url: string;
  review_count: number;
  price?: string;
  image_url?: string;
  photos?: string[];
  categories: { title: string }[];
  hours?: { is_open_now: boolean; open: { start: string; end: string; day: number }[] }[];
  location: {
    address1?: string;
    city?: string;
    state?: string;
    country?: string;
  };
}

interface CardProps {
  $zIndex?: number;
  cards?: iCard[];
  single?: boolean;
  children?: ReactNode;
}

const StyledCard = styled.div<CardProps>`
  width: 100%;
  height: 100%;
  cursor: pointer;
  user-select: none;
  position: absolute;
  display: flex;
  top: 0;
  background-position: 50% 50%;
  color: white;
  text-shadow: 2px 2px 2px #000000;
  background-color: black;
  background-size: cover;
  border-radius: 10px;
  flex-direction: column;
  box-shadow: 0px 3px 17px 0px rgba(0, 0, 0, 0.25);
  justify-content: flex-end;
  z-index: ${(props) => props.$zIndex};
  h1 {
    font-size: 35px;
  }
  .foodStyle {
    list-style: none;
    padding: 0px;
  }
  .rating {
    font-size: 25px;
  }
`;

const StyledInfoContainer = styled.div`
  width: 100% - 35px;
  padding-left: 35px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background: rgba(107, 123, 144, 0.7);
`;

const Card: ComponentType<CardProps> = ({ $zIndex = 0, cards, single, children }) => {
  const singleCard = single ? 1 : 0;
  if (!cards || cards.length <= singleCard) {
    return (
      <StyledCard $zIndex={$zIndex}>
        <StyledInfoContainer>
          <h1>{children}</h1>
        </StyledInfoContainer>
      </StyledCard>
    );
  }

  const backgroundImage = cards[singleCard].image_url || cards[singleCard].photos?.[0] || '';
  return (
    <StyledCard
      $zIndex={$zIndex}
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.25) 20%, rgba(0,0,0,0.25) 20%), url(${backgroundImage})`
      }}>
      <StyledInfoContainer>
        <h1>{cards[singleCard].name}</h1>
        <ul className="foodStyle">
          {cards[singleCard].categories.map((category, index: number) => (
            <li key={index}>{category.title}</li>
          ))}
        </ul>
        <p className="rating">Rating: {cards[singleCard].rating}</p>
      </StyledInfoContainer>
    </StyledCard>
  );
};

export default Card;
