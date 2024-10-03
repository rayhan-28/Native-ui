import React, { useEffect, useState } from 'react';
import svgIcons from '../../../assets/image/SVG/svg';

const ImageMultiChoice = ({ Options, questAnswer, setQuestAnswer, IsRequired, IsMultiSelection, MaxSelectionOrUpload }) => {
  const [selectedImages, setSelectedImages] = useState([]); // State to track selected image URLs
  const [hoveredIndex, setHoveredIndex] = useState(null); // State to track hovered image index

  // Step 1: Initialize selectedImages from questAnswer.ImageMultiChoice on component mount
  useEffect(() => {
    if (questAnswer.ImageMultiChoice) {
      // Split the ImageMultiChoice string into an array if it contains URLs
      const selectedUrls = questAnswer.ImageMultiChoice.split(',');
      setSelectedImages(selectedUrls);
    }
  }, [questAnswer.ImageMultiChoice]);

  const handleImageClick = (url) => {
    setSelectedImages((prevSelected) => {
      if (!IsMultiSelection) {
        if (prevSelected.includes(url)) {
          const updatedSelection = prevSelected.filter((selectedUrl) => selectedUrl !== url);
          setQuestAnswer({ ...questAnswer, ImageMultiChoice: updatedSelection.join(',') });
          return updatedSelection;
        } else {
          setQuestAnswer({ ...questAnswer, ImageMultiChoice: url });
          return [url];
        }
      } else {
        if (prevSelected.includes(url)) {
          const updatedSelection = prevSelected.filter((selectedUrl) => selectedUrl !== url);
          setQuestAnswer({ ...questAnswer, ImageMultiChoice: updatedSelection.join(',') });
          return updatedSelection;
        } else {
          if (prevSelected.length < MaxSelectionOrUpload) {
            const updatedSelection = [...prevSelected, url];
            setQuestAnswer({ ...questAnswer, ImageMultiChoice: updatedSelection.join(',') });
            return updatedSelection;
          }
        }
      }
      return prevSelected;
    });
  };

  return (
    <div className="slider-container">
      <div className="slider">
        {Options.map((option, index) => {
          const isSelected = selectedImages.includes(option.OptionsImageUrl); // Check if current image URL is selected

          return (
            <div 
              key={index}
              onClick={() => handleImageClick(option.OptionsImageUrl)} 
              className="image-item"
              onMouseEnter={() => setHoveredIndex(index)} 
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className='image-text'>
                <img
                  className="image"
                  src={`https://res.cloudinary.com/pitchspace/${option.OptionsImageUrl}`} 
                  alt={`Option ${index}`}
                />
                <div
                  className="star-icon"
                  dangerouslySetInnerHTML={{
                    __html:
                      isSelected // Show selected star for selected images
                        ? svgIcons.selected_star 
                        : hoveredIndex === index 
                        ? svgIcons.hover_star // Show hover star on hover
                        : ''
                  }}
                />
                <div className='text-handle'>
                  <p className="description">{option.OptionsText}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageMultiChoice;
