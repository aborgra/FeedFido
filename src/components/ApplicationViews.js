import React, { useContext } from "react";
import { Route } from "react-router-dom";
import ProviderProvider from "./providers/ProviderProvider";
import "./Fido";
import { UserContext } from "./users/UserProvider";

export default props => {
  const { users } = useContext(UserContext)
  const activeUserId = parseInt(localStorage.getItem("fido_user"))
  const activeUser = users.find(user => user.id === activeUserId) || {}
  console.log(activeUserId)


  return (
    <>
      <ProviderProvider>
        
        <Route
          exact
          path="/"
          render={props => {
            if(localStorage.getItem("fido_user") !== null && activeUser.parentId !== 0){
            return (
              <>
                <section className="parentDashboardContainer">
                  <div className="petListContainer">
                    <PetList {...props} />
                  </div>
                  <div className="childContainer">
                    <ChildList {...props} />
                  </div>
                </section>
              </>
            );
          }return <Login {...props} />
        }}
        />
        {/* <Route exact path="/editEvent/:eventId(\d+)" render={props => <EventForm {...props} />} />
        <Route exact path="/createEvent" render={props => <EventForm {...props} />} />
        <Route exact path="/createNews" render={props => <NewsForm {...props} />} />
        <Route exact path="/tasks/create" render={props => <TaskForm {...props} />} />
        <Route exact path="/editNews/:newsId(\d+)" render={props => <NewsForm {...props} />} />
        <Route exact path="/tasks/edit/:tasksId(\d+)" render={props => <TaskForm {...props} />} />
        <Route exact path="/editMessage/:messageId(\d+)" render={props => <EditMessageForm {...props} />} /> */}
      
      </ProviderProvider>
    </>
  );
};
