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
 
  const { kidPetChores } = useContext(KidPetChoreContext)

  const activeUserId = parseInt(localStorage.getItem("fido_user"));
  let compareDate = moment().subtract(1, 'days')

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
