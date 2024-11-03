import React, { useState, useRef } from "react";

const CreateSetPopUp = ({ onClose, onSetPush, onAddCard }) => {
    const [popupState, setPopupState] = useState("NAME_SET");
    const setNameRef = useRef(null);
    const termRef = useRef(null);
    const definitionRef = useRef(null);

    const handleCreate = () => {
        const setNameValue = setNameRef.current.value;
        if (setNameValue) {
            // Add set to database
            onSetPush(setNameValue);
            // Switch to ADD_CARD state
            setPopupState("ADD_CARD");
        }
    };

    const handleCardAdded = () => {
        const term = termRef.current.value;
        const definition = definitionRef.current.value;
        if (term && definition) {
            // Add card to database
            onAddCard({ term, definition });
            // Clear term and definition inputs for next entry
            termRef.current.value = '';
            definitionRef.current.value = '';
        }
    };

    if (popupState === "NAME_SET") {
        return (
            <div className="popup-overlay">
                <div className="popup-content">
                    <h2>Enter Set Name</h2>
                    <input
                        type="text"
                        placeholder="Set Name"
                        ref={setNameRef}
                        style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
                    />
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                        <button onClick={handleCreate} style={{ padding: "10px", flex: 1 }}>
                            Create
                        </button>
                        <button onClick={onClose} style={{ padding: "10px", flex: 1 }}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );
    } else if (popupState === "ADD_CARD") {
        return (
            <div className="popup-overlay">
                <div className="popup-content">
                    <h2>Enter Term and Definition</h2>
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
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                        <button onClick={handleCardAdded} style={{ padding: "10px", flex: 1 }}>
                            Add Card
                        </button>
                        <button onClick={onClose} style={{ padding: "10px", flex: 1 }}>
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
