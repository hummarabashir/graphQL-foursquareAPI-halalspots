import React, { useState } from "react";
import { useQuery } from "react-apollo-hooks";
import { gql } from "graphql-tag";
import USAMap from "react-usa-map";

const GET_STATE_DATA = gql`
  query GetStateData($stateCode: String!) {
    usaMapData(stateCode: $stateCode) {
      id
      name
    }
  }
`;

const MapComponent = () => {
  const [stateData, setStateData] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  const { loading, error, data } = useQuery(GET_STATE_DATA, {
    variables: { stateCode: selectedState },
  });

  // const handleClick = (event) => {
  //   const stateCode = event.target.dataset.name;
  //   setSelectedState(stateCode);
  // };

  const handleMapClick = (event) => {
    const stateCode = event.target.dataset.name;
    setSelectedState(stateCode);
    setStateData(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (data) {
    setStateData(data.stateData);
  }

  return (
    <div>
      <USAMap onClick={handleMapClick} />
      {selectedState && stateData && (
        <div>
          <h2>{stateData.name}</h2>
          <p>Id: {stateData.id}</p>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
