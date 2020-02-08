import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { KidPetChoreContext } from "../chores/KidPetChoreProvider";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

export default ({ pet, history }) => {
  const { deleteKidPetChore } = useContext(KidPetChoreContext);
  let choreItemCompleted = "ChoreNotCompleted";

  const petType = type => {
    if (type === "2") {
      return <img className="petImage" src={require("../pics/dog.png")}/>
    } else if (type === "1") {
      return <img className="petImage" src={require("../pics/cat.png")}/>;
    } else if (type === "5") {
      return <img className="petImage" src={require("../pics/bird.png")}/>
    } else if (type === "3") {
      return <img className="petImage" src={require("../pics/hamster.png")}/>
    } else if (type === "6") {
      return <img className="petImage" src={require("../pics/reptile.png")}/>
    } else if (type === "4") {
      return <img className="petImage" src={require("../pics/fish.png")}/>
    } else {
      return <img className="petImage" src={require("../pics/other.png")}/>
    }
  };

  return (
    <Card className="petCard">
      <div className="pet__header">
      <h2 className="pet__name">{pet.name}</h2>
      <div>{petType(pet.type)}</div>
      <img
        src={require("./plus.svg")}
        className="addPet"
        onClick={() => {
          history.push(`/addChore/${pet.id}`);
        }}
      />
      </div>
      <CardContent>
        <List className="pet__chores">
          {pet.foundChoresArray.map(fca => (
            <ListItem
              className={
                fca.isCompleted
                  ? (choreItemCompleted = "choreCompleted petChore")
                  : (choreItemCompleted = "notCompleted petChore")
              }
            >
              <div className="choreName">{fca.chores.name}</div><div> Assigned to:{fca.child.userName}</div>
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
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};
