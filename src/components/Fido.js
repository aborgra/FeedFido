import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import ApplicationViews from "./ApplicationViews";
import Nav from "./nav/Nav";
import Login from "./auth/Login";
import Register from "./auth/Register";
import "./Fido.css";
import ProviderProvider from "./providers/ProviderProvider";
import KidLogin from "./auth/KidLogin";

// import { Button , Alert, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Launchpad from "./auth/LaunchPad";

export default () => (
  <>
    <Route
      render={() => {
        if (localStorage.getItem("fido_user")) {
          return (
            <>
              <Route
                render={props => (
                  <ProviderProvider>
                    <Nav {...props} />
                  </ProviderProvider>
                )}
              />
              <Route render={props => <ApplicationViews {...props} />} />
            </>
          );
        } else {
          return <Redirect to="/launchpad" />;
        }
      }}
    />
    <Route path="/launchpad" render={props => <Launchpad {...props} />} />
    <Route path="/login" render={props => <Login {...props} />} />
    <Route path="/kidLogin" render={props => <KidLogin {...props} />} />
    <Route path="/register" render={props => <Register {...props} />} />
  </>
);
