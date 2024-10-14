import React from 'react'

const NdugesReferralsQuestOverlay = (Icon,
    remaining="",
    onClose,
    width="100%",
    maxWidth="520px",
    nodgesType,
    reward) => {
  return (
    <div className='success-without-reward-overlay'>
        <div
        style={{
            width,
            maxWidth
        }}
        className='success-without-container'
        >    
            
          <div
             className='close-icon'
              onClick={onClose}
              dangerouslySetInnerHTML={{ __html: svgIcons.cross }}
              
          />
        
        {/* <div  dangerouslySetInnerHTML={{ __html: svgIcons.nice }} /> */}
         {nodgesType==='wow_small'? <div  dangerouslySetInnerHTML={{ __html: svgIcons.wow }}/>
         : 
         <div  dangerouslySetInnerHTML={{ __html: svgIcons.letsGo_big }}/>} 
         {reward &&
          <>
           <p style={{fontSize:'1.1rem',marginBottom:'0'}}>Reward unlocked</p> 
           <p style={{fontSize:'1.3rem',marginTop:'0'}}>Lorem ipsum dolor sit amet,Conseectuer</p>
           <p>How to claim</p>
           <p style={{color:'rgba(6, 24, 44, 0.7)',fontSize:'0.8rem'}}>
           Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
           Aenean commodo ligula eget dolor.
           Aenean massa. Cum sociis natoque penatibus et magnis disap
            </p> 
            <p style={{color:'rgba(6, 24, 44, 0.8)',fontSize:'0.8rem'}}>You've collected</p>
          </>
         }

       {!reward && 
       <>
       <p style={{fontSize:'25px',fontWeight:'bold',marginTop:'20px',marginBottom:'0'}}>Servey Completed</p>
        <p style={{}}>Thank you for your time</p>
        <span style={{fontSize:'0.7rem',marginBottom:'5px'}}>With this survey,you've collected</span>
        </>
         }
        <div style={{display:'flex',gap:'15px'}}>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
            <div className='reward-container'>
            <div  dangerouslySetInnerHTML={{ __html: svgIcons.black_star }} />
             <p style={{margin:'0'}}>X 450</p>
            </div>
             <p style={{fontSize:'0.8rem'}}>Points</p>
            </div>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
            <div className='reward-container'>
            <div  dangerouslySetInnerHTML={{ __html: svgIcons.servey }} />
            <p style={{margin:'0'}}>X 1</p>
            </div>
            <p style={{fontSize:'0.8rem'}}>Artefact</p>
            </div>
        </div>
        <button onClick={onClose} style={{marginTop:'15px'}} className='success-without-btn'>Collect more points</button>
        <p style={{marginTop:'15px',color:'rgba(6, 24, 44, 0.7)'}}>Collect more points to unlock amazing rewards!</p>
        </div>
    </div>
  )
}

export default NdugesReferralsQuestOverlay