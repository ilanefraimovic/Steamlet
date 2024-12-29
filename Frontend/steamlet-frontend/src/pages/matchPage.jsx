import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from "../classes/Card"
import backButton from "../components/backButton"
import FunctionalSideBar from '../components/functionalSideBar';
import MatchMode from '../components/matchMode';

const MatchPage = () => {
    return (
        <div className="h-screen w-screen flex flex-row">
            <FunctionalSideBar />

            <div className="w-full flex justify-center items-center"> {/* Center MatchMode within remaining space */}
                <MatchMode />
            </div>
            
        </div>
    );

        
        }
export default MatchPage;