import React, { useEffect, useState } from 'react';
import "../styles/root.css"
//import backButton from "../components/backButton"
import FunctionalSideBar from '../components/functionalSideBar';
import StudyMode from '../components/studyMode';
const StudyPage = () => {
    return (
        <div className="h-screen w-screen flex flex-row">
            <FunctionalSideBar>
                <div className="main-content p-4">
                  <h1>Main Content Area</h1>
                  <p>This is the main content inside the sidebar layout.</p>
                </div>
                             
            </FunctionalSideBar>
            <StudyMode>

            </StudyMode>
            
        </div>
    );
};

export default StudyPage;
/*
<div className="card-display flex">
                    {cards.length > 0 && (
                        <div className="current-card">
                            {cards[currentIndex]} {}
                        </div>
                    )}
                </div>
                */