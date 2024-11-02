import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from "../classes/Card"
import backButton from "../components/backButton"
const StudyPage = () => {
    const [cards, setCards] = useState([]);
    let [currentIndex, setCurrentIndex] = useState([]);

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

        fetchCards();
    }, []);

    const leftButton = () => {
        setCurrentIndex(currentIndex--);
    };
    const rightButton = () => {
        setCurrentIndex(currentIndex++);
    };

    return (
        <div className="study-page">
            <div className="card-display">
                {cards.length > 0 && (
                    <div className="current-card">
                        {cards[currentIndex].showCard()} {/* Assuming showCard() returns JSX */}
                    </div>
                )}
            </div>
            <div className="navigation-buttons">
                <button onClick={leftButton} className="left-button">Left</button>
                <button onClick={rightButton} className="right-button">Right</button>
            </div>
            <button onClick={backButton} className="exit-button">Exit</button>
        </div>
    );
};

export default StudyPage;