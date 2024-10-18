import React from 'react'
import svgIcons from '../../assets/image/SVG/svg'

const NugesUserHabib = ({
    questType='User Habit Quest',
    Icon 
}) => {

    const handleClicked=()=>{

    }
  return (
    <div className="Nudges-quest" >
    <div className="icon-text-quest">
    
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
      <p className="text-ellipsis">You're 8 streaks away from a reward</p>
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

export default NugesUserHabib