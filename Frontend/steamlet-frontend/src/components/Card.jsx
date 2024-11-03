import React from "react";
import cardImage from '../resources/cardImage.png'; 
const Card = ({ content, onMatch, isMatchable, className }) => {
    if (isMatchable) {
        const handleClick = () => {
            if (onMatch) {
                onMatch(content);
            }
        };

        return (
            <div
                className={`card ${className}`}
                onClick={handleClick}
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
    } else {
        // Placeholder for the non-matchable card rendering logic
        return null;
    }
};

export default Card;

