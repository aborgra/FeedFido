import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import ApplicationViews from "./ApplicationViews";
import Nav from "./nav/Nav";
import Login from "./auth/Login";
import Register from "./auth/Register";
import "./Fido.css";
import ProviderProvider from "./providers/ProviderProvider";
import KidLogin from "./auth/KidLogin";

import Launchpad from "./auth/LaunchPad";

export default () => (
  <>
    <ProviderProvider>
      <Route
        render={() => {
          if (localStorage.getItem("fido_user")) {
            return (
              <>
                <Route render={props => <Nav {...props} />} />
                <Route render={props => <ApplicationViews {...props} />} />
              </>
            );
          } else {
            return (
              <div className="launchpadContainer">
                <Redirect to="/launchpad" />
              </div>
            );
          }
        }}
      />
      <Route path="/launchpad" render={props => <Launchpad {...props} />} />
      <Route path="/login" render={props => <Login {...props} />} />
      <Route path="/kidLogin" render={props => <KidLogin {...props} />} />
      <Route path="/register" render={props => <Register {...props} />} />
    </ProviderProvider>
  </>
);
