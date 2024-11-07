import React, { useEffect, useRef, useState } from "react";
import ReferralsQuest from "./ReferralsQuest/ReferralsQuest";
import LeaderBoard from "./LeaderBoard/LeaderBoard";
import SurveyQuest from "./SurveyQuest/SurveyQuest";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import NdugesServeyQuestOverlay from "../Common/NdugesServeyQuestOverlay";
import SurveyQuestion from "./SurveyQuest/SurveyQuestion/SurveyQuestion";
import QuestionModal from "./SurveyQuest/SurveyQuestion/QuestionModal";
import UserHabitQuest from "./UserHabitQuest/UserHabitQuest";
import PlayZoneSvgIcon from "../../assets/image/SVG/PlayZone/PlayZone";
import PlayZoneHeader from "./PlayZoneHeader/PlayZoneHeader";
import Error from "../Common/Error";
import NdugesUserHabitQuestOverlay from "../Common/NdugesUserHabitQuestOverlay";
import NdugesReferralsQuestOverlay from "../Common/NdugesReferralsQuestOverlay";

const PlayZone = ({
  width = "100%",
  maxWidth = "375px",
  handleCloseSuccess,
  email,
  photoUrl,
  erroShowSuccess,
  setErrorShowSuccess,
  PlayerName
}) => {


  const [isOpen, setIsOpen] = useState(true);
  const [userHabitQuest, setUserHabitQuest] = useState([]);
  const [serveyQuest, setServeyQuest] = useState([]);
  const [referralQuest, setReferralQuest] = useState([]);
  const [nodgesType, setNodgesType] = useState(null);
  const [showAll, setShowAll] = useState(false); // State to track whether to show all quests
  const { token } = useAuth(); // Get email and token from context
  const [error, setError] = useState(null);
  const [isServeyClicked, setIsServeyGoClicked] = useState(false);
  const [nudgesClicked, setNudgesClicked] = useState(false);
  const [questId, setQuestId] = useState(null);
  const [reward, setReward] = useState(null);
  const [typeOfQuest, setTypeOfQuest] = useState(null);
  const [completeSurveyQuestion, setCompleteSurveyQuestion] = useState(false);
  const [isFinisedClickedServey, setIsFinisedClickedServey] = useState(null);
  const [isAnswerIsCompleted, setIsAnswerIsCompleted] = useState(false);
  const [playerAvatarBg, setPlayerAvatarBg] = useState(null);
  const [checkCharacterType, setCheckCharacterType] = useState(null);
  const [playerAvatar, setPlayerAvatar] = useState(null);
  const [isErrorClicked, setIsErrorClicked] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [surveyQuestGoBtn, setSurveyQuestGoBtn] = useState(false);
  const [surveyNudgesOverlay,setSurveyNudgesOverlay]=useState(false);
  const [referralsNudgesOverlay,setReferralsNudgesOverlay]=useState(false);
  const [userHabitNuggesOverlay,setUserHabitNuggesOverlay]=useState(false);
  const [userHabitRewardAway,setUserHabitRewardAway]=useState(null);
  const [userHabitStreakAway,setUserHabitStreakAway]=useState(null);
  const [confirmedReferrals,setConfirmedReferrals]=useState(null);
  const [rewardConditionReferrals,setRewardConditionReferrals]=useState(null);
  const [rewardReferrals,setRewardReferrals]=useState(null)
  const [surveyName,setSurveyName]=useState(null)
  const updateScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  // Add event listener to track screen resize
  useEffect(() => {
    window.addEventListener("resize", updateScreenWidth);
    return () => window.removeEventListener("resize", updateScreenWidth);
  }, []);
  console.log("width calculation ", screenWidth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://dev.api.pitch.space/api/quest-for-arcade",
          {
            params: { email, token },
          }
        );

        if (response.status === 200) {
          const quests = response.data.data; // Assuming the data is stored in `data`

          // Filter quests based on questCategory
          const serveyQuests = quests.filter(
            (quest) => quest.questCategory === "Survey Quest"
          );
          const userHabitQuests = quests.filter(
            (quest) => quest.questCategory === "User Habit Quest"
          );
          const referralQuests = quests.filter(
            (quest) => quest.questCategory === "Referral Quest"
          );

          // Update state for each category
          setServeyQuest(serveyQuests);
          setUserHabitQuest(userHabitQuests);
          setReferralQuest(referralQuests);
        }
      } catch (err) {
        setError(err);
      }
    };

    if (token) {
      fetchData(); // Only fetch if both email and token are set
    }
  }, [token,isFinisedClickedServey,setIsFinisedClickedServey]);

  const handleCloseModal = () => {
    handleCloseSuccess();
  };

  const SurveyNameGet = (name)=>{
    setSurveyName(name)
  }

  const checkForCharacter = (character, avatar) => {
    setCheckCharacterType(character);
    setPlayerAvatar(avatar);
  };

  const reward_streak =(streak,reward)=>{
    setUserHabitRewardAway(reward);
    setUserHabitStreakAway(streak)
  }

  const referralsNdugesOverlayConditionData = (confirmedReferrals,rewardCondition,reward) => {
    setConfirmedReferrals(confirmedReferrals)
    setRewardConditionReferrals(rewardCondition);
    setRewardReferrals(reward)
  }

  // Limit the number of quests to show by default
  const MAX_DISPLAY_QUESTS = 6;

  // Merge all quests into one array and limit if showAll is false
  const allQuests = [...userHabitQuest, ...serveyQuest, ...referralQuest];
  const displayedQuests = showAll
    ? allQuests
    : allQuests.slice(0, MAX_DISPLAY_QUESTS);

  if (!isOpen) return null;


  
  const OnCloseServeyOverlay =  () => {
     setIsFinisedClickedServey(false);
     setSurveyNudgesOverlay(false)
  };

  const OnCloseReferralOverlay =  () => {
    setReferralsNudgesOverlay(false)
 };
 
 


  return referralsNudgesOverlay? <NdugesReferralsQuestOverlay 
  email={email}
  questId={questId}
  confirmedReferrals={confirmedReferrals}
  rewardCondition={rewardConditionReferrals}
  reward={rewardReferrals}
  OnCloseReferralOverlay={OnCloseReferralOverlay}
  /> 
   :surveyNudgesOverlay?
  <NdugesServeyQuestOverlay 
    email={email}
    questId={questId}
    OnCloseServeyOverlay={OnCloseServeyOverlay}
  /> : userHabitNuggesOverlay?
   <NdugesUserHabitQuestOverlay
    email={email}
    questId={questId}
    userHabitRewardAway={userHabitRewardAway} 
    userHabitStreakAway={userHabitStreakAway}
    onCloseHabitQuestOverlay={()=>setUserHabitNuggesOverlay(false)}
    />
  :isServeyClicked && screenWidth > 500 ? (
    <SurveyQuestion
      email={email}
      setCompleteSurveyQuestion={setCompleteSurveyQuestion}
      onClose={() => setIsServeyGoClicked(false)}
      setIsFinisedClickedServey={setIsFinisedClickedServey}
      isFinisedClickedServey={isFinisedClickedServey}
      questId={questId}
      setSurveyQuestGoBtn={setSurveyQuestGoBtn}
      photoUrl={photoUrl}
      PlayerName={PlayerName}
      surveyName={surveyName}
    />
  ) : !error ? (
    <div className="playZone-overlay">
      <div
        className={`playZone-modal ${isServeyClicked ? "no-padding" : ""}`}
        style={{
          width,
          maxWidth: isServeyClicked ? "90vw" : "375px",
        }}
      >
        {isAnswerIsCompleted && (
          <QuestionModal
            text="You already play the quest"
            onClose={() => setIsAnswerIsCompleted(false)}
          />
        )}
        {isFinisedClickedServey && (
          <NdugesServeyQuestOverlay
            isFromQuestion="true"
            email={email}
            questId={questId}
            OnCloseServeyOverlay={OnCloseServeyOverlay}
          />
        )}
        {isServeyClicked && screenWidth <= 500 && (
          <SurveyQuestion
            email={email}
            setCompleteSurveyQuestion={setCompleteSurveyQuestion}
            onClose={() => setIsServeyGoClicked(false)}
            setIsFinisedClickedServey={setIsFinisedClickedServey}
            isFinisedClickedServey={isFinisedClickedServey}
            questId={questId}
            surveyName={surveyName}
          />
        )}
       
        {!isServeyClicked && !referralsNudgesOverlay && !isFinisedClickedServey && (
          <>
            <div
              className="top-card"
              style={{
                // backgroundColor:'#9a7eff',
                backgroundImage:
                  checkCharacterType === 1
                    ? `url(https://res.cloudinary.com/pitchspace/image/upload/v1/player-icons/${playerAvatar})`
                    : "",
                backgroundColor: checkCharacterType !== 1 ? "#9a7eff" : "",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                padding: "20px",
                color: "white",
                boxSizing: "border-box",
                width,
                height: checkCharacterType !== 1 ? "" : "600px",
                maxWidth,
              }}
            >
              <div style={{ display: "flex", justifyContent: "end" }}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: PlayZoneSvgIcon.hideButton,
                  }}
                  className="playZone-close-btn"
                  onClick={handleCloseModal}
                />
              </div>
              <PlayZoneHeader
                checkForCharacter={checkForCharacter}
                photoUrl={photoUrl}
                email={email}
                PlayerName={PlayerName}
              />
            </div>

            <div className="playZone-cards">
              <div className="playZone-quest-see">
                <div>
                  <span style={{ fontWeight: "500", fontSize: "20px" }}>
                    Quest{" "}
                  </span>
                  <span
                    style={{
                      fontWeight: "300",
                      fontSize: "20px",
                      color: "rgba(6, 24, 44, 0.8)",
                    }}
                  >
                    ({allQuests.length})
                  </span>
                </div>
                <span
                  className="playZone-see"
                  onClick={() => setShowAll(!showAll)}
                >
                  {allQuests.length>6 && (showAll?"Show less":'See all')}
                  {/* {allQuests.length>5 && showAll?"Show less":'See all'} */}
                  {/* {allQuests.lengthshowAll>5 ?showAll? "Show less" : "See all"} */}
                </span>
              </div>

              {displayedQuests.filter(
                (quest) => quest.questCategory === "User Habit Quest"
              ).length > 0 && (
                <UserHabitQuest
                  userHabitQuest={displayedQuests.filter(
                    (quest) => quest.questCategory === "User Habit Quest"
                  )}
                  setNudgesClicked={setNudgesClicked}
                  setNodgesType={setNodgesType}
                  setTypeOfQuest={setTypeOfQuest}
                  onCloseHabitQuestOverlay
                  setUserHabitNuggesOverlay={setUserHabitNuggesOverlay}
                  reward_streak={reward_streak}
                  setQuestId={setQuestId}
                />
              )}

              {displayedQuests.filter(
                (quest) => quest.questCategory === "Survey Quest"
              ).length > 0 && (
                <div >
                  <SurveyQuest
                  email={email}
                  serveyQuest={displayedQuests.filter(
                    (quest) => quest.questCategory === "Survey Quest"
                  )}
                  setIsServeyGoClicked={setIsServeyGoClicked}
                  setQuestId={setQuestId}
                  setReward={setReward}
                  isAnswerIsCompleted={isAnswerIsCompleted}
                  setIsAnswerIsCompleted={setIsAnswerIsCompleted}
                  surveyQuestGoBtn={surveyQuestGoBtn}
                  surveyNudgesOverlay={surveyNudgesOverlay}
                  setSurveyNudgesOverlay={setSurveyNudgesOverlay}
                  SurveyNameGet={SurveyNameGet}
                />
              </div>
              )}

              {displayedQuests.filter(
                (quest) => quest.questCategory === "Referral Quest"
              ).length > 0 && (
                <ReferralsQuest
                  referralQuest={displayedQuests.filter(
                    (quest) => quest.questCategory === "Referral Quest"
                  )}
                  setNudgesClicked={setNudgesClicked}
                  setReferralsNudgesOverlay={setReferralsNudgesOverlay}
                  setNodgesType={setNodgesType}
                  setTypeOfQuest={setTypeOfQuest}
                  email={email}
                  setQuestId={setQuestId}
                  referralsNdugesOverlayConditionData={referralsNdugesOverlayConditionData}
                />
              )}
              <LeaderBoard email={email} />
            </div>
          </>
        )}
      </div>
    </div>
  ) : (
    erroShowSuccess && (
      <Error
        onCloseError={() => setErrorShowSuccess(false)}
        width={width}
        maxWidth={maxWidth}
      />
    )
  );
};

export default PlayZone;
