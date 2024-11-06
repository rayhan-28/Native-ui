import React, { useEffect, useState } from "react";
import SurveyQuestSvgIcon from "../../assets/image/SVG/SurveyQuest/SurveyQuestSvgIcon";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const NdugesServeyQuestOverlay = ({
  width = "100%",
  maxWidth = "520px",
  reward,
  OnCloseServeyOverlay,
  isFromQuestion,
  questId,
  email
}) => {

 
  const [playerData, setPlayerData] = useState(null);
    const {token} =useAuth()
  
    const GetPlayerData = async () => {
      try {
        const response = await axios.get(
          "https://dev.api.pitch.space/api/player-info-for-quest",
          {
            params: {
               email, 
               token,
               questId
               },
          }
        );
        if (response.status === 200) {
          setPlayerData(response.data?.data);
        }
      } catch (err) {
        
      }
    };
  
  
    useEffect(() => {
      if (token) {
        GetPlayerData(); // Fetch player data initially
      }
    }, [token]);


  return (
    <div className="success-without-reward-overlay">
      <div
        style={{
          width,
          maxWidth,
        }}
        className="success-without-container"
      >
        <div
          className="close-icon"
          onClick={OnCloseServeyOverlay} // Use the function passed from parent
          dangerouslySetInnerHTML={{ __html: SurveyQuestSvgIcon.cross }}
        />

        {isFromQuestion  ? (
          <div dangerouslySetInnerHTML={{ __html: SurveyQuestSvgIcon.nice }} />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: SurveyQuestSvgIcon.wow }} />
        )}
        {reward && (
          <>
            <p style={{ fontSize: "1.1rem", marginBottom: "0" }}>
              Reward unlocked
            </p>
            <p style={{ fontSize: "1.3rem", marginTop: "0" }}>
              Lorem ipsum dolor sit amet,Conseectuer
            </p>
            <p>How to claim</p>
            <p style={{ color: "rgba(6, 24, 44, 0.7)", fontSize: "0.8rem" }}>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis disap
            </p>
            <p style={{ color: "rgba(6, 24, 44, 0.8)", fontSize: "0.8rem" }}>
              You've collected
            </p>
          </>
        )}

        {!reward && (
          <>
            <p
              style={{
                fontSize: "25px",
                fontWeight: "bold",
                marginTop: "20px",
                marginBottom: "0",
              }}
            >
              Survey Completed
            </p>
            <p style={{}}>Thank you for your time</p>
            <span style={{ fontSize: "0.7rem", marginBottom: "5px" }}>
              With this survey,you've collected
            </span>
          </>
        )}
        <div style={{ display: "flex", gap: "15px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="reward-container">
              <div dangerouslySetInnerHTML={{ __html: SurveyQuestSvgIcon.black_star }} />
              <p style={{ margin: "0" }}>X {playerData?.points}</p>
            </div>
            <p style={{ fontSize: "0.8rem" }}>Points</p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="reward-container">
              <div dangerouslySetInnerHTML={{ __html: SurveyQuestSvgIcon.servey }} />
              <p style={{ margin: "0" }}>X {playerData?.Artifacts}</p>
            </div>
            <p style={{ fontSize: "0.8rem" }}>Artefact</p>
          </div>
        </div>
        <button
          onClick={OnCloseServeyOverlay} 
          style={{ marginTop: "15px" }}
          className="success-without-btn"
        >
          Collect more points
        </button>
        <p style={{ marginTop: "15px", color: "rgba(6, 24, 44, 0.7)" }}>
          Collect more points to unlock amazing rewards!
        </p>
      </div>
    </div>
  );
};

export default NdugesServeyQuestOverlay;
