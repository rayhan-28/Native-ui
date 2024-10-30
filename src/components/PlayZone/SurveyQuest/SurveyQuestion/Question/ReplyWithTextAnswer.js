import React, { useEffect, useState } from "react";

const ReplyWithTextAnswer = ({ questAnswer, idx, setQuestAnswer }) => {
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
    const updatedSingleQAnswer={...singleQAnswer,TextAnswer:e.target.value}
    setSingleAnswer(updatedSingleQAnswer)
    const updatedAnswers = [...questAnswer];
    updatedAnswers[idx]=updatedSingleQAnswer;
    setQuestAnswer(updatedAnswers);
  }; 
  return (
    <div>
      <textarea
        onChange={handleTextChange}
        className="custom-textarea"
        placeholder="Type Your answer here"
        value={questAnswer[idx]?.TextAnswer}
      ></textarea>
    </div>
  );
};

export default ReplyWithTextAnswer;
