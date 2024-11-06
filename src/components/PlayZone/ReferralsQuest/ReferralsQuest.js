import React, { useState } from "react";
import ProgressBarSvg from "../../Common/ProgressBarSvg";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import NugesReferrals from "../../Common/NugesReferrals";
import ReferralSvgIcon from "../../../assets/image/SVG/ReferralsQuest/ReferralsQuest";

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
const ReferralsQuest = ({
  referralQuest,
  setNudgesClicked,
  setNodgesType,
  setReferralsNudgesOverlay,
  width = "100%",
  maxWidth = "520px",
  email,
  setQuestId,
  referralsNdugesOverlayConditionData
}) => {
  const [isLinkClicked, setIsLinkClicked] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(null);
  const { token } = useAuth(); // Get email and token from context
  const [error, setError] = useState(null);
  const handleClicked = (index, questId) => {
    const getGeneratedLink = async () => {
      try {
        console.log("referral questId check misbah ",questId);
        const response = await axios.get(
          "https://dev.api.pitch.space/api/generated-url",
          {
            params: {
              email: email,
              token: token,
              questId: questId,
            },
          }
        );
        if (response.status === 200) {
          console.log("Labib wuwe ", questId);
          navigator.clipboard
            .writeText(response.data)
            .then(() => {
              setClickedIndex(index);
              setIsLinkClicked(true);

              setTimeout(() => {
                setIsLinkClicked(false);
              }, 2000); // Reset after 2 seconds
            })
            .catch((err) => {
              console.error("Failed to copy link: ", err);
            });
        }
      } catch (error) {
        setError("You are not valid");
      }
    };
    if (token) {
      getGeneratedLink();
    }
  };

  return (
    <div style={{ width }} className="common-card-container">
      {referralQuest?.length > 0
        ? referralQuest.map((referrals, index) => {
            const defaultColor = "#fbeeee";
            const backgroundColor = referrals.gradientColor
              ? hexToRgba(referrals.gradientColor, 0.3)
              : hexToRgba(defaultColor, 0.3);

            return (
              <div
                className="referrals-card-wrapper"
                key={referrals.questId || index}
                style={{
                  backgroundColor, // Use the dynamic color with opacity
                  width,
                  marginBottom:
                    index !== referralQuest.length - 1 ? "20px" : "",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                  }}
                >
                  <div>
                    {/* Conditionally render the voucher only if rewardCondition is not empty */}
                    {referrals?.reward && (
                      <div className="referral-voucher">
                      <span className="text">
                      {referrals?.reward} for each{" "}
                        {referrals.rewardCondition > 1
                          ? referrals.rewardCondition
                          : ""}{" "}
                        confirmed
                        {referrals?.rewardCondition > 1
                          ? " referrals"
                          : " referral"}
                      </span>
                    </div>
                      
                    )}
                    


                    <div className="circle-progress-text">
                      {referrals?.rewardCondition > 1 ? (
                        <ProgressBarSvg
                          points={referrals.points ?? 0}
                          progress={referrals.progress || 0}
                          progressColor={referrals.gradientColor}
                        />
                      ) : (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: ReferralSvgIcon.referral_big,
                          }}
                        />
                      )}
                      <div className="referral-details">
                        <p style={{marginBottom:referrals?.rewardCondition <= 1?'4px':'0'}} className="referrals-details-text">Referrals</p>
                        {referrals.rewardCondition > 1 ? (
                          <p
                            style={{
                              margin: "0",
                              lineHeight: "22px",
                              fontSize: "22px",
                              fontWeight: "300",
                              color: "#06182CCC",
                            }}
                          >
                            {referrals?.confirmedReferrals}
                            <span
                              style={{
                                color: "#06182CCC",
                                fontSize: "12px",
                                fontWeight: "300",
                              }}
                            >
                              {" "}
                              confrimed
                            </span>
                          </p>
                        ) : (
                          <div
                            style={{
                              marginBottom:referrals?.rewardCondition <= 1?'4px':'0',
                              display: "flex",
                              columnGap: "8px",
                              alignItems: "baseline",
                              justifyContent: "flex-start",
                            }}
                          >
                            <p
                              style={{
                                margin: "0",
                                lineHeight: "22px",
                                fontSize: "22px",
                                fontWeight: "300",
                                color: "#06182CCC",
                              }}
                            >
                              {referrals?.confirmedReferrals}
                            </p>

                            <p
                              style={{
                                color: "#06182CCC",
                                fontSize: "12px",
                                fontWeight: "300",
                                margin: "0",
                              }}
                            >
                              {" "}
                              x{" "}
                            </p>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: ReferralSvgIcon.star_small,
                              }}
                            />
                            <p style={{ margin: "0" }}>{referrals?.points}</p>
                          </div>
                        )}

                        <p className="text-ellipsis-referrals">
                          {referrals?.rewardCondition <= 1 ? "confirmed" : ""}{" "}
                          out of {referrals?.sentReferrals} sent so far
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="button-streaks">
                    <button
                      onClick={() => handleClicked(index, referrals?.questId)}
                      className="referrals-go-button"
                    >
                      {isLinkClicked && clickedIndex === index
                        ? "Copied"
                        : "Invite"}
                    </button>
                  </div>
                </div>
                { (referrals.confirmedReferrals>0) ?
                  <NugesReferrals
                  rewardCondition={referrals.rewardCondition }
                  confirmedReferrals={referrals?.confirmedReferrals}
                  setReferralsNudgesOverlay={setReferralsNudgesOverlay}
                  setNudgesClicked={()=>{
                    setNudgesClicked(true);
                    setQuestId(referrals?.questId)
                    referralsNdugesOverlayConditionData(referrals?.confirmedReferrals,referrals?.rewardCondition,referrals?.reward)
                  }} 
                /> : null }
              </div>
            );
          })
        : ""}
    </div>
  );
};

export default ReferralsQuest;
