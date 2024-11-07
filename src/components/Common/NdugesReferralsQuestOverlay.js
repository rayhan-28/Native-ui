import React, { useEffect, useState } from 'react'
import ReferralSvgIcon from '../../assets/image/SVG/ReferralsQuest/ReferralsQuest';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
const NdugesReferralsQuestOverlay = ({Icon,
   
    
    width="100%",
    maxWidth="520px",
    nodgesType,
    OnCloseReferralOverlay,
    questId,
    email,
    reward,
    rewardCondition,
    confirmedReferrals
  }) => {

    const [playerData, setPlayerData] = useState(null);
    const {token} =useAuth()
  
    const GetPlayerData = async () => {
      try {
        const response = await axios.get(
          "https://dev.api.pitch.space/api/player-info-for-quest",
          {
            params: {
               email, 
               token,
               questId
               },
          }
        );
        if (response.status === 200) {
          setPlayerData(response.data?.data);
        }
      } catch (err) {
        
      }
    };
  
  
    useEffect(() => {
      if (token) {
        GetPlayerData(); // Fetch player data initially
      }
    }, [token]);
  return (
    <div className='success-without-reward-overlay'>
        <div style={{ width,maxWidth}}
        className='success-without-container'>    
          <div
             className='close-icon'
              onClick={OnCloseReferralOverlay}
              dangerouslySetInnerHTML={{ __html: ReferralSvgIcon.cross }}
              
          />
{/*         
        rewardCondition!==null && confirmedReferrals>0 && confirmedReferrals%rewardCondition===0 ? 
     <div
     dangerouslySetInnerHTML={{ __html: ReferralSvgIcon.wow }}
     />
    : */}
       
      { rewardCondition>1 && confirmedReferrals<rewardCondition?
     <div
     dangerouslySetInnerHTML={{ __html: ReferralSvgIcon.letsGo_big }}
     />
     :rewardCondition===undefined && confirmedReferrals>0?
     <div
     dangerouslySetInnerHTML={{ __html: ReferralSvgIcon.referral_nudges_big }}
     />
     : <div
     dangerouslySetInnerHTML={{ __html: ReferralSvgIcon.wow }}
     />
     
    }  
       <>
       <p style={{fontSize:'25px',fontWeight:'bold',marginTop:'20px',marginBottom:'0'}}>{playerData?.confirmedReferral} confirmed referrals</p>
       {reward &&  <p style={{}}>{rewardCondition} referrals : {reward}</p>}
        <span style={{fontSize:'0.7rem',marginBottom:'5px'}}>With this referral,you've collected</span>
        </>
         
        <div style={{display:'flex',gap:'15px'}}>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
            <div className='reward-container'>
            <div  dangerouslySetInnerHTML={{ __html: ReferralSvgIcon.black_star }} />
             <p style={{margin:'0'}}>X {playerData?.points}</p>
            </div>
             <p style={{fontSize:'0.8rem'}}>Points</p>
            </div>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
            <div className='reward-container'>
            <div  dangerouslySetInnerHTML={{ __html: ReferralSvgIcon.servey }} />
            <p style={{margin:'0'}}>X {playerData?.Artifacts}</p>
            </div>
            <p style={{fontSize:'0.8rem'}}>Artefact</p>
            </div>
        </div>
        <button onClick={OnCloseReferralOverlay} style={{marginTop:'15px'}} className='success-without-btn'>Collect more points</button>
        <p style={{marginTop:'15px',color:'rgba(6, 24, 44, 0.7)'}}>Collect more points to unlock amazing rewards!</p>
        </div>
    </div>
  )
}

export default NdugesReferralsQuestOverlay