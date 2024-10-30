import React, { useState } from "react";
import ProgressBarSvg from "../../Common/ProgressBarSvg";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import NugesReferrals from "../../Common/NugesReferrals";

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
  width = "100%",
  maxWidth = "520px",
  email
}) => {
  console.log("refarralQuest ", referralQuest);
  const [isLinkClicked, setIsLinkClicked] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(null);
  const { token } = useAuth();  // Get email and token from context
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
      if( token){
         getGeneratedLink()
      }
     
      
     
  };
  

  return (
    <div style={{ width }} className="common-card-container">
      {referralQuest.length > 0
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
                  marginBottom: index!==(referralQuest.length)-1?'20px':'',
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
                    {referrals.rewardCondition && (
                      <p className="referrals-voucher">
                        <span className="scroll-text">
                          {referrals?.rewardCondition} : {referrals?.reward}
                        </span>
                      </p>
                    )}

                    <div className="circle-progress-text">
                      <ProgressBarSvg
                        progress={referrals.progress || "50"}
                        progressColor={referrals.gradientColor}
                      />
                      <div className="referral-details">
                        <p className="referrals-details-text">Referrals</p>
                        <p style={{margin:'0',lineHeight:'22px', fontSize: "22px", fontWeight: "300",color:'#06182CCC' }}>
                          2
                          <span  style={{ color: "#06182CCC", fontSize: "12px",fontWeight: "300" }}> confrimed</span>
                        </p>
                        <p className="text-ellipsis-referrals">
                          out of 4 sent so far
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="button-streaks">
                    <button onClick={()=>handleClicked(index,referrals.questId)} className="referrals-go-button">
                      {(isLinkClicked && clickedIndex===index)? "Copied" : "Invite"}
                    </button>
                  </div>
                </div>
                <NugesReferrals
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

export default ReferralsQuest;
