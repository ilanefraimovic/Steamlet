import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from "../components/Card.jsx";

const StudyMode = () => {
    const [cards, setCards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const requestBody = {
                    setId: 123, // Example field
                    // Add more fields as necessary
                };

                const response = await axios.post('http://localhost:3000/api/v1/cards/', requestBody);
                const fetchedCards = response.data.map(card => ({ term: card.term, definition: card.definition }));
                setCards(fetchedCards);
            } catch (error) {
                console.error("Error fetching cards:", error);
            }
        };

        fetchCards();
    }, []);

    const leftButton = () => {
        setCurrentIndex(prevIndex => Math.max(0, prevIndex - 1));
    };

    const rightButton = () => {
        setCurrentIndex(prevIndex => Math.min(cards.length - 1, prevIndex + 1));
    };

    return (
        <div className='extra-section w-5/6 h-full bg-gray-100 flex justify-between items-center'>
            <button onClick={leftButton} className="left-button ml-4">Left</button>
            
            <div className="card-display flex justify-center items-center">
                {cards.length > 0 && (
                    <Card term={cards[currentIndex].term} definition={cards[currentIndex].definition} />
                )}
            </div>

            <button onClick={rightButton} className="right-button mr-4">Right</button>
        </div> 
    );
};

export default StudyMode;
