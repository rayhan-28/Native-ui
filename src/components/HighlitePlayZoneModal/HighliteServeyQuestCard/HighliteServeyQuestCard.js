import React from 'react'
import svgIcons from '../../../assets/image/SVG/svg'

const HighliteServeyQuestCard = () => {
  return (
    <div className="highlite-servey-quest-card">
      <div className="highlite-uppper">
        <p>Servey</p>
        <p className='servey-status'>NEW</p>
        <p className="commission">8 streaks for £20 Amazon voucher</p>
      </div>
      <p className="task">Share our link with your friends</p>
      
      <p className="points-referrals">Your weekly progress (3 days left)</p>
      <div className="highlite-last">
        <div
          dangerouslySetInnerHTML={{ __html: svgIcons.stardust }}
          style={{ marginRight: "10px", marginLeft: "" }}
        />
        <p style={{ fontSize: "1.1rem",margin:'0'}}>0/150</p>
        <div className="progress-bar">
          <span
            className="progress-indicator"
            style={{ width: `${(40 / 150) * 100}%` }}
          ></span>
        </div>
        <button>Go</button>
      </div>
    </div>
  )
}

export default HighliteServeyQuestCard