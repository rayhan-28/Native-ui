// import { AgGridReact } from "ag-grid-react";
// import React, { useEffect, useState } from "react";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-quartz.css";
// import { useAuth } from "../../../context/AuthContext";
// import axios from "axios";

// const HighliteLeaderboardCard = () => {
// const [leaderboardData, setLeaderBoardData] = useState([]);
// const [myRankIndex, setMyRankIndex] = useState(null);
// const { email, token } = useAuth();
// const [error, setError] = useState(null);
// const [showExtraUserRow, setShowExtraUserRow] = useState(false);

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await axios.get('https://dev.api.pitch.space/api/leader-board', {
//         params: {
//           email: email,
//           token: token
//         }
//       });

//       if (response.status === 200) {
//         let leaderboard = response.data.data;

//         // Sort by points in descending order
//         leaderboard.sort((a, b) => b.points - a.points);

//         // Add rank and find my rank based on email
//         leaderboard = leaderboard.map((player, index) => ({
//           ...player,
//           rank: index + 1,
//         }));

//         // Find the user's rank based on the email
//         const myRank = leaderboard.findIndex(player => player.email === email);
//         setMyRankIndex(myRank);

//         // Determine if we need to show the user's row separately
//         setShowExtraUserRow(myRank > 4);

//         setLeaderBoardData(leaderboard);
//       }
//     } catch (err) {
//       setError('You are not valid');
//     }
//   };

//   if (email && token) {
//     fetchData();  // Only fetch if both email and token are set
//   }
// }, [email, token]);

//   // Adjust row data to show only 4 rows when rank > 4
//   const getAdjustedRowData = () => {
//     if (myRankIndex === null || myRankIndex < 0) return leaderboardData;

//     // Return the entire leaderboard data if rank <= 4
//     return leaderboardData;
//   };

//   const defaultColDef = {
//     resizable: true,
//     sortable: true,
//   };

//   const [colDefs, setColDefs] = useState([
//     {
//       headerName: "Rank",
//       field: "rank",
//       minWidth: 60,
//       maxWidth: 70,
//       cellRenderer: (params) => {
//         return (
//           <div className="rank-cell" title={params.value}>
//             {`${params.value}.`}
//           </div>
//         );
//       },
//     },
//     {
//       headerName: 'Player',
//       field: "playerName",
//       cellRenderer: (params) => {
//         const { playerAvatar, playerName } = params.data;
//         const isCurrentUser = params.data.email === email; // Check if this is the current user's row

//         return (
//           <div className="player-cell" title={playerName}>
//             <img
//               src={`https://res.cloudinary.com/pitchspace/image/upload/v1/player-icons/${playerAvatar}`}
//               style={{ width: '30px', height: '30px', marginRight: '10px', borderRadius: '50%' }}
//             />
//             <span>{isCurrentUser ? `You (${playerName})` : playerName}</span>
//           </div>
//         );
//       },
//       minWidth: 100,
//     },
//     {
//       headerName: 'Points',
//       field: "points",
//       cellRenderer: (params) => {
//         return (
//           <div className="points-cell" title={params.value}>
//             {params.value}
//           </div>
//         );
//       }
//     },
//   ]);

//   return (
//     <div className="highlite-leaderboard-card">
//       <div className="highlite-header">
//         <h5>
//           Champions<span style={{ color: '#888' }} className="header-text">({leaderboardData.length})</span>
//         </h5>
//         <div>
//           <span style={{ cursor: 'pointer' }}>Find me</span>
//           <span style={{ cursor: 'pointer' }}>Go to top</span>
//         </div>
//       </div>
//       <div className="ag-theme-quartz" style={{ height: showExtraUserRow ? "260px" : "300px" }}>
//         <AgGridReact
//           rowData={getAdjustedRowData()} // Display adjusted row data
//           columnDefs={colDefs}
//           defaultColDef={defaultColDef}
//           suppressHorizontalScroll={true}
//           rowBuffer={0}  // Ensure rows are dynamically loaded while scrolling
//           rowHeight={50} // Adjust row height if needed
//           rowClassRules={{
//             'highlighted-row': (params) => params.data.email === email // Apply class if it's the user's row
//           }}
//         />
//       </div>

// {showExtraUserRow && (
//   <div className="user-row" style={{ marginTop: "10px" }}>
//     <div style={{ display: "flex", alignItems: "center", padding: "10px", background: "#f1f1f1" }}>
//       <span style={{ width: "60px", textAlign: "center" }}>{leaderboardData[myRankIndex].rank}.</span>
//       <img
//         src={`https://res.cloudinary.com/pitchspace/image/upload/v1/player-icons/${leaderboardData[myRankIndex].playerAvatar}`}
//         style={{ width: '30px', height: '30px', marginRight: '10px', borderRadius: '50%' }}
//       />
//       <span>{`You (${leaderboardData[myRankIndex].playerName})`}</span>
//       <span style={{ marginLeft: "auto" }}>{leaderboardData[myRankIndex].points}</span>
//     </div>
//   </div>
// )}
//     </div>
//   );
// };

// export default HighliteLeaderboardCard;

import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import axios from "axios";

const Leaderboard = ({width='100%',maxWidth='375px'}) => {
  const [leaderboardData, setLeaderBoardData] = useState([]);
  const [myRowData, setMyRowData] = useState(null); // Store the row that contains the email field
  const { email, token } = useAuth();
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
          const myRow = leaderboard.find((player) => player.email);

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

    if (email && token) {
      fetchData(); // Only fetch if both email and token are set
    }
  }, [email, token]);
  console.log(myRowData)
  const maxHeight = myRowData && myRowData.rank > 4 ? "230px" : "300px";

  return (
    <div style={{width,maxWidth}} className="leaderboard-table-container">
      {error && <div className="error">{error}</div>}{" "}
      {/* Display any error message */}
      {/* Main leaderboard table */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <p style={{fontSize:'20px',fontWeight:'500'}}>Champions <span style={{fontSize:'20px',fontWeight:'300'}}>(345)</span></p>
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
                  backgroundColor:player.rank===myRowData.rank?'#ffffff':'#f9f9f9'
                }}
              >
                <td style={{paddingLeft:'10px',fontSize:'14px',fontWeight:'500'}}>{player.rank}.</td>
                <td>
                  <div className="player-info">
                    <img
                      src={`https://res.cloudinary.com/pitchspace/image/upload/v1/player-icons/${player?.playerAvatar}`}
                      className="player-avatar"
                    />
                    {player.rank===myRowData.rank?<span title={player.playerName}>You ({player.playerName})</span>:
                      <span style={{fontSize:'16px',fontWeight:'500',color:'#06182C'}} title={player.playerName}>{player.playerName}</span>
                    }
                  </div>
                </td>
                <td>
                  <span style={{fontSize:'16px',fontWeight:'500',color:'#06182C99'}} title={player.points}>{player.points}</span>
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
