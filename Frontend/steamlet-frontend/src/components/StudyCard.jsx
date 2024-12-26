
import React, { useState, useEffect } from "react";
import cardImage from '../resources/cardImage.png'; 
const StudyCard = ({ content }) => {
    const [currentCardSide, setCurrentCardSide] = useState(true);

    useEffect(() => {
        setCurrentCardSide(true); // Reset to term side on content change
    }, [content]);
    
    const handleClick = () => {
        setCurrentCardSide(!currentCardSide);
    };
    return (
        <div
            className={"index-card-content"}
            onClick={handleClick}
        >
            <div className={"cardContent"}>
                <p className={"card-text"}>
                    {currentCardSide ? content.term : content.definition}
                </p>
            </div>
        </div>
    );
};

export default StudyCard;