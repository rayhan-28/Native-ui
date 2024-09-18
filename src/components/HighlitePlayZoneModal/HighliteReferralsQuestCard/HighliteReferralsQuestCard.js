import React from "react";
import backgroundImageUrl from "../../../assets/image/img/avtar.jpg";
import svgIcons from "../../../assets/image/SVG/svg";
const HighliteReferralsQuestCard = () => {
  return (
    <div className="highlite-referrals-quest-card">
      <div className="highlite-uppper">
        <p>Referrals</p>
        <p className="commission">20% commission per 1 referral</p>
      </div>
      <h4 style={{ fontWeight: "bold" }}>Share our link with your friends</h4>
      <div className="highlite-last">
        <div>
          <p className="points-referrals">Points x Referrals</p>
          <div>
            <div className="highlite-points">
              <div
                dangerouslySetInnerHTML={{ __html: svgIcons.stardust }}
                style={{ marginRight: "10px", marginLeft: "" }}
              />
              <p style={{fontSize:'1.1rem'}}> 150 x 3</p>
              
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
};

export default HighliteReferralsQuestCard;
