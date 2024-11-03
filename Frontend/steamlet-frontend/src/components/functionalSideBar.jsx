import React from 'react';
import LeftSidePanel from './visualComponents/LeftSidePanel.jsx';
import { useNavigate } from 'react-router-dom'

const FunctionalSideBar = () => {
  const buttons = ['Study', 'Matching'];
  const navigate = useNavigate();
  // Define an array of click handlers
  const onClicks = [
    () => {
      navigate('/study')
    },
    () => {
      navigate('/match')
    }
  ];

  return (
    <div className="h-full w-1/6 flex">
      <LeftSidePanel buttons={buttons} onClicks={onClicks} />
      {/* Rest of your application layout */}
    </div>
  );
};

export default FunctionalSideBar;
