import React from 'react'

const ProgressBarSvg = ({progress,progressColor}) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const progressBar = (progress / 100) * circumference;
    const taskValue = 2 * 100;
    const textLength = taskValue.toString().length;
    const fontSize = textLength > 5 ? 16 - (textLength - 5) * 2 : 16;
  return (
    <>
      
      <svg width="80" height="80" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="#FFFFFF80"
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