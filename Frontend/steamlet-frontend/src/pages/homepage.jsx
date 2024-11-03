import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Set from "../classes/Set"

const HomePage = () => {
    const [sets, setSets] = useState([]);

    useEffect(() => {
        const fetchSets = async () => {
            try {
                const requestBody = {
                    // Include any data you need to send to the server
                    userId: 123, // Example field
                    // Add more fields as necessary
                };

                const response = await axios.post('/api/sets', requestBody); // Use POST with a body
                const fetchedSets = response.data.map(set => new Set(set.numberOfCards, set.setName, set.listOfCards));
                setSets(fetchedSets);
            } catch (error) {
                console.error("Error fetching sets:", error);
            }
        };

        fetchSets();
    }, []);

    const exitHandler = () => {
        // Logic to handle exiting the page or performing an action
        console.log("Exiting...");
    };

    return (
        <div className="sets-page">
            <h1>Card Sets</h1>
            <div className="sets-container">
                {sets.map((set, index) => (
                    <div key={index} className="set-bar">
                        {set.showSetHomepage()}
                    </div>
                ))}
            </div>
            <button className="exit-button" onClick={exitHandler}>
                Exit
            </button>
        </div>
    );
};

export default HomePage;
