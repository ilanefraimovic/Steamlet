import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from "../components/Card.jsx"
import { useDispatch, useSelector } from 'react-redux';

const StudyMode = () => {
    const [cards, setCards] = useState([]);
    let [currentIndex, setCurrentIndex] = useState([]);
    const dispatch = useDispatch();
    const setId = useSelector((state) => state.set.setId);

    const [currentCard, setCurrentCard] = useState({});
    const [currentUsableCard, setCurrentUsableCard] = useState();

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const requestBody = {
                    // Include any data you need to send to the server
                    setId: 123, // Example field
                    // Add more fields as necessary
                };

                const response = await axios.post('/api/cards', requestBody); // Use POST with a body
                const fetchedCards = response.data.map(card => new Card(card.term, card.definition));
                setCards(fetchedCards);
            } catch (error) {
                console.error("Error fetching cards:", error);
            }
        };

        if (setId) {
            fetchCards();
        }
    }, [setId, dispatch]);

    const leftButton = () => {
        setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
        GetAndSetCurrentCard(currentIndex - 1);
    };

    const rightButton = () => {
        setCurrentIndex((prevIndex) => Math.min(cards.length - 1, prevIndex + 1));
        GetAndSetCurrentCard(currentIndex + 1);
    };

    const FlipCard = () => {
        // Implement the logic to flip the card
    };

    const GetAndSetCurrentCard = (index) => {
        if (cards[index]) {
            setCurrentCard(cards[index]);
        }
    };

    // Update `currentUsableCard` whenever `currentCard` changes
    useEffect(() => {
        if (currentCard.term && currentCard.definition) {
            setCurrentUsableCard([currentCard.term, currentCard.definition]);
        }
    }, [currentCard]);

  return (
    <div className='extra-section w-5/6 h-full bg-gray-100 flex justify-between items-center'>
        <button onClick={leftButton} className="left-button ml-4">Left</button>
        <button onClick={rightButton} className="right-button mr-4">Right</button>
    </div> 
  );
};

export default StudyMode;
