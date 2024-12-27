import React, { useEffect, useState } from 'react';
import StudyCard from "../components/StudyCard"
import { useSelector } from 'react-redux';

const StudyMode = () => {
    const cards = useSelector((state) => state.cards); // Access Redux cards cache
    const [currentIndex, setCurrentIndex] = useState(0);


    //intial card/ render
    useEffect(() => {
      console.log("current cards state(cached): " + JSON.stringify(cards, null, 2));
    }, [cards]);


    const leftButton = () => {
        let currentIndex_ = Math.max(0, currentIndex - 1);
        setCurrentIndex(currentIndex_);
        console.log("index after clicked left: " + currentIndex);
    };

    const rightButton = () => {
        let currentIndex_ = Math.min(cards.length - 1, currentIndex + 1);
        setCurrentIndex(currentIndex_);
        console.log("cards length: " + cards.length)
        console.log("index after clicked right: " + currentIndex);
    };

  return (
    <div className="extra-section w-5/6 h-full bg-gray-100 flex justify-between items-center">
      <button onClick={leftButton} className="left-button ml-4"> </button>
      <div className="flex justify-center items-center w-[75%] h-full">
        <StudyCard
          content={cards[currentIndex] || "loading"}
        />
      </div>
          <button onClick={rightButton} className="right-button mr-4"> </button>
    </div>
  );
};

export default StudyMode;
