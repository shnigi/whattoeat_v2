import './App.css';

import Card, { iCard } from './components/Card';
import React, { useEffect, useState } from 'react';
import { Swipeable, direction } from 'react-deck-swiper';

import CardButtons from './components/CardButtons';
import LoadingSpinner from './components/LoadingSpinner';
import SingleCard from './components/SingleCard';
import postData from './utils/postData';
import { usePosition } from './components/usePosition';

const fetchMyAPI = async (latitude: number, longitude: number, offset: number) => {
  const productionApi = 'https://whattoeat.paska.xyz/api/business/search';
  const devApi = 'http://localhost:3335/api/business/search';
  const api = process.env.NODE_ENV === 'development' ? devApi : productionApi;
  const data = await postData(api, {
    latitude: latitude,
    longitude: longitude,
    offset
  });
  const shuffledRestaurants = [...data.search.business].sort(() => Math.random() - 0.5);
  return shuffledRestaurants;
};

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
      <div className="wrapperStyles">
        {cards.length > 0 && (
          <div className="wrapperStyles">
            <Swipeable
              onSwipe={handleOnSwipe}
              // @ts-ignore
              renderButtons={({ right, left }) => <CardButtons left={left} right={right} />}>
              <Card cards={cards}></Card>
            </Swipeable>
            {cards.length > 1 && <SingleCard zIndex={-1} cards={cards}></SingleCard>}
          </div>
        )}
        {cards.length <= 1 && <Card zIndex={-2}>No more cards</Card>}
      </div>
    </div>
  );
}

export default App;
