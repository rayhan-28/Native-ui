import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import PlayerCharacterOverlay from "./PlayerCharacterOverlay";
import PlayrCardSvgIcons from "../../assets/image/SVG/PlayerCard/PlayerCardSvg";
import Error from "../Common/Error";
import NugesUserHabib from "../Common/NugesUserHabit";
import NdugesUserHabitQuestOverlay from "../Common/NdugesUserHabitQuestOverlay";

const PayerCard = ({  width = "100%", maxWidth = "335px",Name="",PhotoUrl="",email="" }) => {
  const {token } = useAuth(); // Get email and token from context
  const [playerData, setPlayerData] = useState(null);
  const [error, setError] = useState(null);
  const [isClicked,setIsClicked]=useState(false)
  const [shouldRefetch, setShouldRefetch] = useState(false); 
  const [scroll, setScroll] = useState(false);
  const [userHabitFromPlayerCard,setUserHabitFromPlayerCard]=useState(false);
  
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
          params: {
             email, 
             token
             },
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
    if (token) {
      fetchData(); // Fetch player data initially
    }
  }, [token]);

  // Refetch player data when shouldRefetch changes to true
  useEffect(() => {
    if (shouldRefetch) {
      fetchData();
      setShouldRefetch(false); // Reset after refetch
    }
  }, [shouldRefetch]);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const progressBar = ( playerData?.habitQuest?.progress/ 100) * circumference;
  const taskValue = parseInt(playerData?.habitQuest?.points);
  const textLength = taskValue.toString().length;
  const fontSize = textLength > 5 ? 16 - (textLength - 5) * 2 : 16;

   
  const handleRedirect = (redirectUrl) => {
    if (redirectUrl) {
      window.location.href = redirectUrl; // Redirect to the URL
    } else {
      console.error('No URL to redirect');
    }
  };

   const handleClick=()=>{
    setIsClicked(true)
    console.log("clicked")
    
   }
   
   //for reward sliding
   useEffect(()=>{
    const timer = setTimeout(()=>{
      setScroll(true);
    },500)
    return ()=>clearTimeout(timer)
   },[])

  return (
 

    <div
    className="player-card"
    style={{
      width,
      maxWidth,
      minHeight:'200px'
    }}
  >
    {/* top */}
    {isClicked && <PlayerCharacterOverlay email={email} Player={playerData} onClose={()=>setIsClicked(false)} setShouldRefetch={setShouldRefetch}/>}
    {userHabitFromPlayerCard && <NdugesUserHabitQuestOverlay onCloseHabitQuestOverlay={()=>setUserHabitFromPlayerCard(false)} />}
  {error? 
  <Error/>
  :<>  <div className="player-card-top">
      {PhotoUrl && playerData?.featureUsingDetails?.characterType === 2 ? 
      <div className="player-card-img">
      <img
        src={PhotoUrl}
        style={{
          height: "80px",
          width: "80px",
          borderRadius: "50%",
          marginRight: "10px",
          cursor:'pointer'
        }}
      />
    </div>
      : playerData?.featureUsingDetails?.characterType === 1  ? <div className="player-card-img">
        <img
          onClick={handleClick}
          src={
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
      </div> : null
      }
      <div className="player-name-points">
        <div className="player-name-title">
          <span className="palyer-name">{Name ? Name : playerData?.playerName}</span>
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
              <span  className="player-point">
                2<sup style={{marginTop:'3px'}}>{getOrdinalSuffix(2)}</sup>
              </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <div className="player-card-middle">
    <div className="player-voucher">
      <span className={`text ${scroll?"scroll-active":""}`}>
      {playerData?.habitQuest?.rewardCondition}: {playerData?.habitQuest?.reward}
      </span>
    </div>
      
      <div className="streak-icon">
        {playerData?.habitQuest?.completedStreak===0?<div
          dangerouslySetInnerHTML={{ __html: PlayrCardSvgIcons.empty_streak }}
          style={{ marginRight: "5px",marginTop:'3px'}}
        />: <div
          dangerouslySetInnerHTML={{ __html: PlayrCardSvgIcons.streak }}
          style={{ marginRight: "5px",marginTop:'3px'}}
        />}
        <div style={{fontSize:'12px',fontWeight:'500'}}>{(playerData?.habitQuest?.completedStreak)} Streak</div>
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
            strokeDashoffset={circumference - progressBar}
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
          <p className="details-text">{playerData?.habitQuest?.actionName}</p>
         
          <p className="out-of-point">{playerData?.habitQuest?.playTimesInCurrentStreak} out of {playerData?.habitQuest?.completionTarget.split(' ',1)}
          </p>
         
          <p className="time-duration">
            in {playerData?.habitQuest?.targetDay} days({playerData?.habitQuest?.dayLeftToQuestEnd} days left)
          </p>
        </div>
      </div>
      <div className="player-btn">
        <button className="player-go-button" onClick={()=>handleRedirect(playerData?.habitQuest?.redirectUrl)} >Go</button>
      </div>
    </div>
    <div style={{height:'10px'}}/>
    {playerData?.habitQuest?.streakAway===0 && playerData?.habitQuest?.rewardAway===0 && playerData?.habitQuest?.completedStreak===0 ? null:
        <NugesUserHabib
          streakAway = {playerData?.habitQuest?.streakAway}
          rewardAway = {playerData?.habitQuest?.rewardAway}
          fromPlayer="true"
          setUserHabitNuggesOverlay={setUserHabitFromPlayerCard}
        />}
    </>}
  </div>
  );
};

export default PayerCard;
