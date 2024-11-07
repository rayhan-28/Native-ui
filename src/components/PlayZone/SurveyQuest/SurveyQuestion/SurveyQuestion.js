import React, { useEffect, useState } from "react";
import SurveyQuestSvgIcon from "../../../../assets/image/SVG/SurveyQuest/SurveyQuestSvgIcon";
import { useAuth } from "../../../../context/AuthContext";
import axios from "axios";
import QuestionModal from "./QuestionModal";
import GiveARate from "./Question/GiveARate";
import ReplyWithTextAnswer from "./Question/ReplyWithTextAnswer";
import ImageMultiChoice from "./Question/ImageMultiChoice";
import YesNoChoice from "./Question/YesNoChoice";
import TextMultiChoice from "./Question/TextMultiChoice";
import UploadImage from "./Question/UploadImage";
import ReplyWithLink from "./Question/ReplyWithLink";
import Poll from "./Question/Poll";
import ImageChoicePoll from "./Question/ImageChoicePoll";

const SurveyQuestion = ({
  width = "100%",
  maxWidth = "100vw",
  onClose,
  questId,
  setIsFinisedClickedServey,
  setSurveyQuestGoBtn,
  email,
  photoUrl,
  PlayerName,
  surveyName,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [linkError, setLinkError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [questionNo, setQuestionNo] = useState(0);
  const [tempQuestion, setTempQuestion] = useState(0);
  const [pointCal, setPointCal] = useState(20);
  const [questAction, setQuestAction] = useState(null);
  const [data, setData] = useState(null);
  const [questAnswer, setQuestAnswer] = useState([]);
  const [playerData, setPlayerData] = useState(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [actionId, setActionId] = useState(null);
  const [finisedAnswerLoading,setFinisedAnswerLoading]=useState(false)
  const updateScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  // Add event listener to track screen resize
  useEffect(() => {
    window.addEventListener("resize", updateScreenWidth);
    return () => window.removeEventListener("resize", updateScreenWidth);
  }, []);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const { token } = useAuth(); // Get email and token from context
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          " https://dev.api.pitch.space/api/survey-quest-questions",
          {
            params: { email, token, questId },
          }
        );

        if (response.status === 200) {
          const quest = response.data.data; // Assuming the data is stored in `data`
          setQuestAction(quest.action);
          setData(quest);
          setActionId(quest.action.ActionId);
          console.log("ActionId1 = ", quest.action.ActionId);
          setQuestionNo(quest?.action?.ActionDetails?.length);
        }
      } catch (err) {
        setError("You are not valid");
      }
    };

    if (token) {
      fetchData(); // Only fetch if both email and token are set
    }
  }, [token]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://dev.api.pitch.space/api/player-info",
        {
          params: {
            email,
            token,
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
    fetchData();
  }, [token]);

  const addPoints = async (data) => {
    try {
      const response = await axios.post(
        `https://dev.api.pitch.space/api/player-info-for-quest?email=${email}&token=${token}&questId=${questId}`,
        {
          points: data,
        }
      );
      if (response.status === 200) {
        setSurveyQuestGoBtn(true);
      }
    } catch (error) {
      throw error;
    }
  };

  const saveQuestion = async (data) => {
    try {
      setFinisedAnswerLoading(true)
      const response = await axios.post(
        `https://dev.api.pitch.space/api/survey-quest-answers?email=${email}&token=${token}&questId=${questId}`,
        {
          questId: questId,
          QuestAnswer: data,
        }
      );
      if(response.status===200){
        setFinisedAnswerLoading(false)
      }
    } catch (error) {
      throw error;
    }
  };

  const sendSurveyAnswers = async () => {
    try {
      await addPoints(questAnswer.length * 20);
      await saveQuestion(questAnswer);
      onClose();
      setIsFinisedClickedServey(true);
    } catch (error) {}
  };
  const isValidUrl = (url) => {
    console.log("check valid link", url);
    const urlPattern = new RegExp(
      "^(https?://)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])?)\\.)+[a-z]{2,}|" + // domain name
        "localhost|" + // localhost
        "\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|" + // IP address
        "\\[?[a-f\\d]*:[a-f\\d:]+)"
    ); // IPv6
    return !!urlPattern.test(url);
  };

  const validateCurrentQuestion = (currentAction) => {
    const { ResponseType } = currentAction;
    console.log("current Action ", currentAction);

    switch (ResponseType.OptionsType) {
      case "Reply with text":
        return questAnswer[tempQuestion]?.TextAnswer !== "";
      case "Give a rate":
        return questAnswer[tempQuestion]?.Rate !== "";
      case "Image multi-choice":
        return questAnswer[tempQuestion]?.ImageMultiChoice !== "";
      case "Yes / No":
        return questAnswer[tempQuestion]?.YesNo !== "";
      case "Text multi-choice":
        return questAnswer[tempQuestion]?.TextMultiChoice !== "";
      case "Upload image":
        return questAnswer[tempQuestion]?.UploadedImage !== "";
      case "Reply with link":
        return questAnswer[tempQuestion]?.ReplyWithLink !== "";
      case "Text Choice Poll":
        return questAnswer[tempQuestion]?.TextChoicePoll !== "";
      case "Image Choice Poll":
        return questAnswer[tempQuestion]?.ImageChoicePoll !== "";
      default:
        return true;
    }
  };

  const handleModal = () => {
    setModalVisible(false);
    setLinkError(false);
  };

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

  const checkForValidation = () => {
    const currentAction = questAction?.ActionDetails[tempQuestion];
    console.log(currentAction);
    if (currentAction?.IsRequired) {
      if (!validateCurrentQuestion(currentAction)) {
        setModalVisible(true);
      } else if (!isValidUrl(questAnswer[tempQuestion].ReplyWithLink) && questAction?.ActionDetails[tempQuestion]?.ResponseType.OptionsType === "Reply with link") {
        setModalVisible(true);
        setLinkError(true);
      } else {
        setTempQuestion(tempQuestion + 1);
        setPointCal((prev) => prev + 20);
      }
    } else if (validateCurrentQuestion(currentAction) && questAction?.ActionDetails[tempQuestion]?.ResponseType.OptionsType === "Reply with link" && !isValidUrl(questAnswer[tempQuestion].ReplyWithLink)) {
      setModalVisible(true);
      setLinkError(true);
    } else {
      setTempQuestion(tempQuestion + 1);
      setPointCal((prev) => prev + 20);
    }
  };

  const checkForValidationForFinish = () => {
    const currentAction = questAction?.ActionDetails[tempQuestion];
    console.log(currentAction);
    if (currentAction?.IsRequired) {
      if (!validateCurrentQuestion(currentAction)) {
        setModalVisible(true);
      } else if (!isValidUrl(questAnswer[tempQuestion].ReplyWithLink) && questAction?.ActionDetails[tempQuestion]?.ResponseType.OptionsType === "Reply with link") {
        setModalVisible(true);
        setLinkError(true);
      } else {
        sendSurveyAnswers()
      }
    } else if (validateCurrentQuestion(currentAction) && questAction?.ActionDetails[tempQuestion]?.ResponseType.OptionsType === "Reply with link" && !isValidUrl(questAnswer[tempQuestion].ReplyWithLink)) {
      setModalVisible(true);
      setLinkError(true);
    } else {
      sendSurveyAnswers()
    }
  };

  const rankSuf = playerData?.rank??0;

  return (
    <>
      <div className="Survey-question-overlay">
        <div
          style={{
            borderRadius: "20px",
            backgroundColor: "#FFFFFF",
            width,
            maxWidth,
          }}
        >
          <div>
            <div
              style={{
                padding: screenWidth > 500 ? "50px 50px 10px 150px" : "20px",
                boxSizing: "border-box",
              }}
              className="servery-container"
            >
              <div className="first-part">
                <div className="icon-name">
                  <img
                    className="profile-img"
                    src={`https://res.cloudinary.com/pitchspace/${data?.profileImage}`}
                  />
                {data?.action?.ThumbnailPartnerImage && <img
                    className="profile-img"
                    src={`https://res.cloudinary.com/pitchspace/${data?.action?.ThumbnailPartnerImage}`}
                  />}  
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ color: "#06182CB2" }}>{surveyName}</span>
                    <div>
                      <span style={{ fontSize: "0.8rem", color: "#06182C66" }}>
                        {data?.idName} {data?.action?.ThumbnailPartnerName?'with ':'' }
                      </span>
                      {data?.action?.ThumbnailPartnerLink ? (
                        <span
                          onClick={() =>
                            window.open(data?.action?.ThumbnailPartnerLink)
                          }
                          style={{
                            fontSize: "0.8rem",
                            color: "#06182C66",
                            textDecoration: data?.action?.ThumbnailPartnerLink
                              ? "underline"
                              : "",
                          }}
                        >
                          {data?.action?.ThumbnailPartnerName}
                        </span>
                      ) : (
                        <span
                          style={{
                            fontSize: "0.8rem",
                            color: "#06182C66",
                          }}
                        >
                          {data?.action?.ThumbnailPartnerName}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  onClick={onClose}
                  dangerouslySetInnerHTML={{ __html: SurveyQuestSvgIcon.cross }}
                  style={{ marginRight: "10px", cursor: "pointer" }}
                />
              </div>
              {screenWidth > 500 ? (
                <>
                  <div style={{ display: "flex", columnGap: "30px" }}>
                    <div
                      style={{
                        minWidth: "250px",
                        height: "120px",
                        background: "#FFFFFF",
                        borderRadius: "10px",
                        padding: "12px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          columnGap: "10px",
                        }}
                      >
                        {playerData?.featureUsingDetails?.characterType === 2 &&
                        photoUrl ? (
                          <img
                            src={photoUrl}
                            style={{
                              height: "40px",
                              width: "40px",
                              borderRadius: "50%",
                            }}
                          />
                        ) : playerData?.featureUsingDetails?.characterType ===
                          1 ? (
                          <img
                            src={`https://res.cloudinary.com/pitchspace/image/upload/v1/player-icons/${playerData?.playerAvatar}`}
                            style={{
                              height: "40px",
                              width: "40px",
                              borderRadius: "50%",
                            }}
                          />
                        ) : null}

                        <p
                          style={{
                            margin: "0",
                            fontSize: "22px",
                            fontWeight: "500",
                            color: "#06182C",
                          }}
                        >
                          {PlayerName}
                        </p>
                      </div>
                      <p
                        style={{
                          margin: "0",
                          paddingTop: "5px",
                          fontSize: "10px",
                          fontWeight: "500",
                          color: "#06182C80",
                        }}
                      >
                        PLAYER PROGRESS
                      </p>
                      <div>
                        <div className="survey-point-text">
                          <div className="survey-points-streak-rank">
                            <div className="survey-point-gap-increase">
                              <span className="survey-text">Points</span>
                              <span
                                style={{ marginTop: "6.2px" }}
                                className="survey-point"
                              >
                                {playerData?.points}
                              </span>
                            </div>
                          </div>

                          <div className="survey-points-streak-rank">
                            <div className="survey-point-gap-increase">
                              <span className="survey-text">Streaks</span>
                              <span
                                style={{ marginTop: "6.2px" }}
                                className="survey-point"
                              >
                                {playerData?.streaks ?? 0}
                              </span>
                            </div>
                          </div>

                          <div className="survey-points-streak-rank">
                            <div className="survey-point-gap">
                              <span className="survey-text">Rank</span>
                              <span style={{position:'relative',bottom:'-2.3px'}} className="survey-point">
                                {playerData?.rank}
                                <sup style={{marginTop:'3px',fontSize:'10px', position: 'relative',left:'-1px' }}>
                                  {getOrdinalSuffix(rankSuf)}
                                </sup>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        paddingRight: "10%",
                        width: "100%",
                        maxHeight: "calc(100vh - 220px)",
                        overflowY: "auto",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          marginBottom: "20px",
                          alignItems: "center",
                          marginTop: "2px",
                          columnGap: "15px",
                        }}
                      >
                        <div className="progress-bar">
                          <div
                            className="left-progress"
                            style={{
                              width: `${
                                ((tempQuestion + 1) / questionNo) * 100
                              }%`,
                              height: "10px",
                              backgroundColor: "black",
                            }}
                          >
                            .
                          </div>
                          <div
                            style={{ marginLeft: "-5px", marginBottom: "-2px" }}
                            dangerouslySetInnerHTML={{
                              __html: SurveyQuestSvgIcon.progress_icon,
                            }}
                          />
                        </div>
                        <div style={{ display: "flex" }}>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: SurveyQuestSvgIcon.stardust,
                            }}
                            style={{ marginRight: "7px", marginLeft: "" }}
                          />
                          <span>
                            {pointCal}/{20 * questionNo}
                          </span>
                        </div>
                      </div>
                      <div className="text-section">
                        <div style={{ display: "flex" }}>
                          <p className="text-one">
                            {tempQuestion + 1}.{" "}
                            {questAction?.ActionDetails?.length > tempQuestion
                              ? questAction?.ActionDetails[tempQuestion]
                                  ?.ResponseType?.Title
                              : ""}
                          </p>
                          {questAction?.ActionDetails?.length > tempQuestion
                            ? questAction?.ActionDetails[tempQuestion]
                                ?.IsRequired && (
                                <span
                                  style={{
                                    marginLeft: "5px",
                                    fontWeight: "900",
                                  }}
                                >
                                  *
                                </span>
                              )
                            : ""}
                        </div>
                        <div>
                          <p
                            className={`text-two ${
                              isExpanded ? "expanded" : ""
                            }`}
                          >
                            {questAction?.ActionDetails?.length > tempQuestion
                              ? questAction?.ActionDetails[tempQuestion]
                                  ?.ResponseType?.Description
                              : ""}
                          </p>
                        </div>
                        <div style={{ display: "flex", justifyContent: "end" }}>
                          <p
                            style={{
                              color: "#06182C80",
                              margin: "0",
                              textDecoration: "underline",
                              cursor: "pointer",
                            }}
                            onClick={toggleText}
                          >
                            {isExpanded ? "Show less" : "Read all"}
                          </p>
                        </div>
                      </div>

                      <div className="link-part">
                        <p
                          onClick={() =>
                            window.open(
                              questAction?.ActionDetails?.length > tempQuestion
                                ? questAction?.ActionDetails[tempQuestion]
                                    ?.ResponseType?.VideoLink
                                : ""
                            )
                          }
                        >
                          Watch video
                        </p>
                        <p
                          onClick={() =>
                            window.open(
                              questAction?.ActionDetails?.length > tempQuestion
                                ? questAction?.ActionDetails[tempQuestion]
                                    ?.ResponseType?.ReferenceLink
                                : ""
                            )
                          }
                        >
                          View link
                        </p>
                      </div>

                      {questAction?.ActionDetails?.length > tempQuestion &&
                        questAction?.ActionDetails[tempQuestion]?.ResponseType
                          .OptionsType === "Reply with text" && (
                          <ReplyWithTextAnswer
                            questAnswer={questAnswer}
                            idx={tempQuestion}
                            setQuestAnswer={setQuestAnswer}
                          />
                        )}

                      {questAction?.ActionDetails?.length > tempQuestion &&
                        questAction?.ActionDetails[tempQuestion]?.ResponseType
                          .OptionsType === "Give a rate" && (
                          <GiveARate
                            questAnswer={questAnswer}
                            idx={tempQuestion}
                            setQuestAnswer={setQuestAnswer}
                          />
                        )}

                      {questAction?.ActionDetails?.length > tempQuestion &&
                        questAction?.ActionDetails[tempQuestion]?.ResponseType
                          .OptionsType === "Image multi-choice" && (
                          <ImageMultiChoice
                            Options={
                              questAction?.ActionDetails[tempQuestion]
                                ?.ResponseType.Options
                            }
                            questAnswer={questAnswer}
                            setQuestAnswer={setQuestAnswer}
                            idx={tempQuestion}
                            IsRequired={
                              questAction?.ActionDetails[tempQuestion]
                                ?.IsRequired
                            }
                            IsMultiSelection={
                              questAction?.ActionDetails[tempQuestion]
                                ?.IsMultiSelection
                            }
                            MaxSelectionOrUpload={
                              questAction?.ActionDetails[tempQuestion]
                                ?.MaxSelectionOrUpload
                            }
                          />
                        )}

                      {questAction?.ActionDetails?.length > tempQuestion &&
                        questAction?.ActionDetails[tempQuestion]?.ResponseType
                          .OptionsType === "Yes / No" && (
                          <YesNoChoice
                            questAnswer={questAnswer}
                            idx={tempQuestion}
                            setQuestAnswer={setQuestAnswer}
                          />
                        )}

                      {questAction?.ActionDetails?.length > tempQuestion &&
                        questAction?.ActionDetails[tempQuestion]?.ResponseType
                          .OptionsType === "Text multi-choice" && (
                          <TextMultiChoice
                            Options={
                              questAction?.ActionDetails[tempQuestion]
                                ?.ResponseType.Options
                            }
                            questAnswer={questAnswer}
                            setQuestAnswer={setQuestAnswer}
                            idx={tempQuestion}
                            IsMultiSelection={
                              questAction?.ActionDetails[tempQuestion]
                                ?.IsMultiSelection
                            }
                            MaxSelectionOrUpload={
                              questAction?.ActionDetails[tempQuestion]
                                ?.MaxSelectionOrUpload
                            }
                          />
                        )}
                      {questAction?.ActionDetails?.length > tempQuestion &&
                        questAction?.ActionDetails[tempQuestion]?.ResponseType
                          .OptionsType === "Upload image" && (
                          <UploadImage
                            uploadedImg={
                              questAction?.ActionDetails[tempQuestion]
                                ?.MaxSelectionOrUpload
                            }
                            questAnswer={questAnswer}
                            setQuestAnswer={setQuestAnswer}
                            email={email}
                            idx={tempQuestion}
                            IsMultiSelection={
                              questAction?.ActionDetails[tempQuestion]
                                ?.IsMultiSelection
                            }
                            MaxSelectionOrUpload={
                              questAction?.ActionDetails[tempQuestion]
                                ?.MaxSelectionOrUpload
                            }
                          />
                        )}
                      {questAction?.ActionDetails?.length > tempQuestion &&
                        questAction?.ActionDetails[tempQuestion]?.ResponseType
                          .OptionsType === "Reply with link" && (
                          <ReplyWithLink
                            questAnswer={questAnswer}
                            idx={tempQuestion}
                            setQuestAnswer={setQuestAnswer}
                          />
                        )}

                      {questAction?.ActionDetails?.length > tempQuestion &&
                        questAction?.ActionDetails[tempQuestion]?.ResponseType
                          .OptionsType === "Text Choice Poll" && (
                          <Poll
                            questId={questId}
                            actionId={actionId}
                            Options={
                              questAction?.ActionDetails[tempQuestion]
                                ?.ResponseType.Options
                            }
                            questAnswer={questAnswer}
                            idx={tempQuestion}
                            setQuestAnswer={setQuestAnswer}
                            email={email}
                          />
                        )}
                      {questAction?.ActionDetails?.length > tempQuestion &&
                        questAction?.ActionDetails[tempQuestion]?.ResponseType
                          .OptionsType === "Image Choice Poll" && (
                          <ImageChoicePoll
                            questId={questId}
                            actionId={actionId}
                            email={email}
                            questAnswer={questAnswer}
                            Options={
                              questAction?.ActionDetails[tempQuestion]
                                ?.ResponseType.Options
                            }
                            setQuestAnswer={setQuestAnswer}
                            idx={tempQuestion}
                          />
                        )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-section">
                    <div style={{ display: "flex" }}>
                      <p className="text-one">
                        {questAction?.ActionDetails?.length > tempQuestion
                          ? questAction?.ActionDetails[tempQuestion]
                              ?.ResponseType?.Title
                          : ""}
                      </p>
                      {questAction?.ActionDetails?.length > tempQuestion
                        ? questAction?.ActionDetails[tempQuestion]
                            ?.IsRequired && (
                            <span
                              style={{ marginLeft: "5px", fontWeight: "900" }}
                            >
                              *
                            </span>
                          )
                        : ""}
                    </div>
                    <div>
                      <p className={`text-two ${isExpanded ? "expanded" : ""}`}>
                        {questAction?.ActionDetails?.length > tempQuestion
                          ? questAction?.ActionDetails[tempQuestion]
                              ?.ResponseType?.Description
                          : ""}
                      </p>
                    </div>
                    <div style={{ display: "flex", justifyContent: "end" }}>
                      <p
                        style={{
                          color: "#06182C80",
                          margin: "0",
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                        onClick={toggleText}
                      >
                        {isExpanded ? "Show less" : "Read all"}
                      </p>
                    </div>
                  </div>
                  <div className="link-part">
                    <p
                      onClick={() =>
                        window.open(
                          questAction?.ActionDetails?.length > tempQuestion
                            ? questAction?.ActionDetails[tempQuestion]
                                ?.ResponseType?.VideoLink
                            : ""
                        )
                      }
                    >
                      Watch video
                    </p>
                    <p
                      onClick={() =>
                        window.open(
                          questAction?.ActionDetails?.length > tempQuestion
                            ? questAction?.ActionDetails[tempQuestion]
                                ?.ResponseType?.ReferenceLink
                            : ""
                        )
                      }
                    >
                      View link
                    </p>
                  </div>

                  {questAction?.ActionDetails?.length > tempQuestion &&
                    questAction?.ActionDetails[tempQuestion]?.ResponseType
                      .OptionsType === "Reply with text" && (
                      <ReplyWithTextAnswer
                        questAnswer={questAnswer}
                        idx={tempQuestion}
                        setQuestAnswer={setQuestAnswer}
                      />
                    )}

                  {questAction?.ActionDetails?.length > tempQuestion &&
                    questAction?.ActionDetails[tempQuestion]?.ResponseType
                      .OptionsType === "Give a rate" && (
                      <GiveARate
                        questAnswer={questAnswer}
                        idx={tempQuestion}
                        setQuestAnswer={setQuestAnswer}
                      />
                    )}

                  {questAction?.ActionDetails?.length > tempQuestion &&
                    questAction?.ActionDetails[tempQuestion]?.ResponseType
                      .OptionsType === "Image multi-choice" && (
                      <ImageMultiChoice
                        Options={
                          questAction?.ActionDetails[tempQuestion]?.ResponseType
                            .Options
                        }
                        questAnswer={questAnswer}
                        setQuestAnswer={setQuestAnswer}
                        idx={tempQuestion}
                        IsRequired={
                          questAction?.ActionDetails[tempQuestion]?.IsRequired
                        }
                        IsMultiSelection={
                          questAction?.ActionDetails[tempQuestion]
                            ?.IsMultiSelection
                        }
                        MaxSelectionOrUpload={
                          questAction?.ActionDetails[tempQuestion]
                            ?.MaxSelectionOrUpload
                        }
                      />
                    )}

                  {questAction?.ActionDetails?.length > tempQuestion &&
                    questAction?.ActionDetails[tempQuestion]?.ResponseType
                      .OptionsType === "Yes / No" && (
                      <YesNoChoice
                        questAnswer={questAnswer}
                        idx={tempQuestion}
                        setQuestAnswer={setQuestAnswer}
                      />
                    )}

                  {questAction?.ActionDetails?.length > tempQuestion &&
                    questAction?.ActionDetails[tempQuestion]?.ResponseType
                      .OptionsType === "Text multi-choice" && (
                      <TextMultiChoice
                        Options={
                          questAction?.ActionDetails[tempQuestion]?.ResponseType
                            .Options
                        }
                        questAnswer={questAnswer}
                        setQuestAnswer={setQuestAnswer}
                        idx={tempQuestion}
                        IsMultiSelection={
                          questAction?.ActionDetails[tempQuestion]
                            ?.IsMultiSelection
                        }
                        MaxSelectionOrUpload={
                          questAction?.ActionDetails[tempQuestion]
                            ?.MaxSelectionOrUpload
                        }
                      />
                    )}
                  {questAction?.ActionDetails?.length > tempQuestion &&
                    questAction?.ActionDetails[tempQuestion]?.ResponseType
                      .OptionsType === "Upload image" && (
                      <UploadImage
                        uploadedImg={
                          questAction?.ActionDetails[tempQuestion]
                            ?.MaxSelectionOrUpload
                        }
                        questAnswer={questAnswer}
                        setQuestAnswer={setQuestAnswer}
                        email={email}
                        idx={tempQuestion}
                        IsMultiSelection={
                          questAction?.ActionDetails[tempQuestion]
                            ?.IsMultiSelection
                        }
                        MaxSelectionOrUpload={
                          questAction?.ActionDetails[tempQuestion]
                            ?.MaxSelectionOrUpload
                        }
                      />
                    )}
                  {questAction?.ActionDetails?.length > tempQuestion &&
                    questAction?.ActionDetails[tempQuestion]?.ResponseType
                      .OptionsType === "Reply with link" && (
                      <ReplyWithLink
                        questAnswer={questAnswer}
                        idx={tempQuestion}
                        setQuestAnswer={setQuestAnswer}
                      />
                    )}

                  {questAction?.ActionDetails?.length > tempQuestion &&
                    questAction?.ActionDetails[tempQuestion]?.ResponseType
                      .OptionsType === "Text Choice Poll" && (
                      <Poll
                        Options={
                          questAction?.ActionDetails[tempQuestion]?.ResponseType
                            .Options
                        }
                        questAnswer={questAnswer}
                        idx={tempQuestion}
                        setQuestAnswer={setQuestAnswer}
                        questId={questId}
                        actionId={actionId}
                        email={email}
                      />
                    )}
                  {questAction?.ActionDetails?.length > tempQuestion &&
                    questAction?.ActionDetails[tempQuestion]?.ResponseType
                      .OptionsType === "Image Choice Poll" && (
                      <ImageChoicePoll
                        questAnswer={questAnswer}
                        questId={questId}
                        actionId={actionId}
                        email={email}
                        Options={
                          questAction?.ActionDetails[tempQuestion]?.ResponseType
                            .Options
                        }
                        setQuestAnswer={setQuestAnswer}
                        idx={tempQuestion}
                      />
                    )}
                </>
              )}
            </div>
          </div>

          <div className="last-part" style={{ padding: "20px" }}>
            {screenWidth <= 500 && (
              <>
                <div className="progress-bar">
                  <div
                    className="left-progress"
                    style={{
                      width: `${((tempQuestion + 1) / questionNo) * 100}%`,
                      height: "10px",
                      backgroundColor: "black",
                    }}
                  >
                    .
                  </div>
                  <div
                    style={{ marginLeft: "-5px", marginBottom: "-2px" }}
                    dangerouslySetInnerHTML={{
                      __html: SurveyQuestSvgIcon.progress_icon,
                    }}
                  />
                </div>

                <div style={{ display: "flex" }}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: SurveyQuestSvgIcon.stardust,
                    }}
                    style={{ marginRight: "7px", marginLeft: "" }}
                  />
                  <span>
                    {pointCal}/{20 * questionNo}
                  </span>
                </div>
              </>
            )}

            {/* circle arrow */}
            <div className="arrow">
              {tempQuestion === 0 && (
                <div
                  style={{ backgroundColor: "rgba(6, 24, 44, 0.05)" }}
                  className="left-arrow"
                >
                  <div
                    style={{ marginTop: "3.5px" }}
                    dangerouslySetInnerHTML={{
                      __html: SurveyQuestSvgIcon.left_arrow,
                    }}
                  />
                </div>
              )}
              {tempQuestion > 0 && tempQuestion < questionNo && (
                <div
                  onClick={() => {
                    setTempQuestion(tempQuestion - 1);
                    setPointCal((prev) => prev - 20);
                  }}
                  className="left-arrow"
                >
                  <div
                    style={{ color: "black", marginTop: "3.5px" }}
                    dangerouslySetInnerHTML={{
                      __html: SurveyQuestSvgIcon.left_arrow,
                    }}
                  />
                </div>
              )}
              {tempQuestion === questionNo - 1 && (
                <div className="finish">
                  <button
                    onClick={checkForValidationForFinish}
                    className="finish"
                  >{finisedAnswerLoading?"Saving...":'Finish'}</button>
                </div>
              )}

              {tempQuestion < questionNo && tempQuestion !== questionNo - 1 && (
                <div onClick={checkForValidation} className="right-arrow">
                  <div
                    style={{ marginTop: "3.5px" }}
                    dangerouslySetInnerHTML={{
                      __html: SurveyQuestSvgIcon.right_arrow,
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        {modalVisible && !linkError && (
          <QuestionModal
            text="You have to answer this question"
            onClose={() => {
              setModalVisible(false);
            }}
          />
        )}
        {modalVisible && linkError && (
          <QuestionModal
            text="You have to given valid link"
            onClose={handleModal}
          />
        )}
      </div>
    </>
  );
};

export default SurveyQuestion;
