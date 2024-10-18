import React from "react";
import svgIcons from "../../assets/image/SVG/svg";
import PlayrCardSvgIcons from "../../assets/image/SVG/PlayerCard/PlayerCardSvg";

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
      <div className="wrapper-alert-overly">
        <div
          onClick={onCloseClicked}
          className="close-btn"
          dangerouslySetInnerHTML={{ __html: PlayrCardSvgIcons.cross }}
          style={{ cursor: "pointer" }}
        />
        <div style={{color:'rgba(6, 24, 44, 1)',fontSize:'30px',marginTop:'10px'}}>Are you sure to close now?</div>
        <p>Changes that you made will not be saved</p>
        <div className="btn-container">
           <div className="player-card-alert-btn" onClick={onPrimaryButtonClicked}>Ok</div>
        </div>
      </div>
    </div>
  );
};

export default AlertOverly;
