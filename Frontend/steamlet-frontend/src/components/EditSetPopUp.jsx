
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const EditSetPopUp = ({ onClose, onAddCard }) => {
    const [popupState, setPopupState] = useState("EDIT_SET");
    const [responseSetID, setResponseSetID] = useState(null); 
    const [setSelected, setSetSelected] = useState(null);
    const cards = useSelector((state) => state.cards); // Access Redux cards cache
    const termRef = useRef(null);
    const definitionRef = useRef(null);
    const userId = localStorage.getItem('userId');
    const setId = useSelector((state) => state.set.setId); // Access Redux cards cache
    const setName = useSelector((state) => state.set.setName);

    console.log(popupState);
    console.log("setid from Edit Pop Up: ", setId);
    
    
    useEffect(() => {
        console.log("current cards state(cached): " + JSON.stringify(cards, null, 2));
        console.log("setId from Redux in EditPopUp:", setId);
        console.log("setName from Redux in EditPopUp:", setName);
    }, [cards, setId, setName]); // Ensure this runs when any of these dependencies change



    const handleEditCardPressed = () => {
        setPopupState("EDIT_CARD");
    };

    const handleAddCardPressed = () => {
        setPopupState("ADD_CARD");
    };

    const handleDeleteConfirmedPressed = () => {
        const deleteSet = async (setID) => {
            try {
                const response = await axios.delete(`http://localhost:3000/api/v1/sets/delete/${setId}`);
                console.log(response.data);
                
            } catch (error) {
                console.error("Error deleting set:", error);
            }
        };
        deleteSet(setId);

    };

    const handleDeleteSetPressed = () => {
        setPopupState("DELETE_WARNING");
    };

    const HandleCardSelected = () => {

    };

    const handleCardAdded = () => {

    };

    if (popupState === "EDIT_SET") {
        return (
            <div className="popup-overlay">
                <div className="bg-turquoise popup-content">
                    <p style={{fontSize: "48px", marginBottom: "10px"}}>Edit Selected Set</p>
                    <div className="popup-button-container">
                        <button className="bg-paleYellow hover:bg-darkerpaleYellow popup-button2" onClick={handleEditCardPressed}>
                            Edit/Delete A Card
                        </button>
                        <button onClick={handleAddCardPressed} className="bg-paleYellow hover:bg-darkerpaleYellow popup-button2">
                            Add Card To Set
                        </button>
                        <button onClick={handleDeleteSetPressed} className="bg-burgundy hover:bg-darkerBurgundy popup-button2">
                            Delete Set
                        </button>
                    </div>
                    <button onClick={onClose} className="bg-paleYellow hover:bg-darkerpaleYellow edit-card-popup-button">
                        Close
                    </button>
                </div>
            </div>
    );
    }
    else if (popupState === "EDIT_CARD") { 
        return (
            <div className="popup-overlay">
                <div className="bg-turquoise popup-content2">
                    <p style={{fontSize: "48px", marginBottom: "10px"}}>Choose A Card To Edit Or Delete</p>
                    <div className="edit-card-item-container">
                      {cards.map((card) => (
                        <div key={card.id} className="edit-card-item-container2">
                          <button key={card.id} className="bg-paleYellow hover:bg-darkerpaleYellow edit-card-item" onClick={() => HandleCardSelected(card.id)}>
                            <h2 style={{textDecoration: "underline"}}>{card.term}</h2>
                            <h2>{card.definition}</h2>
                          </button>
                          <button className="bg-burgundy delete-icon-button" onClick={(e) => {
                              e.stopPropagation();
                              }}>
                              Delete
                          </button>
                        </div>
                      ))}
                      <button onClick={onClose} className="bg-paleYellow hover:bg-darkerpaleYellow edit-card-popup-button">
                          Close
                      </button>
                    </div>
                </div>
            </div>
        );
    }
    else if (popupState === "ADD_CARD") {
        return (
            <div className="popup-overlay">
                <div className="bg-turquoise popup-content">
                    <p style={{fontSize: "48px", marginBottom: "10px"}}>Add Card to Selected Set</p>
                    <input
                        type="text"
                        placeholder="Term"
                        ref={termRef}
                        style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
                    />
                    <input
                        type="text"
                        placeholder="Definition"
                        ref={definitionRef}
                        style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
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
        )
    }
    else if (popupState === "DELETE_WARNING") {
        return (
            <div className="popup-overlay">
                <div className="bg-turquoise popup-content">
                    <p style={{fontSize: "48px", marginBottom: "10px"}}>Are you sure you want to delete {setName}?</p>
                    <div className="popup-button-container">
                        <button className="bg-paleYellow hover:bg-darkerpaleYellow popup-button" onClick={handleDeleteConfirmedPressed}>
                            Delete
                        </button>
                        <button onClick={handleEditCardPressed} className="bg-paleYellow hover:bg-darkerpaleYellow popup-button">
                            Cancel
                        </button>
                    </div>
                </div>

            </div>
        )
    }
    return null;
};

export default EditSetPopUp;