import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from "../components/Card"
import backButton from "../components/backButton"
import Set from "../classes/Set"
import  "../App.css"
import SteampunkButton from './steamPunkButton';

const MatchMode = () => {
    const [subsetCards, setSubsetCards] = useState([
        { id: 1, term: "Term 1", definition: "Definition 1", matched: false },
        { id: 2, term: "Term 2", definition: "Definition 2", matched: false },
            // Add more cards as needed
        { id: 3, term: "Hello from a long string as a test to test a long string in the grid of the matching game", definition: "Definition 3", matched: false },
        { id: 4, term: "Term 4", definition: "Definition 4", matched: false },
        { id: 5, term: "Term 5", definition: "Definition 5", matched: false },
        { id: 6, term: "Term 6", definition: "Definition 6", matched: false },
    ]);
    const [selectedTerm, setSelectedTerm] = useState(null);
    const [cardsToRender, setCardsToRender] = useState([]);

    const handleGameOver = () => {
        setSubsetCards([]); // cache
        setSelectedTerm(null);
        setCardsToRender(getCardsAndPullsix());
        setSubsetCards([
        { id: 7, term: "Term 1", definition: "Definition 1", matched: false },
        { id: 8, term: "Term 2", definition: "Definition 2", matched: false },
            // Add more cards as needed
        { id: 9, term: "Term 3", definition: "Definition 3", matched: false },
        { id: 10, term: "Term 4", definition: "Definition 4", matched: false },
        { id: 11, term: "Term 5", definition: "Definition 5", matched: false },
        { id: 12, term: "Term 6", definition: "Definition 6", matched: false },
        ]);
    }


    //cards = redix card cache
    
    const getCardsAndPullsix = () => {
        //subsetCards = pull 6 from cache
        const doubledCards = subsetCards
            .flatMap((card) => [card.term, card.definition])
            .sort(() => Math.random() - 0.5); // Shuffle once
        return doubledCards;
    }

    useEffect(() => {
        setCardsToRender(getCardsAndPullsix());
    }, []);

    //randomizeCards();
    //setSubsetCards(pullCards(cards));

    const handleTermClick = (cardContent) => {
        if (!selectedTerm) {
            setSelectedTerm(cardContent);
        } else {
            // Attempt to match with the second card
            handleMatch(cardContent);
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
            }
        } else {
            // Reset selected term if not matched
            setSelectedTerm(null);
            // Optionally, provide feedback that the match was incorrect
        }
    };
    if (cardsToRender.length != 0){
        return (
            <div className="matchingGameContainer">
                <div className="matchingGame">
                {cardsToRender.map((card) => (
                    <Card
                        key={card.id}
                        onMatch={handleTermClick}
                        content={card}
                        isMatchable={true}
                        className="cardMatch"
                    />
                ))}
                </div>    
            </div>
        );
    }
    else {
        return (
            <SteampunkButton
                onClick={handleGameOver}
            />
        )
    }
    

}
export default MatchMode;