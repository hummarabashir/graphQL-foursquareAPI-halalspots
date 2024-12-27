import React from "react";

import USAMap from "react-usa-map";
import { Component } from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  class Map extends Component {
    // This function is required by imported USAMap
    mapHandler = (event) => {
      let stateName = event.target.innerHTML
        .replace("<title>", "")
        .replace("</title>", "");
      navigate("/state", {
        state: { stateName: stateName, stateCode: event.target.dataset.name },
      });
    };

    render() {
      return (
        // This is a imported component that provides a clickable map of the United States
        <USAMap onClick={this.mapHandler} defaultFill="rgb(247, 166, 15)" />
      );
    }
  }

  return (
    <div className="landing-page-container">
      <div className="logo-container">
        {/* <div className="retro">National Halal Spot Explorer</div> */}
        {/* <img src="../../assets/logo.png" /> */}
      </div>

      <h1>Click on a state to view its national halal spots!</h1>
      <Map />
    </div>
  );
}

export default LandingPage;
