import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from "../components/Card.jsx";
import { useSelector, useDispatch } from 'react-redux';
import { setCards } from '../features/cardsSlice'; // Import your action to set cards in the cache

const StudyMode = () => {
    const dispatch = useDispatch(); // Move useDispatch to the component scope
    const setId = useSelector((state) => state.set.setId); // Move useSelector to component scope to access setId
    const cachedCards = useSelector((state) => state.cards); // Access cached cards directly in the component

    const [cards, setCardsState] = useState([]);
    const [currentCard, setCurrentCard] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentUsableCard, setCurrentUsableCard] = useState();

    const CacheListOfCards = (cards) => {
        dispatch(setCards(cards)); // Dispatch action to cache the list of cards in Redux
    };

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const requestBody = {
                    setId: setId, // Use the setId from Redux
                };
                const response = await axios.post('/api/cards', requestBody); // Use POST with a body
                const fetchedCards = response.data.map(card => ({ 
                    id: card.id, 
                    term: card.term, 
                    definition: card.definition 
                }));
                CacheListOfCards(fetchedCards); // Cache the cards in Redux
                setCardsState(fetchedCards); // Set local state with fetched cards
                setCurrentCard(fetchedCards[0]); // Set the first card as the current card
            } catch (error) {
                console.error("Error fetching cards:", error);
            }
        };

        if (setId) { // Ensure setId is available before fetching
            fetchCards();
        }
    }, [setId, dispatch]); // Add dependencies for useEffect
    
    
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
            setCurrentCard(cachedCards[index]);
        }

    useEffect(() => {
        setCurrentUsableCard([currentCard.term, currentCard.definition]);
    }, [currentCard])

    return (
        <div className='extra-section w-5/6 h-full bg-gray-100 flex justify-between items-center'>
            <button onClick={leftButton} className="left-button ml-4">Left</button>
            <Card
                key={currentCard.id}
                content={currentUsableCard}
                isMatchable={false}
                className="card"
                onClick={FlipCard}
            />
            <button onClick={rightButton} className="right-button mr-4">Right</button>
        </div> 
    );
}
};

export default StudyMode;
