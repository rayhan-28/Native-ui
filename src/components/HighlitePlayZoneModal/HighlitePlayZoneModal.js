import React from 'react'
import HighliteReferralsQuestCard from './HighliteReferralsQuestCard/HighliteReferralsQuestCard'
import HighliteActionQuestCard from './HighliteActionQuestCard/HighliteActionQuestCard'
import HighlitePlayerQuestCard from './HighlitePlayerQuestCard/HighlitePlayerQuestCard'
import svgIcons from '../../assets/image/SVG/svg'
import HighliteLeaderboardCard from './HighliteLeaderboardCard/HighliteLeaderboardCard'
import HighliteServeyQuestCard from './HighliteServeyQuestCard/HighliteServeyQuestCard'
import SliderLevel from './ArcadeCard/SliderLevel'

const HighlitePlayZoneModal = () => {

 
  return (
   <div className='highlite-modal-overlay'>
    
    <div className='highlite-modal'>
      
       
    <div className='top-card'
     style={{
      backgroundImage:'url(https://res.cloudinary.com/pitchspace/image/upload/v1/player-icons/mobile/PlayerCharacter,3)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      padding:'20px'
    }}
    >

       <SliderLevel/>
      
    </div> 
    
       
    
    <div className='highlite-cards'>
     
     <HighliteActionQuestCard/>
     <HighliteServeyQuestCard/>
     <HighliteReferralsQuestCard/>
     <HighliteLeaderboardCard />
    </div>
     
     </div>
    </div>
  )
}

export default HighlitePlayZoneModal