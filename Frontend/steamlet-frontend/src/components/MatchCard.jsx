import React from "react";
import cardImage from '../resources/Assets/gears.gif'
const MatchCard = ({ content, onMatch, isMatchable, className }) => {
    const handleClick = () => {
            if (onMatch) {
                onMatch(content);
            }
        };
    return (
        <div
            className={`${className}`}
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
};

export default MatchCard;
