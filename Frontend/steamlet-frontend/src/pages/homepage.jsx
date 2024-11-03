import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import "../App.css"
import CreateSetPopUp from "../components/CreateSetPopUp"
{
    {}
}
const HomePage = () => {
    const navigate = useNavigate();
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
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [popUpState, setPopupState] = useState("NAME_SET")

    useEffect(() => {
        //
    }, []);

    const exitHandler = () => {
        // Logic to handle exiting the page or performing an action
        console.log("Exiting...");
    };
    const handleNewSet = () => {
        setPopupState("NAME_SET")
        setIsPopupVisible(true);
    }

    const pushSet = () => {
        
    }

    const closePopup = () => {
        console.log("Closing popup..."); 
        setIsPopupVisible(false);
    };

    const handleSetSelected = () => {
        //get and cache set
        navigate('/study');
    }

    return (
        <div className="sets-container">
            <button className="set-item" onClick={handleNewSet}>
                <p>New Set</p>
            </button>
          {sets.map((set) => (
            <button key={set.id} className="set-item" onClick={handleSetSelected}>
              <h2>{set.name}</h2>
              <p>Count: {set.count}</p>
            </button>
          ))}
          {isPopupVisible && <CreateSetPopUp onClose={closePopup} onSetPush={pushSet} state={popUpState} onAddCard={pushSet}/>}
        </div>
    );
};

export default HomePage;
