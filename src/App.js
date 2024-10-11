// import { useState } from "react";

// import Point from "./components/Point/Point";
// import MomentSuccess from "./components/MomentSuccess/MomentSuccess";
// import Card from "./components/PlayerCard/PlayerCard";
// import HighlitePlayZone from "./components/HighlitePlayZoneModal/HighlitePlayZoneModal";
// import HighlitePlayZoneModal from "./components/HighlitePlayZoneModal/HighlitePlayZoneModal";
// function App() {
//   // const [showSuccess, setShowSuccess] = useState(false);

//   // const handleShowSuccess = () => setShowSuccess(true);
//   // const handleCloseSuccess = () => setShowSuccess(false);
//   return (
//     <>
//     {/* <div style={{alignItems:'center',justifyContent:'center',display:'flex',marginTop:'150px',flexDirection:'column',gap:'30px'}}>
//       <button onClick={handleShowSuccess}>Show Success</button>
//       {showSuccess && (
//        <MomentSuccess points={150} onclose={handleCloseSuccess}/>
//       )}
//       <Point/>
//     </div> */}
//     {/* <Card/> */}
//     <HighlitePlayZoneModal/>
//     </>
//   );
// }

// export default App;



import { useState } from "react";

import Point from "./components/Point/Point";
import MomentSuccess from "./components/MomentSuccess/MomentSuccess";
import Card from "./components/PlayerCard/PlayerCard";
import HighlitePlayZone from "./components/HighlitePlayZoneModal/HighlitePlayZoneModal";
import HighlitePlayZoneModal from "./components/HighlitePlayZoneModal/HighlitePlayZoneModal";
import { AuthProvider } from "./context/AuthContext";
import Servey from "./components/Servey/Servey";
import SuccessScreenWihoutReward from "./components/Servey/SuccessScreen/SuccessScreenWihoutReward";
import PlayerCharacterOverlay from "./components/PlayerCard/PlayerCharacterOverlay";
import AlertOverly from "./components/PlayerCard/AlertOverly";

function App() {
  // const [showSuccess, setShowSuccess] = useState(false);

  // const handleShowSuccess = () => setShowSuccess(true);
  // const handleCloseSuccess = () => setShowSuccess(false);


  const email = 'jahir.rayhan@bedatasolutions.com';
  const token = '4733788f-783d-455f-a2b7-3b1815e53196';
  return (
    <AuthProvider email={email} token={token}>
     {/* <HighlitePlayZoneModal/> */}
     {/* <SuccessScreenWihoutReward/> */}
     <Card />
     {/* <AlertOverly/> */}
     {/* <Servey/> */}
     {/* <MomentSuccess/> */}
     {/* <PlayerCharacterOverlay/> */}
    </AuthProvider>
  );
}

export default App;



