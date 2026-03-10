import './App.css';

import Card, { iCard } from './components/Card';
import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';

import CardButtons from './components/CardButtons';
import LoadingSpinner from './components/LoadingSpinner';
import { fetchMyAPI } from './utils/postData';
import styled from 'styled-components';
import { usePosition } from './components/usePosition';

const direction = {
  LEFT: 'left',
  RIGHT: 'right'
} as const;

const SWIPE_THRESHOLD = 120;

type SwipeDirection = (typeof direction)[keyof typeof direction] | null;

const StyledBoard = styled.div`
  position: relative;
  width: min(500px, calc(100vw - 24px), calc((100svh - 180px) * 0.714));
  max-width: 100%;
  height: calc(100svh - 24px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledStack = styled.div`
  position: relative;
  width: 100%;
  max-height: calc(100svh - 170px);
  aspect-ratio: 5 / 7;
`;

const StyledSwipeLayer = styled(motion.div)`
  position: absolute;
  inset: 0;
  z-index: 5;
  touch-action: pan-y;
`;

const Badge = styled(motion.div)<{ $type: 'left' | 'right' }>`
  position: absolute;
  top: 36px;
  ${(props) => (props.$type === 'left' ? 'left: 24px;' : 'right: 24px;')}
  border: 3px solid ${(props) => (props.$type === 'left' ? '#ff4d6d' : '#4ecb96')};
  color: ${(props) => (props.$type === 'left' ? '#ff4d6d' : '#4ecb96')};
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 26px;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-shadow: none;
  background: rgba(255, 255, 255, 0.9);
  pointer-events: none;
`;

function App() {
  const { latitude, longitude, error } = usePosition();
  const [cards, setCards] = useState([] as iCard[]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState('');
  const [dragX, setDragX] = useState(0);
  const [swipeOutDirection, setSwipeOutDirection] = useState<SwipeDirection>(null);

  const currentCard = cards[0];

  const remove = () => {
    setCards((currentCards) => {
      if (currentCards.length > 0) {
        if (currentCards.length === 1) {
          setOffset((currentOffset) => currentOffset + 21);
        }
        return currentCards.slice(1);
      }
      return currentCards;
    });
  };

  const runSwipeAction = (swipeDirection: SwipeDirection) => {
    if (!swipeDirection || cards.length === 0) {
      return;
    }

    if (swipeDirection === direction.RIGHT) {
      const website = cards[0].url;
      setLoading(true);
      window.setTimeout(() => {
        window.location.assign(website);
      }, 50);
      return;
    }

    if (swipeDirection === direction.LEFT) {
      remove();
    }
  };

  const forceSwipe = (swipeDirection: SwipeDirection) => {
    if (swipeOutDirection || cards.length === 0 || !swipeDirection) {
      return;
    }
    setSwipeOutDirection(swipeDirection);
  };

  const swipeAnimation = useMemo(() => {
    if (swipeOutDirection === direction.LEFT) {
      return { x: -560, rotate: -20, opacity: 0 };
    }

    if (swipeOutDirection === direction.RIGHT) {
      return { x: 560, rotate: 20, opacity: 0 };
    }

    const rotation = Math.max(-18, Math.min(18, dragX / 14));
    return { x: dragX, rotate: rotation, opacity: 1 };
  }, [dragX, swipeOutDirection]);

  const leftOpacity = swipeOutDirection === direction.LEFT ? 1 : Math.max(0, Math.min(1, -dragX / SWIPE_THRESHOLD));
  const rightOpacity = swipeOutDirection === direction.RIGHT ? 1 : Math.max(0, Math.min(1, dragX / SWIPE_THRESHOLD));

  useEffect(() => {
    if (latitude && longitude) {
      setLoading(true);
      fetchMyAPI(latitude, longitude, offset)
        .then((data: iCard[]) => {
          setCards(data);
          setApiError('');
          setLoading(false);
        })
        .catch((fetchError: Error) => {
          setApiError(fetchError.message);
          setCards([]);
          setLoading(false);
        });
    }
  }, [latitude, longitude, offset]);

  if (error) return <p>Position not allowed!</p>;
  if (apiError) return <p>{apiError}</p>;
  if (loading || !cards) return <LoadingSpinner />;

  return (
    <div className="appStyles">
      <StyledBoard>
        {cards.length > 0 && (
          <>
            <StyledStack>
              {cards.length > 1 && <Card single $zIndex={1} cards={cards}></Card>}
              <StyledSwipeLayer
                key={currentCard.name}
                drag="x"
                dragElastic={0.18}
                dragMomentum={false}
                animate={swipeAnimation}
                transition={{ duration: swipeOutDirection ? 0.25 : 0.16 }}
                onDrag={(_event, info) => {
                  if (swipeOutDirection) {
                    return;
                  }
                  setDragX(info.offset.x);
                }}
                onDragEnd={(_event, info) => {
                  if (swipeOutDirection) {
                    return;
                  }

                  if (info.offset.x <= -SWIPE_THRESHOLD) {
                    setSwipeOutDirection(direction.LEFT);
                    return;
                  }

                  if (info.offset.x >= SWIPE_THRESHOLD) {
                    setSwipeOutDirection(direction.RIGHT);
                    return;
                  }

                  setDragX(0);
                }}
                onAnimationComplete={() => {
                  if (!swipeOutDirection) {
                    return;
                  }

                  runSwipeAction(swipeOutDirection);
                  setSwipeOutDirection(null);
                  setDragX(0);
                }}>
                <Card $zIndex={2} cards={cards}></Card>
                <Badge $type="left" style={{ opacity: leftOpacity }}>
                  Swipe Left
                </Badge>
                <Badge $type="right" style={{ opacity: rightOpacity }}>
                  Swipe Right
                </Badge>
              </StyledSwipeLayer>
            </StyledStack>
            <CardButtons
              left={() => forceSwipe(direction.LEFT)}
              right={() => forceSwipe(direction.RIGHT)}
              disabled={Boolean(swipeOutDirection)}
            />
          </>
        )}
        {cards.length === 0 && !loading && <Card $zIndex={0}>No more cards</Card>}
      </StyledBoard>
    </div>
  );
}

export default App;
