import React, { useEffect, useState } from "react";
import svgIcons from "../../assets/image/SVG/svg";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import PlayerCharacterOverlay from "./PlayerCharacterOverlay";
import PlayrCardSvgIcons from "../../assets/image/SVG/PlayerCard/PlayerCardSvg";
import { color } from "@cloudinary/url-gen/qualifiers/background";
import { background } from "@cloudinary/url-gen/qualifiers/focusOn";
import { BackgroundColor } from "@cloudinary/url-gen/actions/background/actions/BackgroundColor";

const PayerCard = ({ profileImg, width = "100%", maxWidth = "335px" }) => {
  const { email, token } = useAuth(); // Get email and token from context
  const [playerData, setPlayerData] = useState(null);
  const [error, setError] = useState(null);
  const [isClicked,setIsClicked]=useState(false)
  const [shouldRefetch, setShouldRefetch] = useState(false); 

  const getOrdinalSuffix = (rank) => {
    if (rank % 10 === 1 && rank % 100 !== 11) {
      return "st";
    } else if (rank % 10 === 2 && rank % 100 !== 12) {
      return "nd";
    } else if (rank % 10 === 3 && rank % 100 !== 13) {
      return "rd";
    } else {
      return "th";
    }
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://dev.api.pitch.space/api/player-info",
        {
          params: { email, token },
        }
      );
      if (response.status === 200) {
        setPlayerData(response.data?.data);
      }
    } catch (err) {
      setError("You are not valid");
    }
  };


  useEffect(() => {
    if (email && token) {
      fetchData(); // Fetch player data initially
    }
  }, [email, token]);

  // Refetch player data when shouldRefetch changes to true
  useEffect(() => {
    if (shouldRefetch) {
      fetchData();
      setShouldRefetch(false); // Reset after refetch
    }
  }, [shouldRefetch]);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const progress = (1 / 4) * circumference;
  const taskValue = 2 * 100;
  const textLength = taskValue.toString().length;
  const fontSize = textLength > 5 ? 16 - (textLength - 5) * 2 : 16;

  // if (error) {
  //   return (
  //     <>
  //       <div className="user-card">
  //         <h4>Please give your credentials</h4>
  //       </div>
  //     </>
  //   );
  // }

   const handleClick=()=>{
    setIsClicked(true)
    console.log("clicked")
    
   }
   console.log(playerData)

  return (
 

    <div
      className="player-card"
      style={{
        width,
        maxWidth:playerData?.featureUsingDetails?.cardWidth,
        fontFamily:playerData?.featureUsingDetails?.fontFamily,
        BackgroundColor:playerData?.featureUsingDetails?.primaryColor
      }}
    >
      {/* top */}
      {isClicked && <PlayerCharacterOverlay Player={playerData} onClose={()=>setIsClicked(false)} setShouldRefetch={setShouldRefetch}/>}
    {error? <h1>Please give correct credentials</h1>:<>  <div className="player-card-top">
       {playerData?.featureUsingDetails?.characterType===1 &&<> <div className="player-card-img">
          <img
            onClick={handleClick}
            src={
              profileImg ||
              `https://res.cloudinary.com/pitchspace/image/upload/v1/player-icons/${playerData?.playerAvatar
              }`
            }
            style={{
              height: "80px",
              width: "80px",
              borderRadius: "50%",
              marginRight: "10px",
              cursor:'pointer'
            }}
          />
          </div> </>
        }
        <div className="player-name-points">
          <div className="player-name-title">
            <span className="palyer-name">Ollie</span>
            <span className="palyer-title">YOUR PROGRESS</span>
          </div>
          <div>
            <div className="player-point-text">
              <div className="player-points-streak-rank">
                <div className="player-point-gap-increase" >
                <span className="player-text">Points</span>
                <span style={{marginTop:'6.2px'}} className="player-point">{playerData?.points}</span>
                </div>
              </div>

              <div className="player-points-streak-rank">
              <div className="player-point-gap-increase">
                <span className="player-text">Streaks</span>
                <span style={{marginTop:'6.2px'}} className="player-point">2</span>
              </div>
              </div>

              <div className="player-points-streak-rank">
              <div className="player-point-gap">
                <span className="player-text">Rank</span>
                <span className="player-point">
                  2<sup style={{marginTop:'3px'}}>{getOrdinalSuffix(2)}</sup>
                </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div className="player-card-middle">
          <p className="player-voucher">
            <span className="scroll-text">
              8 streaks for £20 Amazon voucher progress start
            </span>
          </p>
        
        <div className="streak-icon">
          <div
            dangerouslySetInnerHTML={{ __html: PlayrCardSvgIcons.streak }}
            style={{ marginRight: "5px"}}
          />
          <div style={{fontSize:'12px',fontWeight:'500'}}>2 Streak</div>
        </div>
      </div>
      <div className="player-card-last">
        <div className="circle-progress">
          <svg width="60" height="60" viewBox="0 0 100 100">
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
              y="43%"
              dominantBaseline="middle"
              textAnchor="middle"
              fontSize={22}
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
          <div className="details">
            <p className="details-text">Events joined</p>
           
            <p className="out-of-point">2 out of 4</p>
           
            <p className="time-duration">
              in 7 days(6 days left)
            </p>
          </div>
        </div>
        <div className="player-btn">
          <button className="player-go-button">Go</button>
        </div>
      </div>
      </>}
    </div>
  );
};

export default PayerCard;
