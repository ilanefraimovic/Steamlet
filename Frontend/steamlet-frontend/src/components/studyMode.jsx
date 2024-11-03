import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from "../components/Card.jsx";
import { useSelector, useDispatch } from 'react-redux';
import { setCards } from '../features/cardsSlice';

const StudyMode = () => {
    const dispatch = useDispatch();
    const setId = useSelector((state) => state.set.setId);
    const cachedCards = useSelector((state) => state.cards);

    const [cards, setCardsState] = useState([]);
    const [currentCard, setCurrentCard] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentUsableCard, setCurrentUsableCard] = useState([]);

    const CacheListOfCards = (cards) => {
        dispatch(setCards(cards));
    };

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const requestBody = { setId: setId };
                const response = await axios.post('/api/cards', requestBody);
                const fetchedCards = response.data.map(card => ({ 
                    id: card.id, 
                    term: card.term, 
                    definition: card.definition 
                }));
                CacheListOfCards(fetchedCards);
                setCardsState(fetchedCards);
                setCurrentCard(fetchedCards[0]);
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
        <div className='matchingGameContainer flex justify-between items-center'>
            <button onClick={leftButton} className="left-button ml-4">Left</button>
            
            <button onClick={rightButton} className="right-button mr-4">Right</button>
        </div> 
    );
};

export default StudyMode;
