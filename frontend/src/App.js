import './App.css';
import React, { useState, useEffect } from "react"
import { usePosition } from './components/usePosition';
import postData from './utils/postData';
import Swipeable from "react-swipy";
import Card from "./components/Card";
import { PrimaryButton, SecondaryButton } from "./components/Button";
import LoadingSpinner from "./components/LoadingSpinner";
import SingleCard from './components/SingleCard';

const fetchMyAPI = async (latitude, longitude, offset) => {
  const productionApi = 'http://yelpapi.paska.xyz/yelp/business/search';
  const devApi = 'http://localhost:3334/yelp/business/search';
  const data = await postData(productionApi, {
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
      console.log('arvot löytyi');
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
