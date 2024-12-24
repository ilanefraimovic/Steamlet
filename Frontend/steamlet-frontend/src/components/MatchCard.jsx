import React from "react";
import cardImage from '../resources/cardImage.png'; 
const MatchCard = ({ content, onMatch, isMatchable, className }) => {
    const FlipCard = () => {
        // Implement the logic to flip the card
    };
    return (
        <div
            className={`${className}`}
            onClick={FlipCard}
            style={{
                backgroundImage: `url(${cardImage})`, // Replace with your actual image path
                backgroundSize: "cover",
                backgroundPosition: "center",
                cursor: "pointer",
            }}
        >
            <p className="cardContent">{content}</p>
        </div>
    );
};

export default MatchCard;

