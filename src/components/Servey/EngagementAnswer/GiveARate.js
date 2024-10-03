import React from 'react';
// import './GiveARate.css'; // Make sure to import your CSS file

const GiveARate = ({ questAnswer, setQuestAnswer }) => {
  const handleRateClick = (rate) => {
    setQuestAnswer({ ...questAnswer, Rate: rate });
  };

  return (
    <div className="rate-container">
      {Array.from({ length: 10 }, (_, index) => {
        const rate = index + 1;
        const isSelected = questAnswer.Rate === rate; // Check if this rate is selected

        return (
          <button 
            key={index} 
            className={`rate-button ${isSelected ? 'selected' : ''}`} // Add 'selected' class if it's selected
            onClick={() => handleRateClick(rate)} // Handle click event
          >
            {rate}
          </button>
        );
      })}
    </div>
  );
};

export default GiveARate;
