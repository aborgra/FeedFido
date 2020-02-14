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
  let today = Date.now()
  let compareDate = Date.now() - 1 * 20 * 60 * 60 * 1000

  const allChores = kidPetChores.filter(kpc => {

    let scheduledDate = moment(kpc.schedDate).valueOf();

    if(kpc.isCompleted === false && kpc.user.parentId === activeUserId && scheduledDate < compareDate)
    return kpc
  }) || []


  
  return (
    <>
      <section className="notificationList">
      <h4 className="notificationTitle">Overdue Chores</h4>
      {allChores.map(pc => {
            return <Notifications {...props} key={pc.id} chore={pc} />;
          })}
      </section>
    </>
  );
};
