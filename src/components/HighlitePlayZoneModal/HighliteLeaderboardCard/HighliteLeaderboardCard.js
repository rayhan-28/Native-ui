import { AgGridReact } from "ag-grid-react";
import React, { useState } from "react";
import "ag-grid-community/styles/ag-grid.css";
import balloon from '../../../assets/image/img/balloon.jpg'
import cap from '../../../assets/image/img/cap.jpg'
import cutton from '../../../assets/image/img/cutton.jpg'
import native_image from '../../../assets/image/img/native-image.jpg'
import rocket from '../../../assets/image/img/rocket.jpg'
const HighliteLeaderboardCard = () => {
  const [rowData, setRowData] = useState([
    { Rank: "1", Player: "Model Y ",   Points: 4480,image: cutton},
    { Rank: "2", Player: "F-Series",  Points: 3456,image:cap},
    { Rank: "3", Player: "Corolla",   Points: 3214 ,image:balloon},
    { Rank: "4", Player: "EQA",       Points: 7786 ,image:native_image},
    { Rank: "5", Player: "500",       Points: 456 ,image:rocket},
  ]);

  const [colDefs, setColDefs] = useState([
    { 
      
       field: "Rank" },
    {
      field: "Player",
      cellRenderer: (params) => {
        return (
          <>
           <div>
           <img src={params.data.image}  style={{width: '30px', height: '30px', marginRight: '10px',borderRadius:'50%'}} />
           <span>{params.value}</span>
           </div>
          </>
        );
      },
      minWidth: 200,
    },
    { field: "Points" },
  ]);

  const defaultColDef = {
    flex: 1,
    resizable: true,
    sortable: true,
  };

  return (
    <div className="highlite-leaderboard-card">
      <div className="highlite-header">
        <h5>
          Champions<span className="header-text">(345)</span>
        </h5>
        <div>
          <span>Find me</span>
          <span>Go to top</span>
        </div>
        </div>
        <div className="ag-theme-quartz" style={{ height: "350px" }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
          />
        </div>
      </div>
  );
};

export default HighliteLeaderboardCard;
