import React, { useContext } from "react";
import { Route } from "react-router-dom";
import ProviderProvider from "./providers/ProviderProvider";
import "./Fido";
import { UserContext } from "./users/UserProvider";
import Login from "./auth/Login";
import ChildPetList from "./pets/ChildPetList";
import ParentPetList from "./pets/ParentPetList";
import ChildList from "./kids/ChildList";
import ChildForm from "./kids/AddChildForm";
import PetForm from "./pets/AddPetForm";
import ChoresForm from "./chores/ChoresForm";
import "./Fido.css";
import { Container } from "reactstrap";
import ChartList from "./charts/ChartList";
import NotificationList from "./notifications/NotificationList";

export default props => {
  const { users } = useContext(UserContext);
  const activeUserId = parseInt(localStorage.getItem("fido_user"));
  const activeUser = users.find(user => user.id === activeUserId) || {};

  return (
    <>
      <Route
        exact
        path="/"
        render={props => {
          if (activeUser !== null) {
            if (activeUser.parentId === 0) {
              return (
                <>
                  <Container className="parentDashboardContainer">
                    <div className="petListContainer">
                      <ParentPetList {...props} />
                    </div>
                  </Container>
                </>
              );
            } else if (activeUser.parentId > 0) {
              return (
                <>
                  <Container className="childDashboardContainer">
                    <div className="petListContainer">
                      <ChildPetList {...props} />
                    </div>
                  </Container>
                </>
              );
            }
          }
          return <Login {...props} />;
        }}
      />
      <Route
        exact
        path="/child/graph/:childId(\d+)"
        render={props => <ChartList {...props} />}
      />

      <Route
        exact
        path="/notifications/:activeUserId(\d+)"
        render={props => <NotificationList {...props} />}
      />
      <Route
        exact
        path="/ChildList"
        render={props => <ChildList {...props} />}
      />
      <Route exact path="/addPet" render={props => <PetForm {...props} />} />
      <Route
        exact
        path="/editPet/:petId(\d+)"
        render={props => <PetForm {...props} />}
      />
      <Route
        exact
        path="/addChore/:petId(\d+)"
        render={props => <ChoresForm {...props} />}
      />
      <Route
        exact
        path="/addChild"
        render={props => <ChildForm {...props} />}
      />
      <Route
        exact
        path="/editChore/:kpcId(\d+)"
        render={props => <ChoresForm {...props} />}
      />
      <Route
        exact
        path="/editChild/:childId(\d+)"
        render={props => <ChildForm {...props} />}
      />
    </>
  );
};
