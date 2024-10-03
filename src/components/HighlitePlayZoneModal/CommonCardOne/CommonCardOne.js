import React, { useEffect, useState } from "react";
import svgIcons from "../../../assets/image/SVG/svg";
import ProgressBarSvg from "./ProgressBarSvg";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";

const hexToRgba = (hex, opacity) => {
  let r = 0, g = 0, b = 0;
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

const CommonCardOne = ({ width = "100%" ,userHabitQuest}) => {
  console.log(userHabitQuest)
  //api call
 
  return (
    <div style={{ width }} className="common-card-container">
    {userHabitQuest.length > 0 ? (
      userHabitQuest.map((habit, index) => {
        // Default fallback color if gradientColor is not provided
        const defaultColor = "#fbeeee";
        // Get the gradient color or default to #fbeeee and set its opacity to 30%
        const backgroundColor = habit.gradientColor
          ? hexToRgba(habit.gradientColor, 0.3) // Apply 30% opacity to the gradient color
          : hexToRgba(defaultColor, 0.3); // Fallback if no gradientColor

        return (
          <div
            key={habit.questId || index}
            style={{
              backgroundColor, // Use the dynamic color with opacity
              width,
              marginBottom: '20px',
            }}
            className="common-card-one"
          >
            <div>
              {/* Conditionally render the voucher only if rewardCondition is not empty */}
              {habit.rewardCondition && (
                <p className="voucher">
                  <span className="scroll-text">
                    {habit.rewardCondition} : {habit.reward}
                  </span>
                </p>
              )}
              <div className="circle-progress">
                <ProgressBarSvg progress={habit.progress || "50"} progressColor={habit.gradientColor}/>
                <div className="details">
                  <span className="details-text">Community updates</span>
                  <br />
                  <span>{habit.completedStreak} out of {habit.completionTarget}</span>
                  <br />
                  <span style={{ color: "rgba(6, 24, 44, 0.8)", fontSize: "0.7rem" }}>
                    in {habit.targetDay} ({habit.dayLeft} days left)
                  </span>
                </div>
              </div>
            </div>
            <div className="button-streaks">
              <div className="icon-text">
                <div
                  dangerouslySetInnerHTML={{ __html: svgIcons.streak }}
                  style={{ marginRight: "5px" }}
                />
                <p>{habit.completedStreak || 2} Streaks</p>
              </div>
              <button className="go-button">Go</button>
            </div>
          </div>
        );
      })
    ) : (
      <p>No habits found</p>
    )}
  </div>
  );
};

export default CommonCardOne;
