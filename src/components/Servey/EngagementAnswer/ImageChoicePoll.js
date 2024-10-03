import React, { useState, useEffect } from "react";
import svgIcons from "../../../assets/image/SVG/svg";

const ImageChoicePoll = ({ Options, questAnswer, setQuestAnswer }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null); // State to track selected image index
  const [hoveredIndex, setHoveredIndex] = useState(null); // State to track hovered image index

  // Check if ImageChoicePoll already has a selected image when the component mounts
  useEffect(() => {
    if (questAnswer.ImageChoicePoll) {
      const preSelectedIndex = Options.findIndex(
        (option) => option.OptionsImageUrl === questAnswer.ImageChoicePoll
      );
      setSelectedImageIndex(preSelectedIndex); // Set the pre-selected image index
    }
  }, [Options, questAnswer.ImageChoicePoll]);

  const handleImageClick = (index) => {
    // Allow selection only if no image has been selected
    if (selectedImageIndex === null) {
      setSelectedImageIndex(index); // Set the selected image index when clicked
      setQuestAnswer((prev) => ({
        ...prev,
        ImageChoicePoll: Options[index].OptionsImageUrl, // Save the selected image URL in ImageChoicePoll
      }));
    }
  };

  const handleMouseEnter = (index) => {
    // Only allow hover if no image is selected
    if (selectedImageIndex === null) {
      setHoveredIndex(index);
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
          style={{ cursor: selectedImageIndex === null ? 'pointer' : 'default' }} // Disable pointer when an image is selected
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
                    ? svgIcons.selected_star
                    : hoveredIndex === index && selectedImageIndex === null
                    ? svgIcons.hover_star
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
                        selectedImageIndex === index ? '#aee8de' : '#cccece'
                      } ${option.percentage}%, #f9f9f9 ${option.percentage}%)`
                    : undefined,
                borderRadius: '10px',
              }}
            >
              <div
                className="percentage-box"
                style={{
                  color: selectedImageIndex === index ? '#3eb9a3' : 'black', // Set text color based on selection
                }}
              >
                {selectedImageIndex !== null ? `${option.percentage}%` : ''}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageChoicePoll;
