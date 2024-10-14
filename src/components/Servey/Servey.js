import React, { useEffect, useState } from "react";
import svgIcons from "../../assets/image/SVG/svg";
import ReplyWithTextAnswer from "./EngagementAnswer/ReplyWithTextAnswer";
import GiveARate from "./EngagementAnswer/GiveARate";
import ImageMultiChoice from "./EngagementAnswer/ImageMultiChoice";
import YesNoChoice from "./EngagementAnswer/YesNoChoice";
import TextMultiChoice from "./EngagementAnswer/TextMultiChoice";
import UploadImage from "./EngagementAnswer/UploadImage";
import ReplyWithLink from "./EngagementAnswer/ReplyWithLink";
import Poll from "./EngagementAnswer/Poll";
import ImageChoicePoll from "./EngagementAnswer/ImageChoicePoll";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import QuestionModal from "./QuestionModal";
import LinkModal from "./LinkModal";
import Nudges from "../Common/Nudges";

const Servey = ({ width = "100%", 
   maxWidth = "100%",
   onClose, 
   questId,
   isFinisedClickedServey,
   setIsFinisedClickedServey,
  }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [linkError,setLinkError]=useState(false)
  const [isExpanded, setIsExpanded] = useState(false);
  const [questionNo, setQuestionNo] = useState(0);
  const [tempQuestion,setTempQuestion]=useState(0);
  const [pointCal,setPointCal]=useState(20)
  const [questAction, setQuestAction] = useState(null);
  const [data,setData]=useState(null)
  const [questAnswer, setQuestAnswer] = useState([]);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };
  
  console.log("questId ",questId)

  const { email, token } = useAuth(); // Get email and token from context
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(' https://dev.api.pitch.space/api/survey-quest-questions', {
          params: { email, token,questId }
        });

        if (response.status === 200) {
          const quest = response.data.data; // Assuming the data is stored in `data`
          setQuestAction(quest.action);
          setData(quest)
          setQuestionNo(quest?.action?.ActionDetails?.length)
        }
      } catch (err) {
        setError('You are not valid');
      }
    };

    if (email && token) {
      fetchData(); // Only fetch if both email and token are set
    }
  }, [email, token]);

  const addPoints=async(data)=>{
    try {
      const response = await axios.post(`https://dev.api.pitch.space/api/player-info-for-quest?email=${email}&token=${token}&questId=${questId}`,
        {
          points:data
        }
    )
    } catch (error) {
      throw error;
    }
  }

  const sendSurveyAnswers = async () => {
    try {
       await addPoints((questAnswer.length*20));
       onClose();
       setIsFinisedClickedServey(true);
    } catch (error) {
      
    }   
  };
 
 

  const validateCurrentQuestion = (currentAction) => {
    const { ResponseType } = currentAction;
    console.log(currentAction)
    const isValidUrl = (url) => {
      console.log("check valid link",url)
      const urlPattern = new RegExp('^(https?://)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])?)\\.)+[a-z]{2,}|' + // domain name
        'localhost|' + // localhost
        '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|' + // IP address
        '\\[?[a-f\\d]*:[a-f\\d:]+)'); // IPv6
      return !!urlPattern.test(url);
    };

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
        return questAnswer[tempQuestion]?.ReplyWithLink !== "" && isValidUrl(questAnswer[tempQuestion]?.ReplyWithLink);
      case "Text Choice Poll":
        return questAnswer[tempQuestion]?.TextChoicePoll !== "";
      case "Image Choice Poll":
        return questAnswer[tempQuestion]?.ImageChoicePoll !== "";
      default:
        return true;
    }
  };
  const handleModal=()=>{
    setModalVisible(false);
    setLinkError(false)
  }

  console.log("questAnswer ",questAnswer);
  return ( 
   <>
  
   <div className="servey">
       <div style={{ backgroundColor: "#FFFFFF", width, maxWidth }}>
        <div className="servery-container">
          <div className="first-part">
            <div className="icon-name">
              <img 
              className="profile-img"
              src={`https://res.cloudinary.com/pitchspace/${data?.profileImage}`}
              />
              <img
              className="profile-img"
              
               src={`https://res.cloudinary.com/pitchspace/${data?.action?.ThumbnailPartnerImage}`}
              />
              <div  style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ color: "#06182CB2" }}>Servey name</span>
                <div>
                <span style={{ fontSize: "0.8rem", color: "#06182C66" }}>
                  {data?.idName} with {}
                </span>
                {data?.action?.ThumbnailPartnerLink ? 
                <span 
                  onClick={()=>window.open(
                    data?.action?.ThumbnailPartnerLink
                  )}
                  style={{
                    fontSize: "0.8rem",
                     color: "#06182C66",
                     textDecoration:data?.action?.ThumbnailPartnerLink?'underline':""}}>
                  {data?.action?.ThumbnailPartnerName} 
                  </span>:<span 
                  
                  style={{
                    fontSize: "0.8rem",
                     color: "#06182C66",
                    }}>
                  {data?.action?.ThumbnailPartnerName} 
                  </span>}
                </div>
              </div>
            </div>
            <div
              onClick={onClose}
              dangerouslySetInnerHTML={{ __html: svgIcons.cross }}
              style={{ marginRight: "10px", cursor:'pointer' }}
            />
          </div>
          <div className="text-section">
            <div style={{display:'flex'}}>
            <p className="text-one">
              { questAction?.ActionDetails?.length>tempQuestion ? questAction?.ActionDetails[tempQuestion]?.ResponseType?.Title : ""}
            </p>
            {questAction?.ActionDetails?.length>tempQuestion ? 
            questAction?.ActionDetails[tempQuestion]?.IsRequired 
            && <span style={{marginLeft:'5px',fontWeight:'900'}}> *</span> :''}
            </div>
            <div>
              <p className={`text-two ${isExpanded ? "expanded" : ""}`}>
              {questAction?.ActionDetails?.length>tempQuestion ? questAction?.ActionDetails[tempQuestion]?.ResponseType?.Description : ""}

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
            <p onClick={()=>window.open(
              questAction?.ActionDetails?.length>tempQuestion ? questAction?.ActionDetails[tempQuestion]?.ResponseType?.VideoLink : ""

              
            )}>Watch video</p>
            <p
             onClick={()=>window.open(

              questAction?.ActionDetails?.length>tempQuestion ? questAction?.ActionDetails[tempQuestion]?.ResponseType?.ReferenceLink : ""

             )}
            >View link</p>
          </div>
         
         {questAction?.ActionDetails?.length>tempQuestion 
         && questAction?.ActionDetails[tempQuestion]?.ResponseType.OptionsType === "Reply with text" 
         && <ReplyWithTextAnswer questAnswer={questAnswer} idx={tempQuestion} setQuestAnswer={setQuestAnswer}/>}

         {questAction?.ActionDetails?.length>tempQuestion 
         && questAction?.ActionDetails[tempQuestion]?.ResponseType.OptionsType === "Give a rate"
         &&<GiveARate questAnswer={questAnswer} idx={tempQuestion}  setQuestAnswer={setQuestAnswer}/>}


         {questAction?.ActionDetails?.length>tempQuestion 
         && questAction?.ActionDetails[tempQuestion]?.ResponseType.OptionsType === "Image multi-choice" 
         && <ImageMultiChoice 
         Options={questAction?.ActionDetails[tempQuestion]?.ResponseType.Options}
         questAnswer={questAnswer}
         setQuestAnswer={setQuestAnswer}
         
         idx={tempQuestion}
         IsRequired={questAction?.ActionDetails[tempQuestion]?.IsRequired}
         IsMultiSelection={questAction?.ActionDetails[tempQuestion]?.IsMultiSelection}
         MaxSelectionOrUpload={questAction?.ActionDetails[tempQuestion]?.MaxSelectionOrUpload}
         />}

         {questAction?.ActionDetails?.length>tempQuestion 
         && questAction?.ActionDetails[tempQuestion]?.ResponseType.OptionsType === "Yes / No" 
         && <YesNoChoice questAnswer={questAnswer} idx={tempQuestion}  setQuestAnswer={setQuestAnswer}/>}

         {questAction?.ActionDetails?.length>tempQuestion 
         && questAction?.ActionDetails[tempQuestion]?.ResponseType.OptionsType === "Text multi-choice" 
         && <TextMultiChoice
          Options={questAction?.ActionDetails[tempQuestion]?.ResponseType.Options}
          questAnswer={questAnswer}
          setQuestAnswer={setQuestAnswer}
         
          idx={tempQuestion}
          IsMultiSelection={questAction?.ActionDetails[tempQuestion]?.IsMultiSelection}
          MaxSelectionOrUpload={questAction?.ActionDetails[tempQuestion]?.MaxSelectionOrUpload}
         />}
         {questAction?.ActionDetails?.length>tempQuestion 
         && questAction?.ActionDetails[tempQuestion]?.ResponseType.OptionsType === "Upload image" 
         && <UploadImage
         uploadedImg={questAction?.ActionDetails[tempQuestion]?.MaxSelectionOrUpload}
         questAnswer={questAnswer}
         setQuestAnswer={setQuestAnswer}
         
         idx={tempQuestion}
         IsMultiSelection={questAction?.ActionDetails[tempQuestion]?.IsMultiSelection}
        MaxSelectionOrUpload={questAction?.ActionDetails[tempQuestion]?.MaxSelectionOrUpload}
         />}
         {questAction?.ActionDetails?.length>tempQuestion
          && questAction?.ActionDetails[tempQuestion]?.ResponseType.OptionsType === "Reply with link" 
          && <ReplyWithLink questAnswer={questAnswer} idx={tempQuestion} setQuestAnswer={setQuestAnswer}/>}

         {questAction?.ActionDetails?.length>tempQuestion 
         && questAction?.ActionDetails[tempQuestion]?.ResponseType.OptionsType === "Text Choice Poll" 
         && <Poll
         Options={questAction?.ActionDetails[tempQuestion]?.ResponseType.Options}
         questAnswer={questAnswer}
         idx={tempQuestion}
         setQuestAnswer={setQuestAnswer}
         />}
        {questAction?.ActionDetails?.length>tempQuestion 
        && questAction?.ActionDetails[tempQuestion]?.ResponseType.OptionsType === "Image Choice Poll" 
        && <ImageChoicePoll questAnswer={questAnswer}
        Options={questAction?.ActionDetails[tempQuestion]?.ResponseType.Options}
        setQuestAnswer={setQuestAnswer}
        idx={tempQuestion}
        />}

        </div>
        <div className="last-part" style={{ padding: "20px" }}>
          
          <div className="progress-bar">
             
            <div
            className="left-progress"
              style={{ width: `${((tempQuestion+1) /questionNo) * 100}%`, height: '10px',  backgroundColor: 'black'}}
            >.</div>
            <div style={{marginLeft:'-5px'}} dangerouslySetInnerHTML={{ __html: svgIcons.progress_icon }} />
          </div>
         
          <div style={{ display: "flex" }}>
            <div
              dangerouslySetInnerHTML={{ __html: svgIcons.stardust }}
              style={{ marginRight: "7px", marginLeft: "" }}
            />
            <span>{pointCal}/{20*questionNo}</span>
          </div>

          {/* circle arrow */}
          <div className="arrow">
            {tempQuestion===0 && <div style={{backgroundColor:'rgba(6, 24, 44, 0.05)'}} className="left-arrow">
              <div  dangerouslySetInnerHTML={{ __html: svgIcons.left_arrow }} />
            </div>}
            {tempQuestion>0 && tempQuestion<questionNo && 
            <div 
            onClick={()=> {
              setTempQuestion(tempQuestion-1);
              setPointCal(prev => prev - 20);
            }} 
            className="left-arrow">
              <div 
                style={{color:'black'}}
                dangerouslySetInnerHTML={{ __html: svgIcons.left_arrow }} 
              />
            </div>}
            {tempQuestion===questionNo-1 && <div className="finish">
               <button onClick={()=>sendSurveyAnswers()} className="finish">Finish</button>
            </div>}

            {tempQuestion < questionNo && tempQuestion !== questionNo - 1 && (
              <div
                onClick={() => {
                  const currentAction = questAction?.ActionDetails[tempQuestion];
                  console.log("labib clicked")
                  console.log(currentAction)
                  if ((currentAction?.IsRequired || questAction?.ActionDetails[tempQuestion]?.ResponseType.OptionsType === "Reply with link" ) && !validateCurrentQuestion(currentAction)) {
                    // Handle validation failure

                    console.log("hey this is labib")
                    const isValidUrl = (url) => {
                      console.log("check valid link",url)
                      const urlPattern = new RegExp('^(https?://)?' + // protocol
                        '((([a-z\\d]([a-z\\d-]*[a-z\\d])?)\\.)+[a-z]{2,}|' + // domain name
                        'localhost|' + // localhost
                        '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|' + // IP address
                        '\\[?[a-f\\d]*:[a-f\\d:]+)'); // IPv6
                      return !!urlPattern.test(url);
                    };
                    console.log(questAnswer.ReplyWithLink)
                    if(questAnswer[tempQuestion].ReplyWithLink.length>0 && !isValidUrl(questAnswer[tempQuestion].ReplyWithLink)){
                      console.log("lsdjfsdjfljsdljfljsdlfjlsdkjf")
                     setLinkError(true);
                    }
                    setModalVisible(true)
                    
                  }
                  else{
                    setTempQuestion(tempQuestion + 1);
                    setPointCal(prev => prev + 20);
                  }
                  
                }}
                className="right-arrow"
              >
                <div dangerouslySetInnerHTML={{ __html: svgIcons.right_arrow }} />
              </div>
            )}

            
          </div>
        </div>
      </div>
      {modalVisible && !linkError &&(
        <QuestionModal text="You have to answer this question"   onClose={()=>{setModalVisible(false)}}/>
      )}
      {modalVisible && linkError &&(
        <QuestionModal text="You have to given valid link"   onClose={handleModal}/>
      )}
      
    </div>
    
    </>
  );
};

export default Servey;
