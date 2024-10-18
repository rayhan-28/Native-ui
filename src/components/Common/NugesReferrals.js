import React from 'react'
import svgIcons from '../../assets/image/SVG/svg'

const NugesReferrals = ({
    questType='Referral Quest'
}) => {

    const handleClicked=()=>{

    }
  return (
    <div className="Nudges-quest" >
      <div className="icon-text-quest">
     
    {questType==='Referral Quest' &&
     <>
     <div
     dangerouslySetInnerHTML={{ __html: svgIcons.letsGo }}
     />
     <p className="text-ellipsis">You're 8 answers away from a reward</p>
     </>
     
     } 
      
    </div>
    <div onClick={()=>handleClicked(questType)} className="arrow-box">
    <div
        dangerouslySetInnerHTML={{ __html: svgIcons.right_quest_arrow }}
      />
    </div>
   </div>
  )
}

export default NugesReferrals