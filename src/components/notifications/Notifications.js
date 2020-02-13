import React, { useContext } from "react";
import { Card, Button } from "reactstrap";
import { KidPetChoreContext } from "../chores/KidPetChoreProvider";
import moment from "moment";

export default ({ chore, history }) => {
const {patchKidPetChore, deleteKidPetChore} = useContext(KidPetChoreContext)
var options = { year: "numeric", month: "numeric", day: "numeric" };
  let todayDate = new Date();
  let formatedDate = todayDate.toLocaleString("en-US", options);
  let [useDate, foo] = formatedDate.split(",");
  
  let oldScheduledDate = moment(chore.schedDate).valueOf()

  let [newScheduledDateWeekly, not] = new Date(
    oldScheduledDate + 7 * 24 * 60 * 60 * 1000
  )
    .toLocaleString("en-US", options)
    .split(",");
  let [newScheduledDateDaily, test] = new Date(
    oldScheduledDate + 1 * 24 * 60 * 60 * 1000
  )
    .toLocaleString("en-US", options)
    .split(",");
  console.log("weekly daily", newScheduledDateWeekly, newScheduledDateDaily);

  return (
    <Card className="notificationCard">
      {/* <div>{chore.id}</div> */}
      <div className="notificationDueDate">Due Date: {chore.schedDate}</div>
      <div className="notificationChore">Chore: {chore.chore.name}</div>
      <div className="notificationPetName">Pet: {chore.pet.name}</div>
      <div className="notificationChildName">Child: {chore.user.userName}</div>
      <div className="notificationButtonsContainer">
      <Button
                 
                  className="acceptBtn" color="primary"
                  onClick={() => { 
                    if(chore.recurrance === "weekly"){
                    const updatedKitPetChores = {
                      id: chore.id,
                      schedDate: newScheduledDateWeekly,
                      isCompleted: false,
                      dateCompleted: ""
                    };
                    patchKidPetChore(updatedKitPetChores)
                  }else if (chore.recurrance === "daily"){
                    const updatedKitPetChores = {
                      id: chore.id,
                      schedDate: newScheduledDateDaily,
                      isCompleted: false,
                      dateCompleted: ""
                    }
                    patchKidPetChore(updatedKitPetChores)
                  } 
                  }}
                >OK</Button>
                <Button
                className="deleteEventBtn" color="light"
                onClick={() =>{
                  let confirm = window.confirm("Delete this and any future recurring events?")
                  if (confirm === true){
                  deleteKidPetChore(chore)}}}
                >Delete Event</Button>
                </div>
    </Card>
  );
};
