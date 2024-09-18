import React from "react";
import svgIcons from "../../../assets/image/SVG/svg";

const HighliteActionQuestCard = ({
  profileImg,
  name = "Oliver",
  moments = 120,
  highlites = 3,
  ranking = 2,
  points = 3,
  currentProgress = 2,
  streak = 7,
  discount = "20% discount on next month",
  task = "Create 3 moments in 7 days",
  onButtonClick,
}) => {
  return (
    <div className="highlite-action-quest-card">
      {/* Streak, rewards, and progress */}
      <div className="action-streak-section">
        <div className="streak-background">
          <div
            dangerouslySetInnerHTML={{ __html: svgIcons.streak }}
            style={{ marginRight: "3px" }}
          />
          <p className="streak">{streak}-Week Streak</p>
          <p className="commission">8 streaks for £20 Amazon voucher</p>
        </div>
      </div>

      <p className="task">{task}</p>

      {/* Discount and Button */}
     
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
  );
};

export default HighliteActionQuestCard;
