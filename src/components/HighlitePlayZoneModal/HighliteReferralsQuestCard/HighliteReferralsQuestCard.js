import React from "react";
import backgroundImageUrl from "../../../assets/image/img/avtar.jpg";
import svgIcons from "../../../assets/image/SVG/svg";

const hexToRgba = (hex, opacity) => {
  let r = 0,
    g = 0,
    b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
const HighliteReferralsQuestCard = ({ referralQuest,width='100%',maxWidth='520px' }) => {
  console.log(referralQuest);
  return (
    <div>
      {referralQuest.length > 0 ? (
        referralQuest.map((habit, index) => {
          const defaultColor = "#fbeeee";
          const backgroundColor = habit.gradientColor
            ? hexToRgba(habit.gradientColor, 0.3) // Apply 30% opacity to the gradient color
            : hexToRgba(defaultColor, 0.3);
          return (
            <div key={index}
             className="highlite-referrals-quest-card"
             style={{
              backgroundColor,
              marginBottom:'20px',
              width,
              maxWidth
             }}
             >
              <div className="highlite-uppper">
                <p>Referrals</p>
                <p className="commission">20% commission per 1 referral</p>
              </div>
              <h4 style={{ fontWeight: "bold" }}>
                Share our link with your friends
              </h4>
              <div className="highlite-last">
                <div>
                  <p className="points-referrals">Points x Referrals</p>
                  <div>
                    <div className="highlite-points">
                      <div
                        dangerouslySetInnerHTML={{ __html: svgIcons.stardust }}
                        style={{ marginRight: "10px", marginLeft: "" }}
                      />
                      <p style={{ fontSize: "1.1rem" }}> 150 x 3</p>
                    </div>
                  </div>
                </div>
                <div className="higlite-referrals-btn">
                  <button>Code</button>
                  <button>Link</button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default HighliteReferralsQuestCard;
