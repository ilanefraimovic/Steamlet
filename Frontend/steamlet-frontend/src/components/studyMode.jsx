import React, { useEffect, useState } from 'react';
import StudyCard from "../components/StudyCard"
import { useSelector } from 'react-redux';

const StudyMode = () => {
    const cards = useSelector((state) => state.cards); // Access Redux cards cache
    const [currentCard, setCurrentCard] = useState({});
    let currentIndex = 0;

    //intial card/ render
    useEffect(() => {
      console.log("current cards state(cached): " + JSON.stringify(cards));
      setCurrentCard(cards[0]);
    }, [cards]);

    const leftButton = () => {
        currentIndex = Math.max(0, currentIndex - 1);
        setCurrentCard(cards[currentIndex]);
    };

    const rightButton = () => {
        currentIndex = Math.min(cards.length - 1, currentIndex + 1);
        setCurrentCard(cards[currentIndex]);
    };

  return (
    <div className="extra-section w-5/6 h-full bg-gray-100 flex justify-between items-center">
      <button onClick={leftButton} className="left-button ml-4">Left</button>
      <div className="">
        <StudyCard
          content={currentCard == null ? "loading" : JSON.stringify(currentCard)}
        />
      </div>
          <button onClick={rightButton} className="right-button mr-4">Right</button>
    </div>
  );
};

export default StudyMode;
