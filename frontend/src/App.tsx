import './App.css';

import Card, { iCard } from './components/Card';
import React, { useEffect, useState } from 'react';
import { Swipeable, direction } from 'react-deck-swiper';

import CardButtons from './components/CardButtons';
import LoadingSpinner from './components/LoadingSpinner';
import { fetchMyAPI } from './utils/postData';
import styled from 'styled-components';
import { usePosition } from './components/usePosition';

const StyledWrapper = styled.div`
    position: relative;
    width: 500px;
    height: 700px;

  @media only screen and (max-width: 550px) {
    width: 330px;
    height: 500px;
  }
`;

function App() {
  const { latitude, longitude, error } = usePosition();
  const [cards, setCards] = useState([] as iCard[]);
  const [offset, setoffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const remove = () => {
    if (cards.length > 0) {
      setCards(cards.slice(1, cards.length));
      if (cards.length === 1) {
        setoffset(offset + 1 + 20);
      }
    }
  };

  const handleOnSwipe = (swipeDirection: string) => {
    if (swipeDirection === direction.RIGHT) {
      const website = cards[0].url;
      setLoading(true);
      window.location.href = website;
      return;
    }

    if (swipeDirection === direction.LEFT) {
      remove();
      return;
    }
  };

  useEffect(() => {
    if (latitude && longitude) {
      fetchMyAPI(latitude, longitude, offset).then((data: iCard[]) => setCards(data));
    }
  }, [latitude, longitude, offset]);

  if (error) return <p>Position not allowed!</p>;
  if (!cards || cards.length === 0 || loading) return <LoadingSpinner />;

  return (
    <div className="appStyles">
      <StyledWrapper>
        {cards.length > 0 && (
          <StyledWrapper>
            <Swipeable
              onSwipe={handleOnSwipe}
              // @ts-ignore
              renderButtons={({ right, left }) => <CardButtons left={left} right={right} />}
            >
              <Card cards={cards}></Card>
            </Swipeable>
            {cards.length > 1 && <Card single zIndex={-1} cards={cards}></Card>}
          </StyledWrapper>
        )}
        {cards.length <= 1 && <Card zIndex={-2}>No more cards</Card>}
      </StyledWrapper>
    </div>
  );
}

export default App;
