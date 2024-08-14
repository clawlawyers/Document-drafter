import React from 'react';

const SummaryDisplay = () => {
  return (
    <div className="bg-card-gradient flex items-center justify-center h-full w-full">
      <div className="relative w-full  h-full  border border-white rounded-lg p-5">
        <div className="absolute top-5 left-5 flex items-center">
          <h1 className="text-teal-100 font-bold text-3xl">Adira AI</h1>
          <span className="text-teal-400 ml-2 font-light text-sm">by CLAW</span>
        </div>
        {/* Add any additional content here */}
      </div>
    </div>
  );
};

export default SummaryDisplay;
