



import { useState } from "react";

import Point from "./components/Point/Point";
// import MomentSuccess from "./components/MomentSuccess/MomentSuccess";
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
  const [showSuccess, setShowSuccess] = useState(false);



  const email = 'jahir.rayhan@bedatasolutions.com';
  const token = '4733788f-783d-455f-a2b7-3b1815e53196';
  const img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPUhc8feStsjYKYoW8X7sEQAOzA4Yla1QmGQ&s"
  return (
    <AuthProvider  token={token}>
     {/* <HighlitePlayZoneModal/> */}
     {/* <PlayerCard email={email} Name="" PhotoUrl="https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg"/> */}
     {/* <button onClick={()=>setShowSuccess(true)}>Click me</button> */}
     
      <PlayZone email={email} photoUrl={img}/>
     {/* {showSuccess && <PlayZone handleCloseSuccess={()=>setShowSuccess(false)}/>} */}
      
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



