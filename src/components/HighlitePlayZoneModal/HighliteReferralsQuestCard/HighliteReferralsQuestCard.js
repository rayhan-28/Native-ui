import React from "react";
import backgroundImageUrl from "../../../assets/image/img/avtar.jpg";
import svgIcons from "../../../assets/image/SVG/svg";
import Nudges from "../../Common/Nudges";
import ProgressBarSvg from "../CommonCardOne/ProgressBarSvg";

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
const HighliteReferralsQuestCard = ({ referralQuest,setNudgesClicked,setNodgesType,width='100%',maxWidth='520px', }) => {
  console.log("refarralQuest ",referralQuest);
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
                className="common-card-one"
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
                    alignItems: "center",
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
                    <div className="circle-progress">
                      <ProgressBarSvg
                        progress={habit.progress || "50"}
                        progressColor={habit.gradientColor}
                      />
                      <div className="details">
                        <span className="details-text">Community updates</span>
                        <br />
                        <span>
                          {habit?.completedReferrals} out of{" "}
                          {habit?.sentReferrals}
                        </span>
                        <br />
                        {/* <span
                          style={{
                            color: "rgba(6, 24, 44, 0.8)",
                            fontSize: "0.7rem",
                          }}
                        >
                          in {habit.targetDay} ({habit.dayLeft} days left)
                        </span> */}
                      </div>
                    </div>
                  </div>
                  <div className="button-streaks">
                    <div className="icon-text">
                      {habit.completedStreak > 0 ? (
                        <div
                          dangerouslySetInnerHTML={{ __html: svgIcons.streak }}
                          style={{ marginRight: "5px" }}
                        />
                      ) : (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: svgIcons.empty_streak,
                          }}
                          style={{ marginRight: "5px" }}
                        />
                      )}
                      <p style={{ whiteSpace: "nowrap" }}>
                        {habit.completedStreak} Streaks
                      </p>
                    </div>
                    <button className="go-button">Go</button>
                  </div>
                </div>
                {/* <Nudges
                  Icon={
                    parseInt(habit.completedStreak) ===
                    parseInt(habit.completionTarget[0])
                      ? "wow_small"
                      : "letsGo"
                  }
                  remaining={
                    parseInt(habit.completionTarget[0]) -
                    parseInt(habit.completedStreak)
                  }
                  setNudgesClicked={setNudgesClicked} // Pass setNudgesClicked as a prop
                  setNodgesType={setNodgesType}
                /> */}
              </div>
            );
          })
        : ""}
    </div>
  );
};

export default HighliteReferralsQuestCard;
