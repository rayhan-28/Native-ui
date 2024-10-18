import React, { useEffect, useState } from 'react';
// import './YesNoChoice.css'; // Assuming you have a separate CSS file for styles

const YesNoChoice = ({ questAnswer,idx, setQuestAnswer }) => {
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

  const handleClick = (answer) => {
    const updatedSingleQAnswer={...singleQAnswer,YesNo:answer}
    setSingleAnswer(updatedSingleQAnswer)
    setTimeout(() => {
      const updatedAnswers = [...questAnswer];
      updatedAnswers[idx] = updatedSingleQAnswer;
      setQuestAnswer(updatedAnswers);
    }, 0);
  };

  return (
    <div>
      <p
        onClick={() => handleClick('YES')}
        className={`yesNO ${questAnswer[idx]?.YesNo === 'YES' ? 'selected' : ''}`} // Apply selected class if 'YES' is selected
      > 
        YES
      </p>
      <p
        onClick={() => handleClick('NO')}
        className={`yesNO ${questAnswer[idx]?.YesNo === 'NO' ? 'selected' : ''}`} // Apply selected class if 'NO' is selected
      >
        NO
      </p>
    </div>
  );
};

export default YesNoChoice;
