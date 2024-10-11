import React, { useEffect, useState } from "react";
import svgIcons from "../../assets/image/SVG/svg";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import PlayerCharacterOverlay from "./PlayerCharacterOverlay";

const Card = ({ profileImg, width = "100%", maxWidth = "520px" }) => {
  const { email, token } = useAuth(); // Get email and token from context
  const [playerData, setPlayerData] = useState(null);
  const [error, setError] = useState(null);
  const [isClicked,setIsClicked]=useState(false)
  const [isSavedSuccess, setIsSavedSuccess]=useState(false)

 
  useEffect(() => {
    // Make an API call with the stored email and token
    const fetchData = async () => {
      console.log("isSavedSucces", isSavedSuccess)
      try {
        const response = await axios.get(
          "https://dev.api.pitch.space/api/player-info",
          {
            params: {
              email: email,
              token: token,
            },
          }
        );
        console.log(email);
        if (response.status === 200) {
          setPlayerData(response.data?.data);
          console.log("hlw");
        }
      } catch (err) {
        setError("You are not valid");
      }
    };
    if (email && token) {
      fetchData(); // Only fetch if both email and token are set
    }
  }, [email, token, isSavedSuccess, setIsSavedSuccess]);




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
        maxWidth,
      }}
    >
      {/* top */}
      {isClicked && <PlayerCharacterOverlay Player={playerData} onClose={()=>setIsClicked(false)} isSavedSuccess={isSavedSuccess} setIsSavedSuccess={setIsSavedSuccess}/>}
    {error? <h1>Please give correct credentials</h1>:<>  <div className="player-card-top">
        <div className="player-card-img">
          <img
            onClick={handleClick}
            src={
              profileImg ||
              `https://res.cloudinary.com/pitchspace/image/upload/v1/player-icons/${playerData?.playerAvatar
              }`
            }
            style={{
              height: "90px",
              width: "90px",
              borderRadius: "50%",
              marginRight: "10px",
              cursor:'pointer'
            }}
          />
        </div>
        <div className="name-points">
         
             
          
        </div>
      </div>
      <div className="player-card-middle">
       
      </div>
      
      </>}
    </div>
  );
};

export default Card;
