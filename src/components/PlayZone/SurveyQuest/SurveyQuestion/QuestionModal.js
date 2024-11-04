import React from 'react';
import SurveyQuestSvgIcon from '../../../../assets/image/SVG/SurveyQuest/SurveyQuestSvgIcon';

const QuestionModal = ({ onClose ,text,OnCloseCompleteOverlay,}) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
      <div
              onClick={onClose}
              dangerouslySetInnerHTML={{ __html: SurveyQuestSvgIcon.cross }}
              style={{ cursor:'pointer',display:'flex',justifyContent:'flex-end' }}
        />
        <p style={{fontSize:'25px',fontWeight:'bold',margin:'0'}}>Hello</p>
        <p style={{marginBottom:'20px'}}>{text}</p>
        <button className='modal-button' onClick={onClose}>Ok</button>
      </div>
    </div>
  );
};

export default QuestionModal;
