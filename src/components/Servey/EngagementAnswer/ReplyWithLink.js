import React from 'react'

const ReplyWithLink = ({questAnswer,setQuestAnswer}) => {
  return (
    <div>
        <textarea
        onChange={(e)=>{
          setQuestAnswer({...questAnswer, ReplyWithLink:e.target.value})
        }}
            className="custom-textarea"
            placeholder="Given your link here"
            value={questAnswer.ReplyWithLink}
          ></textarea>
    </div>
  )
}

export default ReplyWithLink