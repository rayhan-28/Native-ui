import React from 'react';
import svgIcons  from '../../assets/image/SVG/svg'

const MomentSuccess = ({points,onclose}) => {
  return (
    <div className='success-container'>
           <div className='success-content'>
           <div 
                className='success-close' 
                onClick={onclose}
                dangerouslySetInnerHTML={{__html:svgIcons.cross}}
                style={{height:"120px",width:'120px'}}
            /> 
           <div 
                className='svg-design'
                dangerouslySetInnerHTML={{__html:svgIcons.wow}}
                style={{height:"120px",width:'120px'}}
            /> 
            <h5>You’ve made it</h5>
            <h3>You had a streak this week and earned {points} points</h3>
            <button className="success-button">Earn more points</button>
           </div>
        
    </div>
  )
}

export default MomentSuccess