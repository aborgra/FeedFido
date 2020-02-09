import React, { useRef } from "react";
import { Link } from "react-router-dom";
import RaisedButton from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import "./LaunchPad.css"

const Launchpad = props => {
  if (localStorage.getItem("fido_user") === null) {
    document.body.classList.add("logInBackground");
  }

  const useStyles = makeStyles(theme => ({
    button: {
      display: "block",
      marginTop: theme.spacing(2)
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    }
  }));
  const classes = useStyles();

  return (
    <>
      <div className="launchpad__Container">
        <h1 className="launchpad__title">Feed Fido</h1>
        <section className="launchpad__form">
          {/* <div className="launchpad__choice">I am a ...</div> */}
          <RaisedButton variant="contained" color="primary" size="large"
            className="launchpadButton"
            onClick={() => props.history.push("/login")}
          >
            Parent
          </RaisedButton>
          <hr></hr>
          <RaisedButton variant="contained" color="primary" size="large"
            className="launchpadButton"
            onClick={() => props.history.push("/kidLogin")}
          >
            Child
          </RaisedButton>
        </section>
      </div>
    </>
  );
};

export default Launchpad;
