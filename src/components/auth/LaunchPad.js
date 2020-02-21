import React from "react";
import { Button } from "reactstrap";

import "./LaunchPad.css";

const Launchpad = props => {
  
  return (
    <>
      <div className="launchpad__Container">
        <h1 className="launchpad__title">Feed Fido</h1>

        <section className="launchpad__form">
          <Button
            color="primary"
            size="large"
            className="launchpadButton"
            onClick={() => props.history.push("/login")}
          >
            Parent
          </Button>

          <Button
            color="primary"
            size="large"
            className="launchpadButton"
            onClick={() => props.history.push("/kidLogin")}
          >
            Child
          </Button>
        </section>
        <img src={require("../pics/footprint.svg")} className="logo" />
      </div>
    </>
  );
};

export default Launchpad;
