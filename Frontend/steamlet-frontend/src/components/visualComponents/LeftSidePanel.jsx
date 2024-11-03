import React from 'react';

const LeftSidePanel = ({ buttons = [], onClicks = [] }) => {
  return (
    <div className="left-side-panel h-full w-full bg-gray-200 flex flex-col justify-center items-center p-4">
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
  );
};

export default LeftSidePanel;
