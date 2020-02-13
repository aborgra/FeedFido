import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from 'reactstrap';

import "./LaunchPad.css"

const Launchpad = props => {
  if (localStorage.getItem("fido_user") === null) {
    document.body.classList.add("logInBackground");
  }



  return (
    <>
      <div className="launchpad__Container">
        <h1 className="launchpad__title">Feed Fido</h1>

        <section className="launchpad__form">
          {/* <div className="launchpad__choice">I am a ...</div> */}
          <Button color="primary" size="large"
            className="launchpadButton"
            onClick={() => props.history.push("/login")}
          >
            Parent
          </Button>

          <Button color="primary" size="large"
            className="launchpadButton"
            onClick={() => props.history.push("/kidLogin")}
          >
            Child
          </Button>
        </section>
        <img src={require("../pics/footprint.svg")} className="logo"/>

      </div>
    </>
  );
};

export default Launchpad;
