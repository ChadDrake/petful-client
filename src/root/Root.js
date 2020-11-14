import React, { Component } from "react";
import LandingPage from "../LandingPage/LandingPage";
import Adoption from "../Adoption/Adoption";
import { Switch } from "react-router-dom";
import "./Root.css";

class Root extends Component {
  render() {
    return (
      <div className="all">
        <h1>Petful</h1>
        <Switch>
          <LandingPage exact path={"/"} />
          <Adoption path={"/adopt"} />
        </Switch>
      </div>
    );
  }
}

export default Root;
