



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
  const [erroShowSuccess,setErrorShowSuccess]=useState(false);
  const handleshow=()=>{
    setShowSuccess(true);
    setErrorShowSuccess(true);
   }

  const email = 'jahir.rayhan@bedatasolutions.com';
  const token = '4733788f-783d-455f-a2b7-3b1815e53196';
  const img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPUhc8feStsjYKYoW8X7sEQAOzA4Yla1QmGQ&s"
  return (
    <AuthProvider  token={token}>
     {/* <HighlitePlayZoneModal/> */}
     
     <button onClick={handleshow}>Click me</button>
     
      {/* <PlayZone  photoUrl={img}/> */}
      <div style={{width:'600px',height:'500px',backgroundColor:'gray',marginBottom:'20px'}}>

      </div>
      <div style={{display:'flex',gap:'40px'}}>
          <div style={{width:'160px',height:'160px',backgroundColor:'teal'}}>

          </div>
          <PlayerCard email={email} Name="Rayhan" PhotoUrl=""/>
      </div>
      
     {showSuccess &&
      <PlayZone email={email} 
      erroShowSuccess={erroShowSuccess} 
      setErrorShowSuccess={setErrorShowSuccess}
      handleErrorClose={()=>setErrorShowSuccess(false)}
      handleCloseSuccess={()=>setShowSuccess(false)}
      PlayerName="Olle"
      photoUrl={img}
      />}
      
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



