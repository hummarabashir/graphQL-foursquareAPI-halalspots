import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { InMemoryCache } from "@apollo/client";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo-hooks";
import Landing from "./pages/LandingPage/LandingPage";
import StateInfo from "./pages/StatePage/StatePage";
// import "./index.css";

// const client = new ApolloClient({ uri: "http://localhost:4000" });

const client = new ApolloClient({
  // uri: "http://localhost:4000",
  uri: "/.netlify/functions/graphql",
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/state" element={<StateInfo />} />
        </Routes>
      </Router>
    </ApolloProvider>
  </React.StrictMode>
);