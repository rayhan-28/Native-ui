import { useState } from "react";
import Point from "./components/Point/Point";
import MomentSuccess from "./components/MomentSuccess/MomentSuccess";
function App() {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleShowSuccess = () => setShowSuccess(true);
  const handleCloseSuccess = () => setShowSuccess(false);
  return (
    <div style={{alignItems:'center',justifyContent:'center',display:'flex',marginTop:'150px',flexDirection:'column',gap:'30px'}}>
      <button onClick={handleShowSuccess}>Show Success</button>
      {showSuccess && (
       <MomentSuccess points={150} onclose={handleCloseSuccess}/>
      )}
      <Point/>
    </div>
  );
}

export default App;
