import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useState } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useAuth } from "../../../context/AuthContext";
import axios from "axios";

const HighliteLeaderboardCard = () => {
  const [leaderboardData, setLeaderBoardData] = useState([]);
  const [myRankIndex, setMyRankIndex] = useState(null);
  const { email, token } = useAuth(); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dev.api.pitch.space/api/leader-board', {
          params: {
            email: email,
            token: token
          }
        });
        
        if (response.status === 200) {
          let leaderboard = response.data.data;

          // Sort by points in descending order
          leaderboard.sort((a, b) => b.points - a.points);

          // Add rank and find my rank based on email
          leaderboard = leaderboard.map((player, index) => ({
            ...player,
            rank: index + 1,
          }));

          // Find the user's rank based on the email
          const myRank = leaderboard.findIndex(player => player.email === email);
          setMyRankIndex(myRank);

          setLeaderBoardData(leaderboard);
        }
      } catch (err) {
        setError('You are not valid');
      }
    };

    if (email && token) {
      fetchData();  // Only fetch if both email and token are set
    }
  }, [email, token]);

  // Adjust row data to always keep the user's row at the top if rank > 5
  const getAdjustedRowData = () => {
    if (myRankIndex === null || myRankIndex < 0) return leaderboardData;
    
    let adjustedData = [...leaderboardData];

    if (myRankIndex > 4) {
      const myData = adjustedData[myRankIndex]; // Get the user's data
      adjustedData.splice(myRankIndex, 1); // Remove the user's data from its original position
      adjustedData.unshift(myData); // Insert it at the top of the leaderboard
    }

    return adjustedData;
  };
 
  const defaultColDef = {
    resizable: true,
    sortable: true,
  };

  const [colDefs, setColDefs] = useState([
    { 
      headerName: "Rank",
      field: "rank",
      minWidth: 60,
      maxWidth: 70,
      cellRenderer: (params) => {
        return `${params.value}.`;  // Add a dot after the rank number
      },
    },
    {
      headerName: 'Player',
      field: "playerName",
      cellRenderer: (params) => {
        const { playerAvatar, playerName } = params.data;
        const isCurrentUser = params.data.email === email; // Check if this is the current user's row
    
        return (
          <div>
            <img 
              src={`https://res.cloudinary.com/pitchspace/image/upload/v1/player-icons/${playerAvatar}`} 
              style={{ width: '30px', height: '30px', marginRight: '10px', borderRadius: '50%' }} 
            />
            <span>{isCurrentUser ? `You (${playerName})` : playerName}</span>
          </div>
        );
      },
      minWidth: 100,
    }
,    
    {
      headerName: 'Points', 
      field: "points" 
    },
  ]);

  return (
    <div className="highlite-leaderboard-card">
      <div className="highlite-header">
        <h5>
          Champions<span style={{ color: '#888' }} className="header-text">({leaderboardData.length})</span>
        </h5>
        <div>
          <span style={{ cursor: 'pointer' }}>Find me</span>
          <span style={{ cursor: 'pointer' }}>Go to top</span>
        </div>
      </div>
      <div className="ag-theme-quartz" style={{ height: "300px" }}>
        <AgGridReact
          rowData={getAdjustedRowData()} // Display adjusted row data
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          rowBuffer={0}  // Ensure rows are dynamically loaded while scrolling
          rowHeight={50} // Adjust row height if needed
          rowClassRules={{
            'highlighted-row': (params) => params.data.email === email // Apply class if it's the user's row
          }}
        />
      </div>
    </div>
  );
};

export default HighliteLeaderboardCard;




