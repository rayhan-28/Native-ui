import React, { useEffect, useState } from 'react';

const Poll = ({Options,questAnswer, setQuestAnswer}) => {
 
  const [selectedIndex, setSelectedIndex] = useState(null);
  
  useEffect(()=>{
    if(questAnswer.TestChoicePoll){
      const preSelectedIndex = Options.findIndex((option)=>
      option.OptionsText===questAnswer.TestChoicePoll)
      setSelectedIndex(preSelectedIndex)
    }
  },[Options,questAnswer.TestChoicePoll])


  const handleSelect = (index) => {
    if(selectedIndex===null){
    setSelectedIndex(index);
    setQuestAnswer((prev)=>({
      ...prev,
      TestChoicePoll:Options[index].OptionsText
    }))
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
