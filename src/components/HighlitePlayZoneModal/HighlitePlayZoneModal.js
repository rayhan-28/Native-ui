import React, { useState } from 'react'
import HighliteReferralsQuestCard from './HighliteReferralsQuestCard/HighliteReferralsQuestCard'
import HighliteActionQuestCard from './HighliteActionQuestCard/HighliteActionQuestCard'
import HighlitePlayerQuestCard from './HighlitePlayerQuestCard/HighlitePlayerQuestCard'
import svgIcons from '../../assets/image/SVG/svg'
import HighliteLeaderboardCard from './HighliteLeaderboardCard/HighliteLeaderboardCard'
import HighliteServeyQuestCard from './HighliteServeyQuestCard/HighliteServeyQuestCard'
import SliderLevel from './ArcadeCard/SliderLevel'
import CommonCardOne from './CommonCardOne/CommonCardOne'

const HighlitePlayZoneModal = ({width='550px'}) => {
  const [isOpen, setIsOpen] = useState(true);

  // Function to close the modal
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  if (!isOpen) return null;
  return (
   <div className='highlite-modal-overlay'>
    
    <div className='highlite-modal' 
      style={{
        width: width
      }}
    >
    
    <div className='top-card'
     style={{
      backgroundColor:'#9a7eff',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      padding:'20px'
    }}
    > 
      <div style={{display:'flex',justifyContent:'end'}}>
       <div
            dangerouslySetInnerHTML={{ __html: svgIcons.hideButton }}
            className='highlite-close-btn' onClick={handleCloseModal}
       />
       </div>
       <SliderLevel/>
      
    </div> 
    
       
    
    <div className='highlite-cards'>
    <div className='quest-see'>
      <div>
        <span style={{fontWeight:'bold',fontSize:'1.2rem'}}>Quest </span> 
        <span style={{color:'rgba(6, 24, 44, 0.8)'}}> (6)</span>
      </div>
      <span className='see'>See all</span>
    </div>
     <CommonCardOne/>
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