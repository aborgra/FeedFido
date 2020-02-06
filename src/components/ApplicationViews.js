import React, { useContext } from "react";
import { Route } from "react-router-dom";
import ProviderProvider from "./providers/ProviderProvider";
import "./Fido";
import { UserContext } from "./users/UserProvider";
import Login from "./auth/Login";
import ChildPetList from "./pets/ChildPetList";
import ParentPetList from "./pets/ParentPetList";
import ChildList from "./kids/ChildList";
import AddChildForm from "./kids/AddChildForm";
import AddPetForm from "./pets/AddPetForm";
import ChoresForm from "./chores/ChoresForm";
import "./Fido.css";

export default props => {
  const  {users}  = useContext(UserContext);
  const activeUserId = parseInt(localStorage.getItem("fido_user"));
  const activeUser = users.find(user => user.id === activeUserId) || {}
  console.log(activeUserId);

  return (
    <>
      <ProviderProvider>
        <Route
          exact
          path="/"
          render={props => {
            if (activeUser !== null) {
              if (activeUser.parentId === 0) {
                return (
                  <>
                    <section className="parentDashboardContainer">
                      <div className="petListContainer">
                        <ParentPetList {...props} />
                      </div>
                      <div className="childContainer">
                        <ChildList {...props} />
                      </div>
                    </section>
                  </>
                );
              } else {
                return (
                  <>
                    <section className="childDashboardContainer">
                      <div className="petListContainer">
                        <ChildPetList {...props} />
                      </div>
                    </section>
                  </>
                );
              }
            }
            return <Login {...props} />;
          }}
        />
        {/* <Route exact path="/editEvent/:eventId(\d+)" render={props => <EventForm {...props} />} /> */}
        <Route exact path="/addPet" render={props => <AddPetForm {...props} />} />
        <Route exact path="/addChore/:petId(\d+)" render={props => <ChoresForm {...props} />} />
        <Route exact path="/addChild" render={props => <AddChildForm {...props} />} />
        <Route exact path="/editChore/:kpcId(\d+)" render={props => <ChoresForm {...props} />} />

        {/* <Route exact path="/tasks/create" render={props => <TaskForm {...props} />} />
        <Route exact path="/editNews/:newsId(\d+)" render={props => <NewsForm {...props} />} />
        <Route exact path="/tasks/edit/:tasksId(\d+)" render={props => <TaskForm {...props} />} />
        <Route exact path="/editMessage/:messageId(\d+)" render={props => <EditMessageForm {...props} />} /> */}
      </ProviderProvider>
    </>
  );
};
