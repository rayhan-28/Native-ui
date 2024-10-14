import React from 'react'
import svgIcons from '../../assets/image/SVG/svg'

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
     {isCompleted ?
     <>
     <div
     dangerouslySetInnerHTML={{ __html: svgIcons.nice_small }}
     />
     <p className="text-ellipsis">Thank you for your participation</p>
     </>
     :
     <>
     <div
     dangerouslySetInnerHTML={{ __html: svgIcons.referral_nudges }}
     />
     <p className="text-ellipsis">You're 8 answers away from a reward</p>
     </>
     } 
     

    
      
    </div>
    <div onClick={()=>handleClicked()} className="arrow-box">
    <div
        dangerouslySetInnerHTML={{ __html: svgIcons.right_quest_arrow }}
      />
    </div>
   </div>
  )
}

export default NudgesServey