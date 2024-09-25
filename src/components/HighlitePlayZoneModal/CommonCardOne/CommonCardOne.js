import React from "react";
import svgIcons from "../../../assets/image/SVG/svg";

const CommonCardOne = ({ width = "100%" }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const progress = (1 / 4) * circumference;
  const taskValue = 2 * 100;
  const textLength = taskValue.toString().length;
  const fontSize = textLength > 5 ? 16 - (textLength - 5) * 2 : 16;
  return (
    <div
      style={{ backgroundColor: "#fbeeee",width:width}}
      className="common-card-one"

    >
      <div>
        <p className="voucher">
          <span className="scroll-text">
            8 streaks for £20 Amazon voucher progress start
          </span>
        </p>
        <div className="circle-progress">
          <svg width="80" height="80" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="#f5d8dc"
              strokeWidth="12"
            />

            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="#e4a1a9"
              strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - progress}
              strokeLinecap="round"
              transform="rotate(-90 50 50)" // rotate to make progress start from the top
            />
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fontSize={fontSize}
              fill="#000"
            >
              ★ {taskValue}
            </text>
          </svg>
          <div className="details">
            <span className="details-text">Community updates</span>
            <br />
            <span>1 out of 4</span>
            <br />
            <span style={{ color: "rgba(6, 24, 44, 0.8)", fontSize: "0.7rem" }}>
              in 7 days(6 day left)
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
          <p>2 Streaks</p>
        </div>
        <button className="go-button">Go</button>
      </div>
    </div>
  );
};

export default CommonCardOne;
