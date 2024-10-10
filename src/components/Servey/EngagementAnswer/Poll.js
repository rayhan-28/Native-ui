import React, { useEffect, useState } from 'react';

const Poll = ({Options,questAnswer,idx, setQuestAnswer}) => {
 
  const [selectedIndex, setSelectedIndex] = useState(null);
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
  
  useEffect(()=>{

    const updatedAnswers = [...questAnswer];
    
    // Check if the idx position is empty and initialize with singleQAnswer if it is
    if (!updatedAnswers[idx]) {
      updatedAnswers[idx] = { ...singleQAnswer };
      setQuestAnswer(updatedAnswers);
    }
    if(questAnswer[idx]?.TestChoicePoll){
      const preSelectedIndex = Options.findIndex((option)=>
      option.OptionsText===questAnswer[idx]?.TestChoicePoll)
      setSelectedIndex(preSelectedIndex)
    }
  },[Options,questAnswer[idx]?.TestChoicePoll,idx,questAnswer,setQuestAnswer])


  const handleSelect = (index) => {
    if(selectedIndex===null){
    
    const updatedSingleQAnswer={...singleQAnswer,TestChoicePoll:Options[index].OptionsText}
    setSingleAnswer(updatedSingleQAnswer)
    const updatedAnswers = [...questAnswer];
    updatedAnswers[idx]=updatedSingleQAnswer;
    // Set the updated answers back to state
    setQuestAnswer(updatedAnswers);
    setSelectedIndex(index);
    }
  };

  return (
    <div>
      {Options.map((item, index) => (
        <div
          key={index}
          className={`poll-text ${selectedIndex === index ? 'selected-box' : ''}`} 
          onClick={() => handleSelect(index)}
          style={{
            background:
              selectedIndex !== null
                ? `linear-gradient(to right, ${
                    selectedIndex === index ? '#aee8de' : '#cccece'
                  } ${item.percentage}%, #f1f2f2 ${item.percentage}%)`
                : undefined
          }}
        >
          <span className={`poll-left ${selectedIndex===index?'selected-text':''}`}>{item.OptionsText}</span>
          {selectedIndex !== null && (
            <span  className={`poll-right ${selectedIndex===index?'selected-percentage':''}`}>{item.percentage}%</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Poll;
