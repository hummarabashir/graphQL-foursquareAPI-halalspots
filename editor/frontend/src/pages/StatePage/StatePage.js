import React from "react";

import Header from "../../components/Header/Header";
import StateCard from "../../components/StateCard/StateCard";
import StateDetails from "../../components/StateDetails/StateDetails";
import { useLocation } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import "./StatePage.css";
import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";

const GET_VENUES = gql`
  query GetVenues($region: String!) {
    venues(region: $region) {
      id
      name
      location
      locality
      postcode
      region
      closed
      latitude
      longitude
    }
  }
`;

function StatePage() {
  const location = useLocation();
  const [parks, setParks] = useState([]);
  const [currPark, setCurrPark] = useState([]);
  const [allParks, setAllParks] = useState([]);
  const stateCode = location.state.stateCode;
  const stateName = location.state.stateName;
  const { loading, error, data } = useQuery(GET_VENUES, {
    variables: { region: `${stateName}` },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
    <div className="state-page-container">
      <Header />
      <h1 className="state-name">
        {location.state.stateCode === "DC"
          ? "Washington, D.C."
          : location.state.stateName}
      </h1>
   
      <div className="sub-state-page-container">
      <div className="state-cards-container">
        {data.length === 0 ? (
          <h3 className="no-state">
            None of the current state's sites contain all of the selected
            amenities.
          </h3>
        ) : (
          <>
            {data.venues.map((item) => {
              return (
                <StateCard
                  park={item}
                  setCurrPark={setCurrPark}
                  key={item.id}
                />
              );
            })}
          </>
        )}
      </div>
      {currPark.length === 0 ? (
        <div className="no-state-details">
          <h3>Click on a Halal Spot to view its details!</h3>
        </div>
      ) : (
        <>
          <div className="state-details-container">
            <StateDetails park={currPark} />
          </div>
        </>
      )}
    </div>
    </div>
    </>
  );
}

export default StatePage;
