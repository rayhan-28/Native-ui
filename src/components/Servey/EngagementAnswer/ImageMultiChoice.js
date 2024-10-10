import React, { useEffect, useState } from 'react';
import svgIcons from '../../../assets/image/SVG/svg';

const ImageMultiChoice = ({ Options, questAnswer, setQuestAnswer, idx, IsMultiSelection, MaxSelectionOrUpload }) => {
  const [selectedImages, setSelectedImages] = useState([]); // State to track selected image URLs
  const [hoveredIndex, setHoveredIndex] = useState(null); // State to track hovered image index
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
 
  // Step 1: Initialize selectedImages from questAnswer.ImageMultiChoice on component mount
  useEffect(() => {
    const updatedAnswers = [...questAnswer];
    
    // Check if the idx position is empty and initialize with singleQAnswer if it is
    if (!updatedAnswers[idx]) {
      updatedAnswers[idx] = { ...singleQAnswer };
      setQuestAnswer(updatedAnswers);
    }
    if (questAnswer[idx]?.ImageMultiChoice) {
      // Split the ImageMultiChoice string into an array if it contains URLs
      const selectedUrls = questAnswer[idx].ImageMultiChoice.split(',');
      setSelectedImages(selectedUrls);
    }
  }, [questAnswer,idx,setQuestAnswer,singleQAnswer]);

  const handleImageClick = (url) => {
    setSelectedImages((prevSelected) => {
      let updatedSelection=[...prevSelected];
      if (!IsMultiSelection) {
        if (prevSelected.includes(url)) {
          //  updatedSelection = prevSelected.filter((selectedUrl) => selectedUrl !== url);
          // setQuestAnswer({ ...questAnswer, ImageMultiChoice: updatedSelection.join(',') });
          // return updatedSelection;
          updatedSelection = [];
        } else {
          // setQuestAnswer({ ...questAnswer, ImageMultiChoice: url });
          // return [url];
          updatedSelection = [url];
        }
      } else {
        if (prevSelected.includes(url)) {
           updatedSelection = prevSelected.filter((selectedUrl) => selectedUrl !== url);
          // setQuestAnswer({ ...questAnswer, ImageMultiChoice: updatedSelection.join(',') });
          // return updatedSelection;
        } else if (prevSelected.length < MaxSelectionOrUpload) {
             updatedSelection = [...prevSelected, url];
            // setQuestAnswer({ ...questAnswer, ImageMultiChoice: updatedSelection.join(',') });
            // return updatedSelection;
        }
        else{
          return prevSelected;
        }
      }
      
     
    const updatedSingleQAnswer={...singleQAnswer,ImageMultiChoice:updatedSelection.join(',')}
    setSingleAnswer(updatedSingleQAnswer)
    setTimeout(() => {
      const updatedAnswers = [...questAnswer];
      updatedAnswers[idx] = updatedSingleQAnswer;
      setQuestAnswer(updatedAnswers);
    }, 0);

      return  updatedSelection;
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
