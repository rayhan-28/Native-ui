import React, { useEffect, useState } from 'react';
// import './GiveARate.css'; // Make sure to import your CSS file

const GiveARate = ({ questAnswer, setQuestAnswer,idx }) => {
 
  const [singleQAnswer, setSingleAnswer] = useState({
    TextAnswer: "",
    ImageMultiChoice: "",
    TextMultiChoice: "",
    YesNo: "",
    Rate: "",
    UploadedImage: "",
    ReplyWithLink: "",
    TextChoicePoll: "",
    ImageChoicePoll: "",
  });
 
  useEffect(() => {
    const updatedAnswers = [...questAnswer];
    
    // Check if the idx position is empty and initialize with singleQAnswer if it is
    if (!updatedAnswers[idx]) {
      updatedAnswers[idx] = { ...singleQAnswer };
      setQuestAnswer(updatedAnswers);
    }
    
  }, [questAnswer,idx,setQuestAnswer,singleQAnswer]);
  const handleRateClick = (rate) => {
    const updatedSingleQAnswer={...singleQAnswer,Rate:rate}
    setSingleAnswer(updatedSingleQAnswer)
    setTimeout(() => {
      const updatedAnswers = [...questAnswer];
      updatedAnswers[idx] = updatedSingleQAnswer;
      setQuestAnswer(updatedAnswers);
    }, 0);
  };
 
  return (
    <div className="rate-container">
      {Array.from({ length: 10 }, (_, index) => {
        const rate = index + 1;
        const isSelected = questAnswer[idx]?.Rate === rate; // Check if this rate is selected

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
