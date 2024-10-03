import React from 'react';
// import './YesNoChoice.css'; // Assuming you have a separate CSS file for styles

const YesNoChoice = ({ questAnswer, setQuestAnswer }) => {
  const handleClick = (answer) => {
    setQuestAnswer({ ...questAnswer, YesNo: answer });
  };

  return (
    <div>
      <p
        onClick={() => handleClick('YES')}
        className={`yesNO ${questAnswer.YesNo === 'YES' ? 'selected' : ''}`} // Apply selected class if 'YES' is selected
      >
        YES
      </p>
      <p
        onClick={() => handleClick('NO')}
        className={`yesNO ${questAnswer.YesNo === 'NO' ? 'selected' : ''}`} // Apply selected class if 'NO' is selected
      >
        NO
      </p>
    </div>
  );
};

export default YesNoChoice;
