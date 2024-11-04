import React, { useEffect, useState } from 'react'
import SurveyQuestSvgIcon from '../../../assets/image/SVG/SurveyQuest/SurveyQuestSvgIcon';
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
  maxWidth="375px",
  serveyQuest,
  setIsServeyGoClicked,
  setQuestId,
  setReward,
  setIsFinisedClickedServey,
  isFinisedClickedServey,
  isAnswerIsCompleted,
  setIsAnswerIsCompleted,
  surveyQuestGoBtn,
  setSurveyNudgesOverlay,
  }) => {
  
 

  const onGoClicked = (questId) => {
    setIsServeyGoClicked(true);
    setQuestId(questId);
  }
  return (
    <div>
    {serveyQuest.length>0?(
     serveyQuest.map((survey,index)=>{
      const defaultColor = "#fbeeee";
      const backgroundColor = survey.gradientColor
        ? hexToRgba(survey.gradientColor, 0.3) // Apply 30% opacity to the gradient color
        : hexToRgba(defaultColor, 0.3); 
    return( 
    <div key={index}
     className="highlite-servey-quest-card"
     style={{
      backgroundColor,
      marginBottom: index!==(serveyQuest.length)-1?'20px':'',
      maxWidth,
      width
     }}
     >
      <div className="highlite-uppper">
        <p style={{fontSize:'12px',marginTop:'0',fontWeight:'500',color:'#06182CCC'}}>Survey</p>
        {survey.rewardCondition && (
            <div className="survey-voucher">
                <span className="text">
                  {survey?.rewardCondition}: {survey?.reward}
                </span>
            </div>
      )}
      </div>
      <p className="task">Share our link with your friends</p>
      
      <div className="highlite-last">
        <div
          dangerouslySetInnerHTML={{ __html: SurveyQuestSvgIcon.stardust }}
          style={{ marginRight: "7px" }}
        />
        <p style={{ fontSize: "12px",fontWeight:'400',margin:'0'}}>{survey.points}/{survey.totalPoints}</p>
        <div className="progress-bar">
          <p
            className="progress-indicator"
            style={{ width: `${((survey.points / survey.totalPoints) * 100) > 100 ? 100 : ((survey.points / survey.totalPoints) * 100)}%` ,backgroundColor:survey.gradientColor}}
          ></p>
        </div>
        {survey.points !== survey.totalPoints &&<button onClick={() => onGoClicked(survey?.questId)} className='survey-go-button'>Go</button>}
      </div>
      <div style={{height:'10px'}}/>
       {survey.points === survey.totalPoints && <NudgesServey 
         questType="Survey Quest"
         setIsServeyGoClicked={setIsServeyGoClicked}
         isFinisedClickedServey={isFinisedClickedServey}
         setIsFinisedClickedServey={setIsFinisedClickedServey}
         questId={survey?.questId}
         setQuestId={setQuestId}
         isAnswerIsCompleted={isAnswerIsCompleted} 
         setIsAnswerIsCompleted={setIsAnswerIsCompleted} 
         setSurveyNudgesOverlay={setSurveyNudgesOverlay}
         isCompleted=""
        />}
        
      
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