// import React from "react";
// import { ApolloProvider } from "@apollo/client";
// import { ApolloClient, InMemoryCache } from "@apollo/client";
// // import App from "./App.js";

// const client = new ApolloClient({
//   uri: "http://localhost:4000/graphql",
//   cache: new InMemoryCache(),
// });

// const CApp = () => {
//   return (
//     <ApolloProvider client={client}>
//       <h1>hello</h1>
//     </ApolloProvider>
//   );
// };

// export default CApp;

import React, { useState } from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo-hooks";
import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";
import USAMap from "react-usa-map";
import { Link } from "react-router-dom";
import "./index.css";

// import App from "./App.js";

const client = new ApolloClient({ uri: "http://localhost:4000" });

// const GET_STATE_DATA = gql`
//   query GetStateData {
//     usaMapData(stateCode: "AZ") {
//       id
//       name
//     }
//   }
// `;
const GET_STATE_DATA = gql`
  query GetStateData($stateCode: String!) {
    usaMapData(stateCode: $stateCode) {
      id
      name
      stateCode
    }
  }
`;

// function Map() {
//   // This function is required by imported USAMap
//   // mapHandler = (event) => {
//   // 	let stateName = event.target.innerHTML
//   // 		.replace("<title>", "")
//   // 		.replace("</title>", "");
//   // 	navigate("/parks", {
//   // 		state: { stateName: stateName, stateCode: event.target.dataset.name },
//   // 	});
//   // };
//   const mapHandler = (event) => {
//     // alert(
//     //   `StateName: ${event.target.innerHTML
//     //     .replace("<title>", "")
//     //     .replace("</title>", "")}
//     //   StateCode: ${event.target.dataset.name}`
//     // );
//     const stateCode = event.target.dataset.name;
//     setSelectedState(stateCode);
//   };

//   return (
//     // This is a imported component that provides a clickable map of the United States
//     <USAMap onClick={mapHandler} defaultFill="rgb(247, 166, 15)" />
//   );
// }

function CApp() {
  const [selectedState, setSelectedState] = useState("");
  const { loading, error, data } = useQuery(GET_STATE_DATA, {
    variables: { stateCode: selectedState },
  });
  const mapHandler = (event) => {
    const stateCode = event.target.dataset.name;
    setSelectedState(stateCode);
  };

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;
  if (data && data.usaMapData) {
    return (
      <div className="landing-page-container">
        <h1>STATE INFORMATION</h1>
        <ul>
          {/* {data.usaMapData.map((user) => ( */}
          <li key={data.usaMapData.id}>
            <p>StateName: {data.usaMapData.name}</p>
            <p>StateCode: {data.usaMapData.stateCode}</p>
          </li>
          {/* ))} */}
        </ul>
        <div className="header-link-container">
          {/* <Link to="/" className="header-link">
            Back to State Selector
          </Link> */}
          <button>Back to State Selector</button>
        </div>
        {/* <USAMap onClick={mapHandler} defaultFill="rgb(247, 166, 15)" /> */}
      </div>
    );
  } else {
    return (
      <div className="landing-page-container">
        <h1>GraphQL State Explorer National Map</h1>
        <USAMap onClick={mapHandler} defaultFill="rgb(247, 166, 15)" />
      </div>
    );
  }
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <CApp />
  </ApolloProvider>,

  document.getElementById("root")
);
