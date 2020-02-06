import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { KidPetChoreContext } from "../chores/KidPetChoreProvider"
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export default ({ pet, history }) => {
  const { deleteKidPetChore } = useContext(KidPetChoreContext);

  return (
    <Card className="petCard">
      <Typography className="pet__name">{pet.name}</Typography>
      {/* <img className="pet__pic">{pet.pic}</img> */}
      <img
        src={require("./plus.svg")}
        className="btn btn-light"
        onClick={() => {
          history.push(`/addChore/${pet.id}`);
        }}
      />
      <CardContent>
      <ul className="pet__chores">
        {pet.foundChoresArray.map(fca => (
          <li
          // if (fca.isCompleted == false) {
          //   classList.add("completedChore")
          // }
          >
            {fca.chores.name} Due:{fca.dueDate} Assigned to:{fca.child.userName}
            <CardActions>
            <img
              src={require("./edit.svg")}
              className="edit__icon"
              onClick={() => {
                history.push(`/editChore/${fca.id}`);
              }}
            />
            <img
              src={require("./delete.svg")}
              className="delete__icon"
              onClick={() => {
                deleteKidPetChore(fca);
              }}
            />
            </CardActions>
          </li>
        ))}
      </ul>
      </CardContent>
    </Card>
  );
};
