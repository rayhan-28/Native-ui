import React from 'react'
import HighliteReferralsQuestCard from './HighliteReferralsQuestCard/HighliteReferralsQuestCard'
import HighliteActionQuestCard from './HighliteActionQuestCard/HighliteActionQuestCard'
import HighlitePlayerQuestCard from './HighlitePlayerQuestCard/HighlitePlayerQuestCard'
import svgIcons from '../../assets/image/SVG/svg'
import HighliteLeaderboardCard from './HighliteLeaderboardCard/HighliteLeaderboardCard'
import HighliteServeyQuestCard from './HighliteServeyQuestCard/HighliteServeyQuestCard'
import SliderLevel from './ArcadeCard/SliderLevel'

const HighlitePlayZoneModal = () => {

  const getOrdinalSuffix = (rank) => {
    if (rank % 10 === 1 && rank % 100 !== 11) {
      return 'st'
    } else if (rank % 10 === 2 && rank % 100 !== 12) {
      return 'nd'
    } else if (rank % 10 === 3 && rank % 100 !== 13) {
      return 'rd'
    } else {
      return 'th'
    }
  };

  return (
   <div className='highlite-modal-overlay'>
    
    <div className='highlite-modal'>
      
       
    <div className='top-card'
     style={{
      backgroundImage:'url(https://res.cloudinary.com/pitchspace/image/upload/v1/player-icons/PlayerCharacter,3)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      padding:'20px'
    }}
    >
      <div className='top-part'>
        <p>Hello<br/> <span style={{fontSize:'25px'}}>Ollie</span></p>
        <div
          style={{cursor:'pointer'}}
          dangerouslySetInnerHTML={{ __html: svgIcons.edit }}
        />
      </div>

      {/* slider-level */}

       <SliderLevel/>

      {/* point section */}
      <div className='point-part'>
        <div>
          <span>Points</span>
          <p>1950</p>
        </div>
        <div>
          <span>Streaks</span>
          <p >1950</p>
        </div>
        <div>
          <span>Rank</span>
          <p>4<sup>{getOrdinalSuffix(4)}</sup></p>
        </div>
      </div>
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