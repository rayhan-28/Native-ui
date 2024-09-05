import React from 'react';
import svgIcons  from '../../assets/image/SVG/svg'

const MomentSuccess = ({points,onclose}) => {
  return (
    <div className='success-container'>
           <div className='success-content'>
           <div className='success-close' onClick={onclose}>x</div>

           <div className='svg-design' dangerouslySetInnerHTML={{__html:svgIcons.wow}} style={{height:"120px",width:'120px'}}/> 
            <p>You’ve made it</p>
            <h2>You had a streak this week and earned {points} points</h2>
            <button className="success-button">Earn more points</button>
           </div>
        
    </div>
  )
}

export default MomentSuccess