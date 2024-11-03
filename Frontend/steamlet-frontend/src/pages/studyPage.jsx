import React, { useEffect, useState } from 'react';
import "../styles/root.css"
//import backButton from "../components/backButton"
import FunctionalSideBar from '../components/functionalSideBar';
import StudyMode from '../components/studyMode';
const StudyPage = () => {
    return (
        <div className="h-screen w-screen flex flex-row">
            <FunctionalSideBar>

            </FunctionalSideBar>
            <StudyMode>
                
            </StudyMode>
            
        </div>
    );
};

export default StudyPage;
