import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import "../App.css"
import CreateSetPopUp from "../components/CreateSetPopUp"
import EditSetPopUp from '../components/EditSetPopUp';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setSetId, setSetName } from '../features/setsSlice';
import { setCards } from '../features/cardsSlice';
import Card from '../classes/Card';
import Set from '../classes/Set';


const HomePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [sets, setSets] = useState([/* get sets from cache this is temporary*/ 
        { id: 1, name: 'Workout Set A', count: 5 },
        { id: 2, name: 'Workout Set B', count: 8 },
        { id: 3, name: 'Workout Set C', count: 3 },
        { id: 101, name: 'Yoga Set', count: 12 },
        { id: 102, name: 'Cardio Blast', count: 7 },
        { id: 10, name: 'Strength Set', count: 6 },
        { id: 20, name: 'Endurance Set', count: 4 },
        { id: 30, name: 'Flexibility Set', count: 5 },
    ]);
    const [isCreatePopupVisible, setIsCreatePopupVisible] = useState(false);
    const [createPopUpState, setCreatePopupState] = useState("NAME_SET");

    const [isEditPopupVisibile, setIsEditPopupVisibile] = useState(false);
    const [editPopUpState, setEditPopupState] = useState("EDIT_SET");
    
    const fetchSets = async () => {
        try {
            const userID = localStorage.getItem('userId');
            const response = await axios.get(`http://localhost:3000/api/v1/sets/${userID}`); 
            console.log(response.data);
            const fetchedSets = response.data.map(set => 
                new Set(set.count, set.date, set.id, set.name, set.user_id)
            );
            setSets(fetchedSets);
        } catch (error) {
            console.error("Error fetching sets:", error);
        }
    };
    useEffect(() => {
        fetchSets();
    }, []);


    const fetchCards = async (setId) => {
        try {
            const requestBody = {
                setId: setId 
            };
            console.log("set id from frontend card call: " + requestBody.setId);
            const response = await axios.post('http://localhost:3000/api/v1/cards/userCards', requestBody); // Use POST with a body
            const fetchedCards = response.data.map(card => ({
                term: card.term,
                definition: card.definition,
            }));
            console.log("fetched cards: " + JSON.stringify(fetchedCards));
            dispatch(setCards(fetchedCards));
        } catch (error) {
            console.error("Error fetching cards:", error);
        }
    };


    const handleNewSet = () => {
        setCreatePopupState("NAME_SET")
        setIsCreatePopupVisible(true);
    }

    const handleEditSet = () => {
        setEditPopupState("EDIT_SET");
        setIsEditPopupVisibile(true);
    }

    const pushSet = () => {
        console.log("Pushed Set..."); 
    }

    const closeCreatePopup = () => {
        console.log("Closing popup..."); 
        setIsCreatePopupVisible(false);
        fetchSets();
    };

    const closeEditPopup = () => {
        console.log("Closing popup..."); 
        setIsEditPopupVisibile(false);
    };

    const HandleSetSelected = (setID) => {
        //get and cache set
        dispatch(setSetId(setID)); // Dispatch action to set the selected set ID
        fetchCards(setID);
        navigate('/study');
    }
    const HandleEditSetSelected = (setID, setName) => {
        //get and cache set
        dispatch(setSetId(setID)); // Dispatch action to set the selected set ID
        dispatch(setSetName(setName));
        console.log("setid from HandleEditSetSelected: ", setID);
        fetchCards(setID);
        handleEditSet();
    }

    return (
        <div className="homepage-container">
            <div className="header-bar bg-darkerBrown">
                <p className="title">Steamlet!</p>
                <p className="title2">Your Sets:</p>
                <button className="friends-button bg-turquoise">Friends</button>
                <button className="profile-button bg-turquoise">Profile</button>
                <button className="logout-button bg-turquoise">Log Out</button>
            </div>
            <div className="sets-container">
                <button className="bg-paleYellow hover:bg-darkerpaleYellow set-item" onClick={handleNewSet}>
                    <p>New Set (+) </p>
                </button>
              {sets.map((set) => (
                <div key={set.id} className="set-item-container">
                    <button key={set.id} className="bg-paleYellow hover:bg-darkerpaleYellow set-item" onClick={() => HandleSetSelected(set.id)}>
                      <h2>{set.name}</h2>
                      <p>Count: {set.count}</p>
                    </button>
                    <button className="bg-burgundy edit-icon-button" onClick={(e) => {
                        e.stopPropagation();
                        HandleEditSetSelected(set.id, set.name);
                        }}>
                        Edit
                    </button>
                </div>
              ))}
              {isCreatePopupVisible && <CreateSetPopUp onClose={closeCreatePopup} onSetPush={pushSet} state={createPopUpState} onAddCard={pushSet}/>}
              {isEditPopupVisibile && <EditSetPopUp onClose={closeEditPopup} onAddCard={pushSet}/>}
            </div>
        </div>
    );
};

export default HomePage;
