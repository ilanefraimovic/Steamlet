import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { pushCardToDB } from "../utils/cardUtils.js"

const EditSetPopUp = ({ onClose, onAddCard, onFetchCards }) => {
    const [popupState, setPopupState] = useState("EDIT_SET");
    const [responseSetID, setResponseSetID] = useState(null); 
    const [setSelected, setSetSelected] = useState(null);
    const [cardSelectedTerm, setCardSelectedTerm] = useState(null);
    const [cardSelectedDefinition, setCardSelectedDefinition] = useState(null);
    const [cardSelectedId, setCardSelectedId] = useState(null);
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

    //API CALLS
    const updateCard = async (cardBody) => {
        try {
            if (!cardBody) {
                throw new Error("Card Required to update Card");
            }
            const response = await axios.put('http://localhost:3000/api/v1/cards/update', cardBody);
            console.log(response.data);
        } catch (error) {
            console.error("Error Editing Card: ", error);
        }
    };

    const deleteCard = async(cardId)  => {
        try {
            if (!cardId) {
                throw new Error("Card ID Required to Delet Card");
            }
            const response = await axios.delete(`http://localhost:3000/api/v1/cards/delete/${cardId}`);
            console.log(response.data);
        } catch (error) {
            console.error("Error Deleting Card", error);
        }

    };
    
    //EVENT FUNCTIONS
    const navigateToEditSetHomePage = () => {
        setPopupState("EDIT_SET");
    }
    const handleEditCardPressed = () => {
        setPopupState("EDIT_CARD");
    };

    const handleAddCardPressed = () => {
        setPopupState("ADD_CARD");
    };

    const handleDeleteConfirmedPressed = async () => {
        const deleteSet = async (setID) => {
            try {
                const response = await axios.delete(`http://localhost:3000/api/v1/sets/delete/${setID}`);
                console.log(response.data);
                
            } catch (error) {
                console.error("Error deleting set:", error);
            }
        };
        await deleteSet(setId);
        onClose();
    };

    const handleDeleteSetPressed = () => {
        setPopupState("DELETE_WARNING");
    };

    const HandleCardSelected = (cardInfo) => {
        setCardSelectedTerm(cardInfo.term_);
        setCardSelectedDefinition(cardInfo.definition_);
        setCardSelectedId(cardInfo.id_);
        console.log("card id after handle card selected: ", cardInfo.id_);
        console.log(cardSelectedTerm + cardSelectedDefinition);
        setPopupState("EDIT_SELECTED_CARD");
    };

    const handleCardEdited = async (card) => {
        console.log("handleCardEditedParam:")
        console.log(card);
        await updateCard(card);
        await onFetchCards(setId);
        setPopupState("EDIT_CARD");
    };
    
    const handleDeleteCardPressed = (cardInfo) => {
        setCardSelectedId(cardInfo.id_);
        setCardSelectedTerm(cardInfo.term_);
        setPopupState("DELETE_CARD_WARNING")
    };

    const handleDeleteCardConfirmed = async () => {
      await deleteCard(cardSelectedId);
      await onFetchCards(setId);
      setPopupState("EDIT_CARD");
    };

    const handleCardAdded = async () => {
        const term = termRef.current.value;
        const definition = definitionRef.current.value;
        if (term && definition && setId) {
            const cardInfo = {
                term_: term,
                definition_: definition,
                setId_: setId
            }
            await pushCardToDB(cardInfo);
            onAddCard({ term, definition});
            navigateToEditSetHomePage();
            termRef.current.value = '';
            definitionRef.current.value = '';
        }
    }

    if (popupState === "EDIT_SET") {
        return (
            <div className="popup-overlay">
                <div className="bg-turquoise popup-content">
                    <p style={{fontSize: "48px", marginBottom: "10px"}}>Edit Set {setName}</p>
                    <div className="popup-button-container">
                        <button className="bg-paleYellow hover:bg-darkerpaleYellow popup-button2"
                                onClick={handleEditCardPressed}>
                            Edit/Delete A Card
                        </button>
                        <button className="bg-paleYellow hover:bg-darkerpaleYellow popup-button2"
                                onClick={handleAddCardPressed}>
                            Add Card To Set
                        </button>
                        <button className="bg-burgundy hover:bg-darkerBurgundy popup-button2"
                                onClick={handleDeleteSetPressed}>
                            Delete Set
                        </button>
                    </div>
                    <button className="bg-paleYellow hover:bg-darkerpaleYellow edit-card-popup-button"
                            onClick={onClose}>
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
                          <button 
                            key={card.id} 
                            className="bg-paleYellow hover:bg-darkerpaleYellow edit-card-item"
                            onClick={() => 
                                HandleCardSelected({id_ :card.id, term_ : card.term, definition_ : card.definition})
                            }
                          >
                            <h2 style={{textDecoration: "underline"}}>{card.term}</h2>
                            <h2>{card.definition}</h2>
                          </button>
                          <button
                            className="bg-burgundy delete-icon-button" onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteCardPressed({id_ : card.id, term_: card.term});
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                      <button className="bg-paleYellow hover:bg-darkerpaleYellow edit-card-popup-button"
                              onClick={onClose}>
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
                        <button className="bg-paleYellow hover:bg-darkerpaleYellow popup-button" 
                                onClick={handleCardAdded}>
                            Add Card
                        </button>
                        <button className="bg-paleYellow hover:bg-darkerpaleYellow popup-button"
                                onClick={onClose}>
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
                        <button
                            className="bg-paleYellow hover:bg-darkerpaleYellow popup-button" 
                            onClick={handleDeleteConfirmedPressed}>
                            Delete
                        </button>
                        <button
                            onClick={navigateToEditSetHomePage}
                            className="bg-paleYellow hover:bg-darkerpaleYellow popup-button">
                            Cancel
                        </button>
                    </div>
                </div>

            </div>
        )
    }
    else if (popupState === "EDIT_SELECTED_CARD") {
        return (
            <div className="popup-overlay">
                <div className="bg-turquoise popup-content">
                    <p style={{fontSize: "48px", marginBottom: "10px"}}>Edit Card</p>
                    <input
                        type="text"
                        defaultValue={cardSelectedTerm}
                        ref={termRef}
                        style={{ fontSize: "large", padding: "8px", width: "100%", marginBottom: "10px" }}
                    />
                    <input
                        type="text"
                        defaultValue={cardSelectedDefinition}
                        ref={definitionRef}
                        style={{ fontSize: "large", padding: "8px", width: "100%", marginBottom: "10px" }}
                    />
                    <div className="popup-button-container">
                        <button 
                            className="bg-paleYellow hover:bg-darkerpaleYellow popup-button" onClick={() => 
                                handleCardEdited({
                                    id: cardSelectedId,
                                    term: termRef.current.value,
                                    definition: definitionRef.current.value,
                                })
                            }
                        >
                            Save
                        </button>
                        <button
                            onClick={onClose}
                            className="bg-paleYellow hover:bg-darkerpaleYellow popup-button">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )
    }
    else if (popupState === "DELETE_CARD_WARNING") {
        return (
            <div className="popup-overlay">
                <div className="bg-turquoise popup-content">
                    <p style={{fontSize: "48px", marginBottom: "10px"}}>Are you sure you want to delete Card"{cardSelectedTerm}"?</p>
                    <div className="popup-button-container">
                        <button
                            className="bg-paleYellow hover:bg-darkerpaleYellow popup-button" 
                            onClick={handleDeleteCardConfirmed}>
                            Delete
                        </button>
                        <button
                            onClick={handleEditCardPressed}
                            className="bg-paleYellow hover:bg-darkerpaleYellow popup-button">
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