
import React, { useState, useEffect } from "react";
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
            className={"flex index-card-content"}
            onClick={handleClick}
        >
            <div className={"cardContent flex text-[2.5vw] text-[2.5vh] justify-center items-center"}>
                <p className="smythe-regular text-center text-[2.5vw] text-[2.5vh]">
                    {currentCardSide ? content.term : content.definition}
                </p>
            </div>

        </div>
    );
};

export default StudyCard;
//"text-[40px] text-center text-[2.5vw] text-[2.5vh]"