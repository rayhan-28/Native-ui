

import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import axios from "axios";

const Leaderboard = ({width='100%',maxWidth='375px',email}) => {
  const [leaderboardData, setLeaderBoardData] = useState([]);
  const [myRowData, setMyRowData] = useState(null); // Store the row that contains the email field
  const {  token } = useAuth();
  const [error, setError] = useState(null);
  const [showExtraUserRow, setShowExtraUserRow] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://dev.api.pitch.space/api/leader-board",
          {
            params: {
              email: email,
              token: token,
            },
          }
        );

        if (response.status === 200) {
          let leaderboard = response.data.data;

          // Sort by points in descending order
          leaderboard.sort((a, b) => b.points - a.points);

          // Add rank to each player
          leaderboard = leaderboard.map((player, index) => ({
            ...player,
            rank: index + 1,
          }));

          // Find the row that has the `email` field and store that row
          const myRow = leaderboard.find((player) => player._id===email);

          // If such a row is found, store it in `myRowData`
          if (myRow) {
            setMyRowData(myRow);
          }

          // Determine if we need to show the user's row separately based on rank
          setShowExtraUserRow(myRow && myRow.rank > 4);

          setLeaderBoardData(leaderboard);
        }
      } catch (err) {
        setError("You are not valid");
        console.error("Error fetching leaderboard:", err);
      }
    };

    if ( token) {
      fetchData(); // Only fetch if both email and token are set
    }
  }, [token]);
  console.log(myRowData)
  const maxHeight = myRowData && myRowData.rank > 4 ? "230px" : "300px";

  return (
    <div style={{width,maxWidth}} className="leaderboard-table-container">
      {error && <div className="error">{error}</div>}{" "}
      {/* Display any error message */}
      {/* Main leaderboard table */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <p style={{fontSize:'20px',fontWeight:'500'}}>Champions <span style={{fontSize:'20px',fontWeight:'300'}}>({leaderboardData.length})</span></p>
        <div style={{display:'flex',gap:'10px'}}>
          <p style={{fontSize:'14px',fontWeight:'400',color:'#06182C80',textDecoration:'underline'}}>Find me</p>
          <p style={{fontSize:'14px',fontWeight:'400',color:'#06182C80',textDecoration:'underline'}}>Go to top</p>
        </div>
      </div>
      <div
        style={{ maxHeight: maxHeight, overflowY: "auto", display: "block" }}
      >
        <table className="leaderboard-table">
          <thead style={{marginBottom:'12px'}}>
            <tr >
              <th >Rank</th>
              <th>Player</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((player, index) => (
              <tr
                key={index}
                style={{
                  display: "table",
                  width: "100%",
                  tableLayout: "fixed",
                  backgroundColor:player?.rank===myRowData?.rank?'#ffffff':'#f9f9f9'
                }}
              >
                <td style={{paddingLeft:'10px',fontSize:'14px',fontWeight:'500'}}>{player?.rank}.</td>
                <td>
                  <div className="player-info">
                    <img
                      src={player?.playerAvatar.split(',').length===2?`https://res.cloudinary.com/pitchspace/image/upload/v1/player-icons/${player?.playerAvatar}`:player?.playerAvatar}
                      className="player-avatar"
                    />
                    {player?.rank===myRowData?.rank?<span title={player?.playerName}>You ({player?.playerName})</span>:
                      <span style={{fontSize:'16px',fontWeight:'500',color:'#06182C'}} title={player?.playerName}>{player?.playerName}</span>
                    }
                  </div>
                </td>
                <td>
                  <span style={{fontSize:'16px',fontWeight:'500',color:'#06182C99'}} title={player?.points}>{player?.points}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Second table to show only the row with the email field */}
      {myRowData?.rank>5 && (
        <table className="leaderboard-table">
          <tbody
            style={{
              height:'54px',
              maxHeight: maxHeight,
              overflowY: "auto",
              display: "block",
              backgroundColor:'#FFFFFF'
            }}
          >
          <tr
              style={{ display: "table", width: "100%", tableLayout: "fixed" }}
          >
              <td>{myRowData.rank}</td>
              <td >
                <div className="player-info">
                  <img
                    src={`https://res.cloudinary.com/pitchspace/image/upload/v1/player-icons/${myRowData?.playerAvatar}`}
                    className="player-avatar"
                  />
                  <span
                    
                    title={myRowData.playerName}
                  >{`You (${myRowData.playerName})`}</span>
                </div>
              </td>
              <td>
               
                  <span title={myRowData.points}>{myRowData.points}</span>
               
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Leaderboard;
