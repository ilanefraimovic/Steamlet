import React from 'react';
import { useNavigate } from 'react-router-dom';

const LeftSidePanel = ({ buttons = [], onClicks = [] }) => {

  const navigate = useNavigate();


  // Back button handler
  const handleBack = () => {
    navigate('/home'); // Navigate to the previous page
  };

  return (
    <div className="left-side-panel h-full w-full bg-gray-200 flex flex-col items-center p-4">
      {/* Back Button at the Top */}
      <button
        onClick={handleBack}
        className="button w-full py-4 mb-6 bg-blue-500 text-white text-lg font-semibold rounded-md hover:bg-blue-600 transition-all"
      >
        Back
      </button>
      
      {/* Center the other buttons */}
      <div className="flex flex-col justify-center items-center w-full flex-grow">
        {buttons.map((label, index) => (
          <button
            key={index}
            className="button w-full py-4 my-2 bg-blue-500 text-white text-lg font-semibold rounded-md hover:bg-blue-600 transition-all"
            onClick={onClicks[index]} // Attach the specific onClick handler
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LeftSidePanel;
