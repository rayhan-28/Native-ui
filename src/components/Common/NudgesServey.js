import React from 'react'
import SurveyQuestSvgIcon from '../../assets/image/SVG/SurveyQuest/SurveyQuestSvgIcon'

const NudgesServey = ({
    Icon,
    remaining,
    setNudgesClicked,
    setNodgesType,
    questType,
    setTypeOfQuest,
    setIsServeyGoClicked,
    setQuestId,
    isCompleted,
    setIsAnswerIsCompleted,
    isAnswerIsCompleted,
    setSurveyNudgesOverlay,
    questId
}) => {
    const handleClicked=()=>{
       if(isCompleted){
          setIsAnswerIsCompleted(true)
       }
       else{
         setSurveyNudgesOverlay(true)
         setQuestId(questId)
       }
       
    }
  return (
    <div style={{backgroundColor:'rgba(255, 255, 255, 0.3)'}} className="Nudges-quest" >
    <div className="icon-text-quest">

     <div
         style={{marginTop:'7px'}}
         dangerouslySetInnerHTML={{ __html: SurveyQuestSvgIcon.wow_small}}
     />
     <p className="text-ellipsis">Thank you for your participation</p>
    </div>
    <div onClick={()=>handleClicked()} className="arrow-box">
    <div
        dangerouslySetInnerHTML={{ __html: SurveyQuestSvgIcon.right_quest_arrow }}
      />
    </div>
   </div>
  )
}

export default NudgesServey