import React, { useEffect, useState } from "react";
import svgIcons from "../../assets/image/SVG/svg";
// import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const Card = ({
  profileImg,
  name = "Oliver",
  points = 120,
  moments = 3,
  ranking = 2,
  streak = 7,
  discount = "20% discount on next month",
  task = "Create 3 moments in 7 days",
  onButtonClick,
}) => {
  // const { email, token } = useAuth();  // Get email and token from context
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  //   useEffect(() => {
  //     // Make an API call with the stored email and token
  //     const fetchData = async () => {
  //         try {
  //             const response = await axios.get('https://dev.api.pitch.space/api/player-history', {
  //               params: {
  //                 email: email,
  //                 token: token
  //             }
  //             });
  //             console.log(email)
  //             if (response.status === 200) {
  //                 setData(response.data?.data[0]);
  //                 console.log("hlw")
  //             }
  //         } catch (err) {
  //             setError('You are not valid');
  //         }
  //     };
  //     if (email && token) {
  //         fetchData();  // Only fetch if both email and token are set
  //     }
  // }, [email, token]);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const progress = (1 / 4) * circumference;
  const taskValue = 2 * 100;
  const textLength = taskValue.toString().length;
  const fontSize = textLength > 5 ? 16 - (textLength - 5) * 2 : 16;

  if (error) {
    return (
      <>
        <div className="user-card">
          <h4>Please give your credentials</h4>
        </div>
      </>
    );
  }

  return (
    // <div className="user-card">
    //   {/* Profile section */}
    //   <div className="profile-section">
    //     <img
    //       src={`https://res.cloudinary.com/pitchspace/image/upload/v1/player-icons/PlayerCharacter,3`}
    //       style={{ height: "120px", width: "121px", borderRadius: "15px" }}
    //     />
    //     <div className="first-level">
    //       <div className="name-title">
    //         <h2 style={{ margin: "0" }}>Hi {name}</h2>
    //         <p
    //           style={{ marginBottom: "0", color: "#888" }}
    //           className="subtitle"
    //         >
    //           YOU'RE A STAR 🎉
    //         </p>
    //       </div>

    //       {/* Points and Ranking */}

    //       <div className="status-section">
    //         <div className="points">
    //           <p>{points}</p>
    //           <span>Points</span>
    //         </div>
    //         <div className="moments">
    //           <p>{moments}</p>
    //           <span>Moments</span>
    //         </div>
    //         <div className="ranking">
    //           <p>
    //             {ranking}
    //             <sup>th</sup>
    //           </p>
    //           <span>Rank</span>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Streak, rewards, and progress */}
    //   {/* <div className="streak-section">
    //     <div className="streak-background">
           
    //         <p className="streak">⚡ {streak}-Week Streak</p>
    //     </div>
    //     <div className="isolation">
    //     <div
    //       dangerouslySetInnerHTML={{ __html: svgIcons.isolation }}
    //       style={{marginRight:'3px',marginLeft:'10px'}}
    //     />
    //     <p style={{marginRight:'10px'}}>X1</p>
    //     </div>
        
    //     <div className="isolation">
    //     <div
    //       dangerouslySetInnerHTML={{ __html: svgIcons.stardust }}
    //       style={{marginRight:'3px',marginLeft:'10px'}}
    //     />
    //     <p >150</p>
    //     </div>
        
        
    //     <div className="progress-bar">
    //       <span
    //         className="progress-indicator"
    //         style={{ width: `${(2 / moments) * 100}%` }}
    //       ></span>
    //     </div>
       
    //   </div> */}

    //   <div className="streak-section">
    //     <p className="voucher">8 streaks: £20 Amazon voucher</p>
    //     <div className="icon-text">
    //       <div
    //         dangerouslySetInnerHTML={{ __html: svgIcons.streak }}
    //         style={{ marginRight: "5px" }}
    //       />
    //       <p>2 Streaks</p>
    //     </div>
    //   </div>

    //   {/* Discount and Button */}
    //   <div className="discount-section">
    //     <div className="circle-progress">
    //       <svg width="100" height="100" viewBox="0 0 100 100">
    //         {/* Background circle */}
    //         <circle
    //           cx="50"
    //           cy="50"
    //           r={radius}
    //           fill="none"
    //           stroke="#f5d8dc"
    //           strokeWidth="12"
    //         />
    //         {/* Progress circle */}
    //         <circle
    //           cx="50"
    //           cy="50"
    //           r={radius}
    //           fill="none"
    //           stroke="#e4a1a9"
    //           strokeWidth="12"
    //           strokeDasharray={circumference}
    //           strokeDashoffset={circumference - progress}
    //           strokeLinecap="round"
    //           transform="rotate(-90 50 50)" // rotate to make progress start from the top
    //         />
    //         <text
    //           x="50%"
    //           y="50%"
    //           dominantBaseline="middle"
    //           textAnchor="middle"
    //           fontSize={fontSize}
    //           fill="#000"
              
    //         >
    //           ★ {taskValue}
    //         </text>
    //       </svg>
    //     </div>
        
    //     <div>
    //       <span style={{fontSize:'40px'}}>
    //         1 out of 4
    //       </span>
    //       <br/>
    //       <span>
    //         Community updates in 7 days
    //       </span>
    //     </div>

    //     <button className="go-button" onClick={onButtonClick}>
    //       Go
    //     </button>
    //   </div>
    // </div>

    <div className="user-card">
      {/* Profile section */}
      <div className="profile-section">
        <h2 style={{ margin: "0" }}>Hi {name}</h2>
        <div className="first-level">
          <div className="name-title">
           
            <p
              style={{ marginBottom: "0", color: "#888" }}
              className="subtitle"
            >
              <span style={{color:'black'}}>Explorer</span>(1200 to Rookie level)
            </p>
          </div>

          {/* Points and Ranking */}

          <div className="status-section">
            <div className="points">
              <p>{points}</p>
              <span>Points</span>
            </div>
            <div className="moments">
              <p>{moments}</p>
              <span>Moments</span>
            </div>
            <div className="ranking">
              <p>
                {ranking}
                <sup>th</sup>
              </p>
              <span>Rank</span>
            </div>
          </div>
        </div>
      </div>

     

      <div className="streak-section">
        <p className="voucher">8 streaks: £20 Amazon voucher</p>
        <div className="icon-text">
          <div
            dangerouslySetInnerHTML={{ __html: svgIcons.streak }}
            style={{ marginRight: "5px" }}
          />
          <p>2 Streaks</p>
        </div>
      </div>

      {/* Discount and Button */}
      <div className="discount-section">
        <div className="circle-progress">
          <svg width="100" height="100" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="#f5d8dc"
              strokeWidth="12"
            />
            {/* Progress circle */}
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
        </div>
        
        <div>
          <span style={{fontSize:'40px'}}>
            1 out of 4
          </span>
          <br/>
          <span>
            Community updates in 7 days
          </span>
        </div>

        <button className="go-button" onClick={onButtonClick}>
          Go
        </button>
      </div>
    </div>
  );
};

export default Card;
