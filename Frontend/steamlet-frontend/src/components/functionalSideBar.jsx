import React from 'react';
import LeftSidePanel from './visualComponents/LeftSidePanel.jsx';

const FunctionalSideBar = () => {
  const buttons = ['Study', 'Matching'];
  
  // Define an array of click handlers
  const onClicks = [
    () => console.log('Study button clicked'),
    () => console.log('Matching button clicked')
  ];

  return (
    <div className="h-full w-1/6 flex">
      <LeftSidePanel buttons={buttons} onClicks={onClicks} />
      {/* Rest of your application layout */}
    </div>
  );
};

export default FunctionalSideBar;
