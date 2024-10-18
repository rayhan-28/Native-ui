import React, { useEffect, useState } from 'react'

const ReplyWithLink = ({questAnswer,setQuestAnswer,idx}) => {
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
  }, [idx, questAnswer, setQuestAnswer, singleQAnswer]);
  const handleTextChange = (e) => {
    const updatedSingleQAnswer={...singleQAnswer,ReplyWithLink:e.target.value}
    setSingleAnswer(updatedSingleQAnswer)
    const updatedAnswers = [...questAnswer];
    updatedAnswers[idx]=updatedSingleQAnswer;
    // Set the updated answers back to state
    setQuestAnswer(updatedAnswers);
  };

  return (
    <div>
        <textarea 
         onChange={handleTextChange}
            className="custom-textarea"
            placeholder="Given your link here"
            value={questAnswer[idx]?.ReplyWithLink}
          ></textarea>
    </div>
  )
}

export default ReplyWithLink