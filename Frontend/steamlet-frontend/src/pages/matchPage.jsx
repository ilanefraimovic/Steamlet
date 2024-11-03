import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from "../classes/Card"
import backButton from "../components/backButton"
const MatchPage = () => {
    const [cards, setCards] = useState([]);
    let [subsetCards, setSubsetCards] = useState([]);

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

        return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-1/6 bg-gray-200 p-4">
                <h2 className="text-lg font-semibold mb-4">Mode Selection</h2>
                <button 
                    className="bg-blue-500 text-white p-2 rounded mb-2"
                    onClick={() => {/* Logic to switch to study mode */}}
                >
                    Switch to Study Mode
                </button>
                <div className="mt-4">
                    <p>Current Mode: Match Mode</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center">
                <div className="grid grid-cols-4 gap-4">
                    {cards.map((card, index) => (
                        <div 
                            key={index}
                            className="relative w-32 h-48 border border-gray-300 rounded shadow-lg cursor-pointer"
                            onClick={() => {/* Logic for card click handling */}}
                        >
                            {/* Front of the card */}
                            <img 
                                src={`path/to/images/${card.term}.jpg`} 
                                alt={card.term} 
                                className="absolute inset-0 w-full h-full object-cover rounded"
                            />
                            {/* Back of the card */}
                            <img 
                                src={`path/to/images/${card.definition}.jpg`} 
                                alt={card.definition} 
                                className="absolute inset-0 w-full h-full object-cover rounded opacity-0"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Top Buttons */}
            <div className="absolute top-4 left-4">
                <button 
                    className="bg-gray-300 p-2 rounded"
                    onClick={() => {/* Logic to navigate to homepage */}}
                >
                    Back to Homepage
                </button>
            </div>
            <div className="absolute top-4 right-4">
                <button 
                    className="bg-red-500 text-white p-2 rounded"
                    onClick={() => {/* Logic to exit the game */}}
                >
                    Exit
                </button>
            </div>
        </div>
        );
        }
export default MatchPage;