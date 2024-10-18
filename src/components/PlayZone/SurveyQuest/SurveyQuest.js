import React, { useEffect, useState } from 'react'
import svgIcons from '../../../assets/image/SVG/svg'
import Nudges from '../../Common/Nudges';
import NudgesServey from '../../Common/NudgesServey';


const hexToRgba = (hex, opacity) => {
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
const ServeyQuest= ({
  width="100%",
  maxWidth="520px",
  serveyQuest,
  setIsServeyGoClicked,
  setQuestId,
  setReward,
  setIsFinisedClickedServey,
  isFinisedClickedServey,
  isAnswerIsCompleted,
   setIsAnswerIsCompleted
  }) => {
  
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleShowSuccess = () => setShowSuccess(true);
  const handleCloseSuccess = () => setShowSuccess(false);

  const onGoClicked = (questId) => {
    setIsServeyGoClicked(true);
    setQuestId(questId);
  }
  console.log(serveyQuest)
  return (
    <div>
    {serveyQuest.length>0?(
     serveyQuest.map((habit,index)=>{
      const defaultColor = "#fbeeee";
      const backgroundColor = habit.gradientColor
        ? hexToRgba(habit.gradientColor, 0.3) // Apply 30% opacity to the gradient color
        : hexToRgba(defaultColor, 0.3); 
    return( 
    <div key={index}
     className="highlite-servey-quest-card"
     style={{
      backgroundColor,
      marginBottom:'20px',
      maxWidth,
      width
     }}
     >
      <div className="highlite-uppper">
        <p style={{fontSize:'12px',fontWeight:'500',color:'#06182CCC'}}>Servey</p>
        <p className="voucher">
          <span className="scroll-text">
            8 streaks for £20 Amazon voucher progress start
          </span>
        </p>
      </div>
      <p className="task">Share our link with your friends</p>
      
      <div className="highlite-last">
        <div
          dangerouslySetInnerHTML={{ __html: svgIcons.stardust }}
          style={{ marginRight: "7px" }}
        />
        <p style={{ fontSize: "12px",fontWeight:'400',margin:'0'}}>{habit.points}/{habit.totalPoints}</p>
        <div className="progress-bar">
          <p
            className="progress-indicator"
            style={{ width: `${(habit.points / habit.totalPoints) * 100}%` ,backgroundColor:habit.gradientColor}}
          ></p>
        </div>
        <button onClick={() => onGoClicked(habit?.questId)} className='go-button'>Go</button>
      </div>
      <div style={{height:'10px'}}/>
        <NudgesServey 
         questType="Survey Quest"
         setIsServeyGoClicked={setIsServeyGoClicked}
         isFinisedClickedServey={isFinisedClickedServey}
         setIsFinisedClickedServey={setIsFinisedClickedServey}
         questId={habit?.questId}
         setQuestId={setQuestId}
         isAnswerIsCompleted={isAnswerIsCompleted} 
         setIsAnswerIsCompleted={setIsAnswerIsCompleted} 
         isCompleted="true"
        />
        
      
    </div>
    )
    })
    ):(
      <div></div>
    )}
    </div>
  )
}

export default ServeyQuest