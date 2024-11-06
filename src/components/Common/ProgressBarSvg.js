import React from 'react'


const ProgressBarSvg = ({progress,progressColor,points,fromPlayerCard}) => {
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
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const progressBar = (progress / 100) * circumference;
    const taskValue = parseInt(points);
    const textLength = taskValue.toString().length;
    const fontSize = textLength > 5 ? 16 - (textLength - 5) * 2 : 16;
    const insideStroke = fromPlayerCard?hexToRgba(progressColor,0.3):"#FFFFFF80"
  return (
    <>
      
      <svg width="60" height="60" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke={insideStroke}
              strokeWidth="12"
            />

            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke={progressColor}
              strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - progressBar}
              strokeLinecap="round"
              transform="rotate(-90 50 50)" // rotate to make progress start from the top
            />
            <text
              x="50%"
              y="43%"
              dominantBaseline="middle"
              textAnchor="middle"
              fontSize={fontSize}
              fill="#000"
            >
              ★ 
            </text>
            <text
              x="50%"
              y="60%"
              dominantBaseline="middle"
              textAnchor="middle"
              fontSize={fontSize}
              fill="#000"
            >
              {taskValue}
            </text>
          </svg>
     
     </>
  )
}

export default ProgressBarSvg

