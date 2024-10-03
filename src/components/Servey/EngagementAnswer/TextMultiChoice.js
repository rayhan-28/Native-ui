import React, { useState } from 'react';
// import './TextMultiChoice.css'; // Assuming you'll add the styles for borders here

const TextMultiChoice = ({ Options, questAnswer, setQuestAnswer, IsMultiSelection, MaxSelectionOrUpload }) => {
  const [selectedTexts, setSelectedTexts] = useState(() => {
    // Initialize selected texts from questAnswer.TextMultiChoice
    return questAnswer.TextMultiChoice ? questAnswer.TextMultiChoice.split(',') : [];
  });

  const handleTextClick = (text) => {
    setSelectedTexts((prevSelected) => {
      if (prevSelected.includes(text)) {
        // If the text is already selected, remove it
        const updatedSelection = prevSelected.filter((selectedText) => selectedText !== text);
        setQuestAnswer({ ...questAnswer, TextMultiChoice: updatedSelection.join(',') });
        return updatedSelection;
      } else {
        // If it's not selected, add it (if under max selection limit)
        if (IsMultiSelection && prevSelected.length < MaxSelectionOrUpload) {
          const updatedSelection = [...prevSelected, text];
          setQuestAnswer({ ...questAnswer, TextMultiChoice: updatedSelection.join(',') });
          return updatedSelection;
        } else if (!IsMultiSelection) {
          // If not multi-selection, replace the selection
          setQuestAnswer({ ...questAnswer, TextMultiChoice: text });
          return [text];
        }
      }
      return prevSelected;
    });
  };

  

  return (
    <div>
      {Options.map((option, index) => {
        const isSelected = selectedTexts.includes(option.OptionsText);

        return (
          <p
            key={index}
            className={`yesNO ${isSelected ? 'selected' : ''}`} // Add 'selected' class if text is selected
            onClick={() => handleTextClick(option.OptionsText)}
          >
            {option?.OptionsText}
          </p>
        );
      })}
    </div>
  );
};

export default TextMultiChoice;
