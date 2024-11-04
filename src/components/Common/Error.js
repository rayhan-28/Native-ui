import React from "react";
import SurveyQuestSvgIcon from "../../assets/image/SVG/SurveyQuest/SurveyQuestSvgIcon";

const Error = ({ width = "", maxWidth = "" ,onCloseError}) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: '"Soehne", sans-serif',
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          background: "#ffffff",
          width,
          maxWidth,
          borderRadius: "15px",
        }}
      >
        <div
          style={{ marginLeft: "90%", marginBottom: "2%", cursor: "pointer" }}
          onClick={onCloseError}
          dangerouslySetInnerHTML={{ __html: SurveyQuestSvgIcon.cross }}
        />

        <h3>Issue with the KEY</h3>
        <h4>get in touch</h4>
        <h5>get a valid API Key</h5>
      </div>
    </div>
  );
};

export default Error;
