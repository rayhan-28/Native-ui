import React from 'react'
import ReferralSvgIcon from '../../assets/image/SVG/ReferralsQuest/ReferralsQuest'

const NugesReferrals = ({
    rewardCondition,
    confirmedReferrals,
    setNudgesClicked,
    setReferralsNudgesOverlay
}) => {

  const handleClicked = () =>{
    setNudgesClicked(true)
    setReferralsNudgesOverlay(true)
  }
  return (
    <div style={{backgroundColor:'rgba(255, 255, 255, 0.3)'}} className="Nudges-quest" >
      <div className="icon-text-quest">
     
     
     {rewardCondition!==null && confirmedReferrals>0 && confirmedReferrals%rewardCondition===0 ?  <>
     <div
     dangerouslySetInnerHTML={{ __html: ReferralSvgIcon.wow_small }}
     />
     <p className="text-ellipsis">Congrats! You unlocked a reward...</p>
     </>: rewardCondition>1 && confirmedReferrals<rewardCondition? <>
     <div
     dangerouslySetInnerHTML={{ __html: ReferralSvgIcon.letsGo }}
     />
     <p className="text-ellipsis">Send {rewardCondition-confirmedReferrals} more referrals to earn a reward</p>
     </>:rewardCondition===undefined && confirmedReferrals>0?<>
     <div
     dangerouslySetInnerHTML={{ __html: ReferralSvgIcon.referral_nudges }}
     />
     <p className="text-ellipsis">Earn more points to unlock rewards</p>
     </>:null
     
    }
     
    </div>
    <div onClick={handleClicked} className="arrow-box">
    <div
        dangerouslySetInnerHTML={{ __html: ReferralSvgIcon.right_quest_arrow }}
      />
    </div>
   </div>
  )
}

export default NugesReferrals