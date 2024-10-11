// import { DarkRoundedButton, Spacer, Text } from "@components/MyQuests/atoms";
// import {
//   TextOpacity,
//   TextSize,
//   TextWeight,
//   tabletBreakpoint,
// } from "@components/MyQuests/constants";
// import COLOR from "@components/constants/color";
import { useEffect, useRef, useState } from "react";
// import { AlertOverlay } from "@components/MyQuests/organisms";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from 'swiper';
// import "swiper/swiper-bundle.min.css";
// import "swiper/swiper.min.css";
import 'swiper/swiper-bundle.css'
import 'swiper/css'
import 'swiper/scss'
import svgIcons from "../../assets/image/SVG/svg";
import AlertOverly from "./AlertOverly";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
// import "swiper/swiper.scss";
// images
const image1= 'https://res.cloudinary.com/pitchspace/image/upload/v1/player-icons/PlayerCharacter,1'
const image2 = "https://res.cloudinary.com/pitchspace/image/upload/v1/player-icons/PlayerCharacter,2";
const image3 = 'https://res.cloudinary.com/pitchspace/image/upload/v1/player-icons/PlayerCharacter,3'
const image4 = 'https://res.cloudinary.com/pitchspace/image/upload/v1/player-icons/PlayerCharacter,4'
const image5 = 'https://res.cloudinary.com/pitchspace/image/upload/v1/player-icons/PlayerCharacter,5'
const image6 = 'https://res.cloudinary.com/pitchspace/image/upload/v1/player-icons/PlayerCharacter,6'
const image7 = 'https://res.cloudinary.com/pitchspace/image/upload/v1/player-icons/PlayerCharacter,7'
const image8 ='https://res.cloudinary.com/pitchspace/image/upload/v1/player-icons/PlayerCharacter,8';
const image9 = 'https://res.cloudinary.com/pitchspace/image/upload/v1/player-icons/PlayerCharacter,9'
const image10 ='https://res.cloudinary.com/pitchspace/image/upload/v1/player-icons/PlayerCharacter,10'
const image11 = 'https://res.cloudinary.com/pitchspace/image/upload/v1/player-icons/PlayerCharacter,11'

const images = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
  image11,
];

// Initialize Swiper
SwiperCore.use([]);

const PlayerCharacterOverlay = ({
  Player,
  onClose,
  menuButtonIsVisible,
  setShouldRefetch,
}) => {
  const [currentIndex, setCurrentIndex] = useState(
    Player?.playerAvatar ? Number(Player.playerAvatar.split(",")[1]) : 2
  ); // Set initial slide index
  console.log("jahir ",currentIndex)
  const [isCrossButtonClicked, setIsCrossButtonClicked] = useState(false);
  const [isOverlayClicked, setIsOverlayClicked] = useState(false);
  const [backupPlayer, setBackupPlayer] = useState(Player);
  const [swiperInstance, setSwiperInstance] = useState(null);
 

  const handleSlideChange = (swiper) => {
    setCurrentIndex(swiper.realIndex);
    setBackupPlayer({
      ...Player,
      playerAvatar: "PlayerCharacter," + (swiper.realIndex+1),
    });
  };

  const { email, token } = useAuth(); // Get email and token from context
  const [error, setError] = useState(null);

  const onPlayerAvaterSaved = async () => {
    try {
      const response = await axios.post(`https://dev.api.pitch.space/api/player-info?email=${email}&token=${token}`, {
        playerAvatar: backupPlayer.playerAvatar
      });
      if (response.status === 200) {
        setShouldRefetch(true)
      }
   
    } catch (err) {
      setError('You are not valid');
    }
  };


  const handleClick = (index) => {
    if (swiperInstance) {
      swiperInstance.slideToLoop(index, 300, true);
      setCurrentIndex(index);

      setBackupPlayer({
        ...Player,
        playerAvatar: "PlayerCharacter," + index,
      });
    }
  };

  useEffect(() => {
    if (isCrossButtonClicked) {
      setIsOverlayClicked(false);
      setIsCrossButtonClicked(false);
    }
  }, [isCrossButtonClicked, setIsOverlayClicked, setIsCrossButtonClicked]);



  return (
    <div
      className="overlay"
      onClick={() => setIsOverlayClicked(true)}
    >
      {isOverlayClicked && 
        <AlertOverly 
         onCloseClicked={()=> setIsCrossButtonClicked(true)}
         onPrimaryButtonClicked={()=>{
          setIsOverlayClicked(false)
          onClose()
         }}
        />
      }
      
      <div
        className={`wrapper ${!menuButtonIsVisible ? 'centered' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        
        <div style={{ width: '0', height: '5px', flexShrink: 0, flexGrow: 0 }}></div>

        <div className="text-container">
            <p className="text-cheked">
              Select your character
            </p>
        </div>
        <div style={{ width: '0', height: '25px', flexShrink: 0, flexGrow: 0 }}></div>

        <div className="row">
          <Swiper
            onSwiper={setSwiperInstance} // Get swiper instance
            grabCursor={true}
            spaceBetween={80}
            slidesPerView={4}
            centeredSlides={true}
            initialSlide={Player?.playerAvatar ? (Number(Player.playerAvatar.split(",")[1])-1) : 2}
            onSlideChange={handleSlideChange}
            loop={true}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div
                  style={{
                    width:
                      index === currentIndex ||
                      index === currentIndex + 1 ||
                      index === currentIndex + 1
                        ? "220px"
                        : "200px",
                    height: "250px",
                    marginLeft: index === currentIndex ? "-8px" : "0px",
                    boxSizing: "border-box",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() => handleClick(index)}
                >
                  <img
                    key={index}
                    src={image}
                    alt=""
                    style={{
                      width: currentIndex === index ? "250px" : "200px",
                      height: currentIndex === index ? "250px" : "200px",
                      borderRadius: "10px",
                      boxShadow: "0px 4px 30px 0px rgba(69, 69, 69, 0.1)",
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div style={{ width: '0', height: '25px', flexShrink: 0, flexGrow: 0 }}></div>
        <button
         className="btn-player-card"
          isEnabled={true}
          onClick={() => {
            onPlayerAvaterSaved();
            onClose();
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default PlayerCharacterOverlay;
