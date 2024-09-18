import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import svgIcons from "../../../assets/image/SVG/svg";
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

const typeOfreward={

   artefact:[

   ],
   reward:[

   ],
   badges:[

   ]

  
}


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

  const NeedPoints = 1200;

  const currentLevel = Levels.indexOf("Rookie");

  const handleSelectEarning = (earningType) => {
    setSelectedEarning(earningType);
  };

  return (
    <>
      <div className="top-part">
        <p style={{ fontSize: "25px" }}>
          Hello
          <br /> <span style={{ fontSize: "45px" }}>Ollie</span>
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
          centeredSlides
          initialSlide={currentLevel}
        >
          {Levels.map((level, index) => (
            <SwiperSlide key={index}>
              <p
                style={{ fontWeight: "bold" }}
                className={`level-text ${
                  currentLevel === index ? "active-level" : "inactive-level"
                }`}
              >
                {level}
              </p>
              {index === currentLevel && <div className="progressbar" />}
              {index === currentLevel && <div className="circle" />}
              {index === currentLevel && (
                <p style={{}} className="nextlevel">
                  (1200 to level up)
                </p>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="point-part">
        <div>
          <span>Points</span>
          <p>1950</p>
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
          Artefacts (28)
        </p>
        <p
          className={selectedEarning === "reward" ? "active-earning" : ""}
          onClick={() => handleSelectEarning("reward")}
        >
          Reward (1)
        </p>
        <p
          className={selectedEarning === "badges" ? "active-earning" : ""}
          onClick={() => handleSelectEarning("badges")}
        >
          Badges (5)
        </p>
      </div>

     
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
    </>
  );
};

export default SliderLevel;
