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
    
    questId
}) => {
    const handleClicked=()=>{
       if(isCompleted){
          setIsAnswerIsCompleted(true)
       }
       else{
         setIsServeyGoClicked(true)
         setQuestId(questId)
       }
       
    }
  return (
    <div className="Nudges-quest" >
    <div className="icon-text-quest">

     <div
         dangerouslySetInnerHTML={{ __html: SurveyQuestSvgIcon.nice_small }}
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