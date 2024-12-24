
import React from "react";
import cardImage from '../resources/cardImage.png'; 
const StudyCard = ({ content}) => {
    const handleClick = () => {};
    return (
        <div
            className={"index-card-content"}
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

export default StudyCard;