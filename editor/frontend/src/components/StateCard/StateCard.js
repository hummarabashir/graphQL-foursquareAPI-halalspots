import React from "react";

import "./StateCard.css";

function StateCard({ park, setCurrPark }) {
  return (
    <div className="state-card" onClick={() => setCurrPark(park)}>
      <h3>
        {park.location.region}-{park.name}
      </h3>
    </div>
  );
}

export default StateCard;
