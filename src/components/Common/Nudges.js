import React from 'react'
import svgIcons from '../../assets/image/SVG/svg'

const Nudges = ({
  Icon,
  remaining,
  setNudgesClicked,
  setNodgesType,
  questType,
  setTypeOfQuest,
  setIsServeyGoClicked,
  setQuestId,
  questId
}) => {
    
    console.log("typeOf Quest",remaining)
    console.log("questType ",questType)
    const handleClicked=(type)=>{
      if(type==='User Habit Quest'){
        setNudgesClicked(true); 
        setNodgesType(Icon)
      }
      else if(type==='Survey Quest'){
        setIsServeyGoClicked(true)
        setQuestId(questId)

      }
     
        setTypeOfQuest(questType)
        
    }
   
  return (
    <div className="last-part-quest" >
    <div className="icon-text-quest">
     {questType==='Survey Quest' &&
     <>
     <div
     dangerouslySetInnerHTML={{ __html: svgIcons.referral_nudges }}
     />
     <p className="text-ellipsis">You're 8 answers away from a reward</p>
     </>
     
     } 
     {questType==='User Habit Quest' &&(
     Icon==='wow_small'?(
     <>
      <div
        dangerouslySetInnerHTML={{ __html: svgIcons.wow_small }}
      />
      <p className="text-ellipsis">Contrats!Yor unlocked a reward</p>
      </>
     ):(
      <>
      <div
      dangerouslySetInnerHTML={{ __html: svgIcons.letsGo }} />
      <p className="text-ellipsis">You're {remaining} streaks away from a reward</p>
      </>
    ))}
    
      
    </div>
    <div onClick={()=>handleClicked(questType)} className="arrow-box">
    <div
        dangerouslySetInnerHTML={{ __html: svgIcons.right_quest_arrow }}
      />
    </div>
   </div>
  )
}

export default Nudges