import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MatchCard from "../components/MatchCard";
import backButton from "../components/backButton";
import Set from "../classes/Set";
import SteampunkButton from './steamPunkButton';
import { useSelector } from 'react-redux';

const MatchMode = () => {
    const cachedCards = useSelector((state) => state.cards); // Access Redux cards cache
    const [subsetCards, setSubsetCards] = useState([]);
    const [selectedTerm, setSelectedTerm] = useState(null);
    const [cardsToRender, setCardsToRender] = useState([]);

    const HandleGameOver = () => {
        setSubsetCards([]); // Clear cached subset
        setSelectedTerm(null);
        setCardsToRender(GetCardsAndPullsix(cachedCards)); // Reset cards for new game
    };

    // Function to get and shuffle 6 cards
    const GetCardsAndPullsix = (cards) => {
        const subset = cards
            .sort(() => Math.random() - 0.5) // Shuffle the array
            .slice(0, 6); // Select 6 random cards

        setSubsetCards(subset); // Store subset in state

        const doubledCards = subset
            .flatMap((card) => [card.term, card.definition]) // Flatten terms and definitions
            .sort(() => Math.random() - 0.5); // Shuffle once

        return doubledCards;
    };

    useEffect(() => {
        setCardsToRender(GetCardsAndPullsix(cachedCards));
    }, [cachedCards]);

    const handleTermClick = (cardContent) => {
        if (!selectedTerm) {
            setSelectedTerm(cardContent);
        } else {
            handleMatch(cardContent); // Attempt to match with the selected term
        }
    };

    const handleMatch = (cardContent) => {
        if (selectedTerm) {
            const isMatch = subsetCards.some(
                (card) =>
                    (card.term === selectedTerm && card.definition === cardContent) ||
                    (card.definition === selectedTerm && card.term === cardContent)
            );

            if (isMatch) {
                // Remove both matching term and definition from cardsToRender
                setCardsToRender((prevCards) =>
                    prevCards.filter((card) => card !== selectedTerm && card !== cardContent)
                );
                setSelectedTerm(null); // Reset selected term after match
            } else {
                setSelectedTerm(null); // Reset selected term if no match
            }
        }
    };

    if (cardsToRender.length !== 0) {
        return (
            <div className="matchingGameContainer">
                <div className="matchingGame">
                    {cardsToRender.map((card, index) => (
                        <MatchCard
                            key={index}
                            onMatch={handleTermClick}
                            content={card}
                            isMatchable={true}
                            className="cardMatch"
                        />
                    ))}
                </div>    
            </div>
        );
    } else {
        return (
            <SteampunkButton
                onClick={HandleGameOver}
            />
        );
    }
};

export default MatchMode;
