import React, { useState, useEffect } from "react";
import SurveyQuestSvgIcon from "../../../../../assets/image/SVG/SurveyQuest/SurveyQuestSvgIcon";
import axios from "axios";
import { useAuth } from "../../../../../context/AuthContext";

const ImageChoicePoll = ({
  questId,
  actionId,
  email,
  Options,
  questAnswer,
  idx,
  setQuestAnswer,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null); // State to track selected image index
  const [hoveredIndex, setHoveredIndex] = useState(null); // State to track hovered image index
  const [percentage, setPercentage] = useState(null);
  const [error, setError] = useState(null);
  const [singleQAnswer, setSingleAnswer] = useState({
    TextAnswer: "",
    ImageMultiChoice: "",
    TextMultiChoice: "",
    YesNo: "",
    Rate: "",
    UploadedImage: "",
    ReplyWithLink: "",
    TextChoicePoll: "",
    ImageChoicePoll: "",
  });
  // Check if ImageChoicePoll already has a selected image when the component mounts
  useEffect(() => {
    const updatedAnswers = [...questAnswer];
    if (!updatedAnswers[idx]) {
      updatedAnswers[idx] = { ...singleQAnswer };
      setQuestAnswer(updatedAnswers);
    }
    if (questAnswer[idx]?.ImageChoicePoll) {
      const preSelectedIndex = Options.findIndex(
        (option) => option.OptionsImageUrl === questAnswer[idx]?.ImageChoicePoll
      );
      setSelectedImageIndex(preSelectedIndex); // Set the pre-selected image index
    }
  }, [
    Options,
    questAnswer[idx]?.ImageChoicePoll,
    idx,
    questAnswer,
    setQuestAnswer,
  ]);

  const { token } = useAuth();

  const fetchPercentage = async (optionId) => {
    try {
      console.log("Options Id = ", optionId);
      const response = await axios.get(
        "https://dev.api.pitch.space/api/survey-quest-poll-percentage",
        {
          params: { email, token, questId, actionId, optionId },
        }
      );

      if (response.status === 200) {
        // Filter quests based on questCategory
        const data = response.data.data;
        setPercentage(data);
      }
    } catch (err) {
      setError("You are not valid");
    }
  };

  const handleMouseEnter = (index) => {
    // Only allow hover if no image is selected
    if (selectedImageIndex === null) {
      setHoveredIndex(index);
    }
  };

  
  useEffect(() => {
    if (selectedImageIndex !== null) {
      const optionId = Options[selectedImageIndex]?.OptionsId;
      if (optionId) {
        fetchPercentage(optionId);
      }
    }
  }, [selectedImageIndex, Options, email, token, questId, actionId]);


  const handleImageClick = (index) => {
    // Allow selection only if no image has been selected
    if (selectedImageIndex === null) {
      const optionId = Options[index]?.OptionsId;
      console.log("rayhan ", optionId);
      if (optionId) {
        fetchPercentage(optionId);
      }
      setSelectedImageIndex(index); // Set the selected image index when clicked
      const updatedSingleQAnswer = {
        ...singleQAnswer,
        ImageChoicePoll: Options[index].OptionsImageUrl,
      };
      setSingleAnswer(updatedSingleQAnswer);
      const updatedAnswers = [...questAnswer];
      updatedAnswers[idx] = updatedSingleQAnswer;
      // Set the updated answers back to state
      setQuestAnswer(updatedAnswers);
    }
  };

  const handleMouseLeave = () => {
    // Only reset hovered index if no image is selected
    if (selectedImageIndex === null) {
      setHoveredIndex(null);
    }
  };

  return (
    <div className="multiple-image-slider">
      {Options.map((option, index) => (
        <div
          className="multi-image-item"
          key={index}
          onClick={() => handleImageClick(index)} // Handle image click
          onMouseEnter={() => handleMouseEnter(index)} // Handle hover start
          onMouseLeave={handleMouseLeave} // Handle hover end
          style={{
            cursor: selectedImageIndex === null ? "pointer" : "default",
          }} // Disable pointer when an image is selected
        >
          <div className="multi-image-text">
            <img
              className="multi-image"
              src={`https://res.cloudinary.com/pitchspace/${option.OptionsImageUrl}`}
              alt={option.OptionsText}
            />
            {/* Show the selected star if the image is selected, otherwise show hover star */}
            <div
              className="star-icon"
              dangerouslySetInnerHTML={{
                __html:
                  selectedImageIndex === index
                    ? SurveyQuestSvgIcon.selected_star
                    : hoveredIndex === index && selectedImageIndex === null
                    ? SurveyQuestSvgIcon.hover_star
                    : "", // Show hover star if hovered and no star if neither selected nor hovered
              }}
            />
            <div className="multi-text-handle">
              <p className="description">{option?.OptionsText}</p>
            </div>
            {/* Progress bar and percentage */}
            <div
              className="percentage-container"
              style={{
                background:
                  selectedImageIndex !== null
                    ? `linear-gradient(to right, ${
                        selectedImageIndex === index ? "#aee8de" : "#cccece"
                      } ${
                        percentage ? percentage[Options[index]?.OptionsId] : 0
                      }%, #f9f9f9 ${
                        percentage ? percentage[Options[index]?.OptionsId] : 0
                      }%)`
                    : undefined,
                borderRadius: "10px",
              }}
            >
              <div
                className="percentage-box"
                style={{
                  color: selectedImageIndex === index ? "#3eb9a3" : "black", // Set text color based on selection
                }}
              >
                {selectedImageIndex !== null
                  ? `${percentage ? percentage[Options[index]?.OptionsId] : 0}%`
                  : ""}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageChoicePoll;
