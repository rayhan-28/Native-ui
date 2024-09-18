import React from 'react'
import svgIcons from '../../../assets/image/SVG/svg'

const HighlitePlayerQuestCard = ({
  profileImg,
  name = "Oliver",
  moments = 120,
  highlites = 3,
  ranking = 2,
  currentProgress=2,
  streak = 7,
  discount = "20% discount on next month",
  task = "Create 3 moments in 7 days",
  onButtonClick,
}) => {
  return (
    <div className="user-card">
      {/* Profile section */}
      <div className="profile-section">
        <div
          className="profile-img"
          dangerouslySetInnerHTML={{ __html: svgIcons.profile }}
          //   style={{height:"120px",width:'120px'}}
        />
        {/* <img src={profileImg} alt={`${name}'s profile`} className="profile-img" /> */}
        <div className="first-level">
        
          <div className="name-title">
            <h2 style={{margin:'0'}}>Hi {name}</h2>
            <p style={{marginBottom:'0',color: '#888'}} className="subtitle">YOU'RE A STAR 🎉</p>
          </div>
          

          {/* Points and Ranking */}
          
          <div className="status-section">
            <div className="points">
              <p>{moments}</p>
              <span>Moments</span>
            </div>
            <div className="moments">
              <p >{highlites}</p>
              <span>Highlites</span>
            </div>
            <div className="ranking">
              <p >
                {ranking}
                <sup>th</sup>
              </p>
              <span>Place</span>
            </div>
          </div>
          </div>
        </div>
      

      {/* Streak, rewards, and progress */}
      <div className="highlite-streak-section">
        <div className="progress-bar">
          <span
            className="progress-indicator"
            style={{ width: `${(2 / highlites) * 100}%` }}
          ></span>
        </div>
      </div>
      <div className="highlite-status-section">
            <div className="points">
              <p>2200</p>
              <span>Points</span>
            </div>
            <div className="next-level">
              <p >{highlites}</p>
              <span>Next Leve</span>
            </div>
          </div>
    </div>
  )
}

export default HighlitePlayerQuestCard