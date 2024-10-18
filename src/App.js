



import { useState } from "react";

import Point from "./components/Point/Point";
import MomentSuccess from "./components/MomentSuccess/MomentSuccess";
import PlayerCard from "./components/PlayerCard/PlayerCard";

import HighlitePlayZone from "./components/PlayZone/PlayZone";
import HighlitePlayZoneModal from "./components/PlayZone/PlayZone";
import { AuthProvider } from "./context/AuthContext";
import PlayerCharacterOverlay from "./components/PlayerCard/PlayerCharacterOverlay";
import AlertOverly from "./components/PlayerCard/AlertOverly";
import NdugesServeyQuestOverlay from "./components/Common/NdugesServeyQuestOverlay";
import NudgesServey from "./components/Common/NudgesServey";
import SurveyQuestion from "./components/PlayZone/SurveyQuest/SurveyQuestion/SurveyQuestion";
import PlayZone from "./components/PlayZone/PlayZone";
import './App.css';

function App() {
  // const [showSuccess, setShowSuccess] = useState(false);

  // const handleShowSuccess = () => setShowSuccess(true);
  // const handleCloseSuccess = () => setShowSuccess(false);


  const email = 'jahir.rayhan@bedatasolutions.com';
  const token = '4733788f-783d-455f-a2b7-3b1815e53196';
  return (
    <AuthProvider email={email} token={token}>
     {/* <HighlitePlayZoneModal/> */}
     <PlayerCard/>
     {/* <PlayZone/> */}
     
     {/* <AlertOverly/> */}
     {/* <Servey/> */}
     {/* <SurveyQuestion/> */}
     {/* <MomentSuccess/> */}
     {/* <PlayerCharacterOverlay/> */}
     {/* <NdugesServeyQuestOverlay/> */}
     {/* <NudgesServey/> */}
    </AuthProvider>
  );
}

export default App;



