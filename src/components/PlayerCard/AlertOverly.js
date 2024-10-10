import React from "react";
import svgIcons from "../../assets/image/SVG/svg";

const AlertOverly = ({
  title,
  message,
  primaryActionTitle,
  onClose,
  onCloseAlert,
  secondaryActionTitle,
  onPrimaryButtonClicked,
  onSecondaryButtonClicked,
  onCloseClicked,
}) => {
  return (
    <div className="alert-overlay">
      <div className="wrapper-aterl-overly">
        <div
          onClick={onCloseClicked}
          className="close-btn"
          dangerouslySetInnerHTML={{ __html: svgIcons.cross }}
          style={{ cursor: "pointer" }}
        />
        <h1 style={{color:'rgba(6, 24, 44, 1)',fontSize:'30px',marginTop:'10px'}}>Are you sure to close now?</h1>
        <p>Changes that you made will not be saved</p>
        <div className="btn-container">
           <button className="btn-player-card" onClick={onPrimaryButtonClicked}>Ok</button>
        </div>
      </div>
    </div>
  );
};

export default AlertOverly;
