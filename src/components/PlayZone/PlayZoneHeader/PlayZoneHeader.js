import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import svgIcons from "../../../assets/image/SVG/svg";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
const Levels = [
  "Explorer",
  "Rookie",
  "Adventurer",
  "Master",
  "Champion",
  "Legend",
  "Hero",
  "Titan",
  "Native",
  "Super Native",
];

const rewardsIcon = [
  svgIcons.referrals,
  svgIcons.servey,
  svgIcons.UserGenerateContent,
  svgIcons.userActivation,
  svgIcons.userHabit,
  svgIcons.reviewRestimonial,
];

const PlayZoneHeader = ({ width = "100%",maxWidth='375px',email,photoUrl,checkForCharacter,PlayerName }) => {
  const [selectedEarning, setSelectedEarning] = useState("artefact");

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

  const typeOfReward = {
    artefact: ["Referrals", "Survey", "Content"],
    reward: [],
   
  };

  const [current, setCurrent] = useState(0);

  const handleSelectEarning = (earningType) => {
    setSelectedEarning(earningType);
  };

  //api call
  const { token } = useAuth(); // Get email and token from context

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    // Make an API call with the stored email and token
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://dev.api.pitch.space/api/player-level",
          {
            params: {
              email: email,
              token: token,
            },
          }
        );
        if (response.status === 200) {
          setData(response.data);
          console.log("hlw");
        }
      } catch (err) {
        setError("You are not valid");
      }
    };
    if (token) {
      fetchData(); // Only fetch if both email and token are set
    }
  }, [ token, data?.data?.currentLevel]);

  const [currentIndex, setCurrentIndex] = useState(data?.data?.currentLevel);
  const calculateProgress = (currentIndex) => {
    const totalLevels = Levels.length;
    const progressPercentage = (currentIndex / (totalLevels - 1)) * 100;
    return progressPercentage;
  };
  const characterType=data?.data?.featureUsingDetails?.characterType?data?.data?.featureUsingDetails?.characterType:0;
  const avatarPlayer=data?.data?.playerAvatar
  console.log(characterType);
  if(characterType===1){
    checkForCharacter(characterType,avatarPlayer);
  }
  const rankSuf = data?.data?.rank??0;
  return (
    <>
      {characterType===1&&<div style={{marginTop:'140px'}}/>}
      <div style={{
        width,
        maxWidth,
      }}
       className="PlayZoneHeader-top-part">

        {characterType===2 && photoUrl? 
         <img
          src={photoUrl}
          style={{ height: "90px", width: "90px", borderRadius: "50%" }}
        /> : ''
        }


        
        <div>
          {(data?.data?.playerName  || PlayerName) && <p style={{ fontSize: "18px",fontWeight:'700',margin:'0',lineHeight:'22.9px',marginTop:'25px' }}>Hello</p>}
          
          <p style={{ fontSize: "40px",fontWeight:'700',margin:'0',lineHeight:'50px' }}>{data?.data?.playerName?data?.data?.playerName:PlayerName}</p>
        </div>

        {/* it show when character is 1
        {/* <div
          style={{ cursor: "pointer" }}
          dangerouslySetInnerHTML={{ __html: svgIcons.edit }}
        /> */}


      </div>
      
      <div style={{ height: "15px" }} />

      <div className="PlayZoneHeader-slider-level-container">
        <div className="PlayZoneHeader-progressbar-wrapper">
          <div className="PlayZoneHeader-progressbar" style={{ width: "100%" }} />
        </div>
        {data?.data?.currentLevel !== undefined && (
          <Swiper
            key={data?.data?.currentLevel} // Reinitialize Swiper when currentLevel changes
            slidesPerView={4}
            spaceBetween={30}
            centeredSlides={data?.data?.currentLevel}
            initialSlide={data?.data?.currentLevel}
            onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
          >
            {Levels.map((level, index) => (
              <SwiperSlide key={index}>
                <p
                  style={{ whiteSpace:'nowrap'}}
                  className={`PlayZoneHeader-level-text ${
                    data?.data?.currentLevel === index
                      ? "active-level"
                      : "inactive-level"
                  }`}
                >
                  {level}
                </p>
                {index === data?.data?.currentLevel && (
                  <div className="PlayZoneHeader-circle" />
                )}
                {index === data?.data?.currentLevel && (
                  <p className="nextlevel">
                    ({data?.data?.requiredPointToLevelUp} to level up)
                  </p>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>



        <div>
            <div className="PlayZoneHeader-point-text">
              <div className="PlayZoneHeader-points-streak-rank">
                <div className="PlayZoneHeader-point-gap-increase" >
                <span className="PlayZoneHeader-text">Points</span>
                <span style={{marginTop:'6.2px'}} className="PlayZoneHeader-point">{data?.data?.points}</span>
                </div>
              </div>

              <div className="PlayZoneHeader-points-streak-rank">
              <div className="PlayZoneHeader-point-gap-increase">
                <span className="PlayZoneHeader-text">Streaks</span>
                <span style={{marginTop:'6.2px'}} className="PlayZoneHeader-point">{data?.data?.streaks}</span>
              </div>
              </div>

              <div className="PlayZoneHeader-points-streak-rank">
              <div className="PlayZoneHeader-point-gap">
                <span className="PlayZoneHeader-text">Rank</span>
                <span style={{position:'relative',bottom:'-2.3px'}}   className="PlayZoneHeader-point">
                {data?.data?.rank}<sup style={{marginTop:'3px',fontSize:'10px', position: 'relative',left:'-1px'}}>{getOrdinalSuffix(rankSuf)}</sup>
                </span>
                </div>
              </div>

            </div>
          </div>

      <div style={{ height: "15px" }} />

      <div className="quest-name">
        <p
          className={selectedEarning === "artefact" ? "active-earning" : ""}
          onClick={() => handleSelectEarning("artefact")}
        >
          Artefacts ({data?.data?.artefacts})
        </p>
        <p
          className={selectedEarning === "reward" ? "active-earning" : ""}
          onClick={() => handleSelectEarning("reward")}
        >
          Reward (0)
        </p>
       
      </div>
       
      <div style={{ height: "2px" }} />

      <Swiper
        key={data?.data?.currentLevel} // Reinitialize Swiper when currentLevel changes
        slidesPerView={4}
        spaceBetween={12}
        centeredSlides={0}
        style={{cursor:'pointer'}}
        initialSlide={0}
        onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
      >
        {rewardsIcon.map((icon, index) => (
          <SwiperSlide key={index}>
            <div key={index} className="reward-point">
              <div
                style={{ marginTop: "5px" }}
                dangerouslySetInnerHTML={{ __html: icon }}
              />
              <p style={{ margin: "0" }}>x 0</p>
              <p style={{ fontSize: "0.5rem", marginBottom: "2px" }}>
                for sending referrals
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
 
     
    </>
  );
};

export default PlayZoneHeader;
