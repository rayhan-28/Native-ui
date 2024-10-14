import React, { useState } from "react";
import svgIcons from "../../../assets/image/SVG/svg";
import Nudges from "../../Common/Nudges";
import ProgressBarSvg from "../CommonCardOne/ProgressBarSvg";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";

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
const HighliteReferralsQuestCard = ({
  referralQuest,
  setNudgesClicked,
  setNodgesType,
  width = "100%",
  maxWidth = "520px",
}) => {
  console.log("refarralQuest ", referralQuest);
  const [isLinkClicked, setIsLinkClicked] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(null);
  const { email, token } = useAuth();  // Get email and token from context
  const [error, setError] = useState(null);
  const handleClicked = (index, questId) => {
      
      const getGeneratedLink= async()=>{
        try {
          const response = await axios.get('https://dev.api.pitch.space/api/generated-url',{
            params:{
              email:email,
              token:token,
              questId:questId
            }
          });
          if(response.status===200){
           console.log("Labib wuwe ",questId)
        navigator.clipboard.writeText(response.data)
        .then(() => {
          setClickedIndex(index);
          setIsLinkClicked(true);
          
          setTimeout(() => {
            setIsLinkClicked(false);
          }, 2000);  // Reset after 2 seconds
        })
        .catch((err) => {
          console.error("Failed to copy link: ", err);
        });
          }
        } catch (error) {
          setError('You are not valid');
        }
      }
      if(email && token){
         getGeneratedLink()
      }
     
      
     
  };
  

  return (
    <div style={{ width }} className="common-card-container">
      {referralQuest.length > 0
        ? referralQuest.map((habit, index) => {
            const defaultColor = "#fbeeee";
            const backgroundColor = habit.gradientColor
              ? hexToRgba(habit.gradientColor, 0.3)
              : hexToRgba(defaultColor, 0.3);

            return (
              <div
                className="referrals-card-wrapper"
                key={habit.questId || index}
                style={{
                  backgroundColor, // Use the dynamic color with opacity
                  width,
                  marginBottom: "20px",
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
                    {habit.rewardCondition && (
                      <p className="voucher">
                        <span className="scroll-text">
                          {/* {habit?.rewardCondition} : {habit?.reward} */}
                        </span>
                      </p>
                    )}

                    <div className="circle-progress-text">
                      <ProgressBarSvg
                        progress={habit.progress || "50"}
                        progressColor={habit.gradientColor}
                      />
                      <div className="details">
                        <span className="referrals-details-text">
                          Referrals
                        </span>
                        <br />
                        <span style={{ fontSize: "30px", fontWeight: "400" }}>
                          1
                        </span>
                        <span style={{ color: "#06182CCC", fontSize: "15px" }}>
                          {" "}
                          confrimed
                        </span>
                        <br />
                        <span className="text-ellipsis-referrals">
                          out of 4 sent so far
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="button-streaks">
                    <button onClick={()=>handleClicked(index,habit.questId)} className="referrals-go-button">
                      {(isLinkClicked && clickedIndex===index)? "Copied" : "Invite"}
                    </button>
                  </div>
                </div>
                <Nudges
                  // Icon={
                  //   parseInt(habit.completedStreak) ===
                  //   parseInt(habit.completionTarget[0])
                  //     ? "wow_small"
                  //     : "letsGo"
                  // }
                  // remaining={
                  //   parseInt(habit.completionTarget[0]) -
                  //   parseInt(habit.completedStreak)
                  // }
                  questType="Referral Quest"
                  Icon="wow_small"
                  setNudgesClicked={setNudgesClicked} // Pass setNudgesClicked as a prop
                  setNodgesType={setNodgesType}
                />
              </div>
            );
          })
        : ""}
    </div>
  );
};

export default HighliteReferralsQuestCard;
