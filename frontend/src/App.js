import './App.css';

import { PrimaryButton, SecondaryButton } from "./components/Button";
import React, { useEffect, useState } from "react"

import Card from "./components/Card";
import LoadingSpinner from "./components/LoadingSpinner";
import SingleCard from './components/SingleCard';
import Swipeable from "react-swipy";
import postData from './utils/postData';
import { usePosition } from './components/usePosition';

const fetchMyAPI = async (latitude, longitude, offset) => {
  // const productionApi = 'https://whattoeat.paska.xyz/api/business/search'
  const devApi = 'http://localhost:3335/api/business/search';
  const api = process.env.NODE_ENV === 'development' ? devApi : devApi;
  const data = await postData(api, {
    latitude: latitude,
    longitude: longitude,
    offset
  });
  const shuffledRestaurants = [...data.search.business].sort(() => Math.random() - 0.5)
  return shuffledRestaurants;
}

function App() {
  const { latitude, longitude, error } = usePosition();
  const [cards, setCards] = useState([]);
  const [offset, setoffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const remove = () => {
    if (cards.length > 0) {
      setCards(cards.slice(1, cards.length));
      if (cards.length === 1) {
        setoffset((offset + 1) + 20);
      }
    }
  }

  const swipeRightHandler = (event) => {
    const website = cards[0].url;
    if (event === 'right') {
      setLoading(true);
      window.location.href = website;
    }
  };

  useEffect(() => {
    if (latitude && longitude) {
      fetchMyAPI(latitude, longitude, offset).then(data => setCards(data));
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
              buttons={({ right, left }) => (
                <div className="buttonContainer">
                  <SecondaryButton onClick={left}></SecondaryButton>
                  <PrimaryButton onClick={right}></PrimaryButton>
                </div>
              )}
              onAfterSwipe={remove}
              onSwipe={(event) => swipeRightHandler(event)}
            >
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
