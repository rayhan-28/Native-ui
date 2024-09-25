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


const SliderLevel = () => {

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
    badges: [],
  };

  const [current, setCurrent] = useState(0);

  const handleSelectEarning = (earningType) => {
    setSelectedEarning(earningType);
  };

  
  //api call
  const { email, token } = useAuth();  // Get email and token from context

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
    useEffect(() => {
      // Make an API call with the stored email and token
      const fetchData = async () => {
          try {
              const response = await axios.get('https://dev.api.pitch.space/api/player-level', {
                params: {
                  email: email,
                  token: token
              }
              });
              console.log(email)
              if (response.status === 200) {
                  console.log(response.data)
                  setData(response.data);
                  console.log("hlw")
              }
          } catch (err) {
              setError('You are not valid');
          }
      };
      if (email && token) {
          fetchData();  // Only fetch if both email and token are set
      }
  }, [email, token]);
 console.log(data)
  return (
    <>
      <div className="top-part">
        <img 
        src={`https://res.cloudinary.com/pitchspace/image/upload/v1/player-icons/${data?.data?.playerAvatar}`}
        style={{height:'60px',width:'60px',borderRadius:'50%'}}
        />
        <p style={{ fontSize: "20px" }}>
          Hello
          <br /> <span style={{ fontSize: "35px" }}>{data?.data?.playerName}</span>
        </p>
        <div
          style={{ cursor: "pointer" }}
          dangerouslySetInnerHTML={{ __html: svgIcons.edit }}
        />
      </div>
      <div className="slider-level-container">
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          centeredSlides={Levels[data?.data?.currentLevel]}
          initialSlide={data?.data?.currentLevel}
        >
          {Levels.map((level, index) => (
            <SwiperSlide key={index}>
              <p
                style={{ fontWeight: "bold" }}
                className={`level-text ${
                  data?.data?.currentLevel === index ? "active-level" : "inactive-level"
                }`}
              >
                {level}
              </p>
              {index === data?.data?.currentLevel && <div className="progressbar"/>}
              {index === data?.data?.currentLevel && <div className="circle" />}
              {index === data?.data?.currentLevel && (
                <p style={{}} className="nextlevel">
                  ({data?.data?.requiredPointToLevelUp} to level up)
                </p>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="point-part">
        <div>
          <span>Points</span>
          <p>{data?.data?.points}</p>
        </div>
        <div>
          <span>Streaks</span>
          <p>1950</p>
        </div>
        <div>
          <span>Rank</span>
          <p>
            4<sup>{getOrdinalSuffix(4)}</sup>
          </p>
        </div>
      </div>
      
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
        <p
          className={selectedEarning === "badges" ? "active-earning" : ""}
          onClick={() => handleSelectEarning("badges")}
        >
          Badges (0)
        </p>
      </div>

      <div className="rewards-box-container">

      
      <div className="rewards-boxes">
      {typeOfReward[selectedEarning].length > 0 ?(
        rewardsIcon.map((icon,index)=>(
          <div key={index} className="reward-point">
          <div style={{marginTop:'5px'}} dangerouslySetInnerHTML={{ __html: icon }} />
          <p style={{margin:'0'}}>x 1</p>
          <p style={{fontSize:'0.5rem',marginBottom:'2px'}}>for sending referrals</p>
        </div>
        ))
      ):(
       
        <p>No data available for {selectedEarning}.</p>
      )}
        </div>
      </div>
    </>
  );
};

export default SliderLevel;
