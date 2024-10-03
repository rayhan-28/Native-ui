import React from 'react'

const ReplyWithTextAnswer = ({questAnswer,setQuestAnswer}) => {
 
  return (
    <div>
        <textarea
            onChange={(e)=>{
              setQuestAnswer({...questAnswer, TextAnswer:e.target.value})
            }}
            className="custom-textarea"
            placeholder="Type Your answer here"
            value={questAnswer.TextAnswer}
          ></textarea>
    </div>
  )
}

export default ReplyWithTextAnswer