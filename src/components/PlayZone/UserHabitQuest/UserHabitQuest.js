import React, { useEffect, useState } from "react";
import svgIcons from "../../../assets/image/SVG/svg";
import ProgressBarSvg from "../../Common/ProgressBarSvg";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import Nudges from "../../Common/Nudges";
import NugesUserHabit from "../../Common/NugesUserHabit";

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

const UserHabitQuest = ({
  width = "",
  maxWidth="375px",
  userHabitQuest,
  setNudgesClicked,
  setNodgesType,
  setTypeOfQuest
}) => {
  //api call

  return (
    <div style={{ maxWidth }} className="common-card-container">
      {userHabitQuest.length > 0
        ? userHabitQuest.map((habit, index) => {
            const defaultColor = "#fbeeee";
            const backgroundColor = habit.gradientColor
              ? hexToRgba(habit.gradientColor, 0.3)
              : hexToRgba(defaultColor, 0.3);

            return (
              <div
                className="user-habit-container"
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
                    justifyContent: 'space-between',
                    alignItems: 'stretch',
                  }}
                >
                  <div>
                    {/* Conditionally render the voucher only if rewardCondition is not empty */}
                    {habit.rewardCondition && (
                      <p className="user-habit-voucher">
                        <span className="scroll-text">
                          {habit.rewardCondition} : {habit.reward}
                        </span>
                      </p>
                    )}
                    <div className="circle-progress">
                      <ProgressBarSvg
                        progress={habit.progress || "50"}
                        progressColor={habit.gradientColor}
                      />
                      <div className="user-habit-details">
                        <p className="details-text">Community updates</p>
              
                        <span style={{fontSize:'22px',fontWeight:'300',lineHeight:'28.03px',color:'#06182CCC'}}>
                          {habit.completedStreak} out of{" "}
                          {habit.completionTarget[0]}
                        </span>
                        <p
                          style={{
                            color: "rgba(6, 24, 44, 0.8)",
                            fontSize: "12px",fontWeight:'400',
                            margin:'0'
                          }}
                        >
                          in {habit.targetDay} ({habit.dayLeft} days left)
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="button-streaks">
                    <div className="icon-text">
                      {habit.completedStreak > 0 ? (
                        <div
                          dangerouslySetInnerHTML={{ __html: svgIcons.streak }}
                          style={{ marginRight: "2px" }}
                        />
                      ) : (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: svgIcons.empty_streak,
                          }}
                          style={{ marginRight: "5px" }}
                        />
                      )}
                      <p style={{fontSize:'12px',fontWeight:'500', whiteSpace: "nowrap" }}>
                        {habit.completedStreak} Streaks
                      </p>
                    </div>
                    <button className="go-button">Go</button>
                  </div>
                </div>
                <NugesUserHabit
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
                  setTypeOfQuest={setTypeOfQuest}
                  questType="User Habit Quest"
                />
              </div>
            );
          })
        : ""}
    </div>
  );
};

export default UserHabitQuest;
