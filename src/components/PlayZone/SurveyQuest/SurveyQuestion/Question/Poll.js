import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../../context/AuthContext";
import axios from "axios";

const Poll = ({
  Options,
  questAnswer,
  idx,
  setQuestAnswer,
  email,
  actionId,
  questId,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
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

 

  const { token } = useAuth();
  useEffect(() => {
    const updatedAnswers = [...questAnswer];

    // Check if the idx position is empty and initialize with singleQAnswer if it is
    if (!updatedAnswers[idx]) {
      updatedAnswers[idx] = { ...singleQAnswer };
      setQuestAnswer(updatedAnswers);
    }
    if (questAnswer[idx]?.TextChoicePoll) {
      const preSelectedIndex = Options.findIndex(
        (option) => option.OptionsText === questAnswer[idx]?.TextChoicePoll
      );
      setSelectedIndex(preSelectedIndex);
    }
  }, [
    Options,
    questAnswer[idx]?.TextChoicePoll,
    idx,
    questAnswer,
    setQuestAnswer,
  ]);

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
  useEffect(() => {
    if (selectedIndex !== null) {
      const optionId = Options[selectedIndex]?.OptionsId;
      if (optionId) {
        fetchPercentage(optionId);
      }
    }
  }, [selectedIndex, Options, email, token, questId, actionId]);
  const handleSelect = (index) => {
    if (selectedIndex === null) {
      const optionId =
        Options && Options[index] ? Options[index].OptionsId : null;

      if (optionId) {
        fetchPercentage(optionId);
      }
      const updatedSingleQAnswer = {
        ...singleQAnswer,
        TextChoicePoll: Options[index].OptionsText,
      };
      setSingleAnswer(updatedSingleQAnswer);
      const updatedAnswers = [...questAnswer];
      updatedAnswers[idx] = updatedSingleQAnswer;
      // Set the updated answers back to state
      setQuestAnswer(updatedAnswers);
      setSelectedIndex(index);
    }
  };
  console.log("percentage ",percentage);

  return (
    <div>
      {Options.map((item, index) => (
        <div
          key={index}
          className={`poll-text ${
            selectedIndex === index ? "selected-box" : ""
          }`}
          onClick={() => handleSelect(index)}
          style={{
            background:
              selectedIndex !== null
                ? `linear-gradient(to right, ${
                    selectedIndex === index ? "#aee8de" : "#cccece"
                  } ${percentage ? percentage[Options[index]?.OptionsId] : 0}%, #f1f2f2 ${
                    percentage ? percentage[Options[index]?.OptionsId] : 0
                  }%)`
                : undefined,
          }}
        >
          <span
            className={`poll-left ${
              selectedIndex === index ? "selected-text" : ""
            }`}
          >
            {item.OptionsText}
          </span>
          {selectedIndex !== null && (
            <span
              className={`poll-right ${
                selectedIndex === index ? "selected-percentage" : ""
              }`}
            >
              {percentage ? percentage[Options[index]?.OptionsId] : 0}%
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Poll;
