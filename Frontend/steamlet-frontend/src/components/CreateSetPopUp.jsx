import React, { useState, useRef } from "react";
import axios from "axios";
import { pushCardToDB } from "../utils/cardUtils.js"

const CreateSetPopUp = ({ onClose, onSetPush, onAddCard }) => {
    const [popupState, setPopupState] = useState("NAME_SET");
    const [responseSetID, setResponseSetID] = useState(null); 
    const setNameRef = useRef(null);
    const termRef = useRef(null);
    const definitionRef = useRef(null);
    const userId = localStorage.getItem('userId');

    const handleCreate = async () => {
        const setNameValue = setNameRef.current.value;
        if (setNameValue) {
            try {
                const requestBody = {
                    name: setNameValue, 
                    user_id: userId,
                };
            const response = await axios.post('http://localhost:3000/api/v1/sets/create', requestBody); // Use POST with a body
            setResponseSetID(response.data.setId);
            console.log("createResponse: ", responseSetID);
            } catch (error) {
                console.error("Error creating set:", error);
            }
            onSetPush(setNameValue);
            setPopupState("ADD_CARD");
            setNameRef.current.value = '';
        }
    };

    const handleCardAdded = () => {
        const term = termRef.current.value;
        const definition = definitionRef.current.value;
        console.log("setID, term, def = ", responseSetID, term, definition);
        //max char limit 324 NEED TO IMPLEMENT
        if (term && definition && responseSetID) {
            const cardInfo = {
                setId_: responseSetID,
                term_: term,
                definition_: definition
            }
            const response = pushCardToDB(cardInfo);
            console.log("response: ", response);
            onAddCard({ term, definition });
            termRef.current.value = '';
            definitionRef.current.value = '';
        }
    };

    if (popupState === "NAME_SET") {
        return (
            <div className="popup-overlay">
                <div className="bg-turquoise popup-content">
                    <p style={{fontSize: "48px", marginBottom: "10px"}}>Enter Set Name</p>
                    <input
                        type="text"
                        placeholder="Set Name"
                        ref={setNameRef}
                        style={{ fontSize: "large", padding: "8px", width: "100%", marginBottom: "70px" }}
                    />
                    <div className="popup-button-container">
                        <button className="bg-paleYellow hover:bg-darkerpaleYellow popup-button" onClick={handleCreate}>
                            Create
                        </button>
                        <button className="bg-paleYellow hover:bg-darkerpaleYellow popup-button" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );
    } else if (popupState === "ADD_CARD") {
        return (
            <div className="popup-overlay">
                <div className="bg-turquoise popup-content">
                    <p style={{fontSize: "48px", marginBottom: "10px"}}>Enter Term and Definition</p>
                    <input
                        type="text"
                        placeholder="Term"
                        ref={termRef}
                        style={{ fontSize: "large", padding: "8px", width: "100%", marginBottom: "10px" }}
                    />
                    <input
                        type="text"
                        placeholder="Definition"
                        ref={definitionRef}
                        style={{ fontSize: "large", padding: "8px", width: "100%", marginBottom: "10px" }}
                    />
                    <div className="popup-button-container">
                        <button className="bg-paleYellow hover:bg-darkerpaleYellow popup-button" onClick={handleCardAdded}>
                            Add Card
                        </button>
                        <button onClick={onClose} className="bg-paleYellow hover:bg-darkerpaleYellow popup-button">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return null; // In case of an unexpected state
};

export default CreateSetPopUp;
