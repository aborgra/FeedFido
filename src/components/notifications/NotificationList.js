import React, { useContext } from "react";
import "./Notification.css";
import { UserContext } from "../users/UserProvider";
import { Button } from "reactstrap";
import { KidPetChoreContext } from "../chores/KidPetChoreProvider";
import moment from "moment";
import Notifications from "./Notifications";
import { ChoreContext } from "../chores/ChoreProvider";
import { PetContext } from "../pets/PetProvider";

export default props => {
  const { users } = useContext(UserContext);
  const { chores } = useContext(ChoreContext);
  const { pets } = useContext(PetContext)
  const { kidPetChores } = useContext(KidPetChoreContext)

  const activeUserId = parseInt(localStorage.getItem("fido_user"));
  // const activeUser = users.find(user => user.id === activeUserId) || {};
  // const allUserChildren = users.filter(user => user.parentId === activeUserId) || [];

  let today = Date.now();

  const allChores = kidPetChores.filter(kpc => {

    let scheduledDate = moment(kpc.schedDate).valueOf();

    if(kpc.isCompleted === false && kpc.user.parentId === activeUserId && scheduledDate < today)
    return kpc
  }) || []

  console.log(allChores, "allChores")

  
  return (
    <>
      <section className="notificationList">
      <h4>Uncompleted Chores</h4>
      {allChores.map(pc => {
        console.log("pc", pc)
            return <Notifications {...props} key={pc.id} chore={pc} />;
          })}
      </section>
    </>
  );
};
