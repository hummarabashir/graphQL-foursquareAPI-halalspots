import React from "react";

import "./StateDetails.css";
// import { useState, useEffect } from "react";

function StateDetails({ park }) {
  return (
    <div className="state-details">
      <h1>{park.name}</h1>
      <p>Open: {park.closed}</p>
      <p>Address: {park.location}</p>
      <p>Locality: {park.locality}</p>
      <p>Postcode: {park.postcode}</p>
      <p>Region: {park.region}</p>
      <p>Latitude: {park.latitude}</p>
      <p>Longitude: {park.longitude}</p>
    </div>
  );
}

export default StateDetails;
