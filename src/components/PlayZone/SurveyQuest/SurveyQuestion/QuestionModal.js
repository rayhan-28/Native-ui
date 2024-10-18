import React from 'react';
import svgIcons from '../../../../assets/image/SVG/svg';
// import './QuestionModal.css'; // Assuming you will create some CSS for styling

const QuestionModal = ({ onClose ,text,OnCloseCompleteOverlay,}) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
      <div
              onClick={onClose}
              dangerouslySetInnerHTML={{ __html: svgIcons.cross }}
              style={{ marginRight: "10px", cursor:'pointer',display:'flex',justifyContent:'flex-end' }}
        />
        <p style={{fontSize:'25px',fontWeight:'bold'}}>Hello</p>
        <p>{text}</p>
        <button className='modal-button' onClick={onClose}>Ok</button>
      </div>
    </div>
  );
};

export default QuestionModal;
