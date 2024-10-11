import React, { useEffect, useState } from 'react';
// import './TextMultiChoice.css'; // Assuming you'll add the styles for borders here

const TextMultiChoice = ({ Options, questAnswer, setQuestAnswer, idx,IsMultiSelection, MaxSelectionOrUpload }) => {
  // const [selectedTexts, setSelectedTexts] = useState(() => {
  //   // Initialize selected texts from questAnswer.TextMultiChoice
  //   return questAnswer.TextMultiChoice ? questAnswer.TextMultiChoice.split(',') : [];
  // });
  const [selectedTexts, setSelectedTexts] = useState([])
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
    if (questAnswer[idx]?.TextMultiChoice) {
      // Split the ImageMultiChoice string into an array if it contains URLs
      const selectedUrls = questAnswer[idx].TextMultiChoice.split(',');
      setSelectedTexts(selectedUrls);
    }
  }, [questAnswer,idx,setQuestAnswer,singleQAnswer]);
  const handleTextClick = (text) => {
    setSelectedTexts((prevSelected) => {
      let updatedSelection=[...prevSelected];
      if(!IsMultiSelection){
        if (prevSelected.includes(text)) {
          updatedSelection = [];
        } else {
          updatedSelection = [text];
        }
      }else{
        if (prevSelected.includes(text)) {
          updatedSelection = prevSelected.filter((selectedText) => selectedText !== text);
       } else if (prevSelected.length < MaxSelectionOrUpload) {
            updatedSelection = [...prevSelected, text];
       }
       else{
         return prevSelected;
       }
      }
      
      const updatedSingleQAnswer={...singleQAnswer,TextMultiChoice:updatedSelection.join(',')}
      setSingleAnswer(updatedSingleQAnswer)
      setTimeout(() => {
        const updatedAnswers = [...questAnswer];
        updatedAnswers[idx] = updatedSingleQAnswer;
        setQuestAnswer(updatedAnswers);
      }, 0);
  
        return  updatedSelection;
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
