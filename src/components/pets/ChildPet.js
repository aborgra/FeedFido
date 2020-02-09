import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { KidPetChoreContext } from "../chores/KidPetChoreProvider";
import { CardContent, CardActions, Card, Typography } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";

export default ({ pet, history }) => {
  const { patchKidPetChore } = useContext(KidPetChoreContext);
  const activeUserId = parseInt(localStorage.getItem("fido_user"));

  const petType = type => {
    if (type === "2") {
      return <img className="petImage" src={require("../pics/dog.png")} />;
    } else if (type === "1") {
      return <img className="petImage" src={require("../pics/cat.png")} />;
    } else if (type === "5") {
      return <img className="petImage" src={require("../pics/bird.png")} />;
    } else if (type === "3") {
      return <img className="petImage" src={require("../pics/hamster.png")} />;
    } else if (type === "6") {
      return <img className="petImage" src={require("../pics/reptile.png")} />;
    } else if (type === "4") {
      return <img className="petImage" src={require("../pics/fish.png")} />;
    } else {
      return <img className="petImage" src={require("../pics/other.png")} />;
    }
  };

  var options = { year: "numeric", month: "numeric", day: "numeric" };
  let todayDate = new Date();
  let formatedDate = todayDate.toLocaleString("en-US", options);
  let [useDate, foo] = formatedDate.split(",");

  return (
    <Card className="petCard">
      <h3 className="pet__name">{pet.name}</h3>
      <div>{petType(pet.type)}</div>

      <CardContent>
        <List className="pet__chores">
          {pet.foundChoresArray.map(fca => (
            <ListItem>
              {fca.chores.name}
              <Checkbox
                onClick={() => {
                  const updatedKitPetChores = {
                    id: fca.id,
                    petId: pet.id,
                    userId: activeUserId,
                    choreId: fca.chores.id,
                    dueDate: fca.dueDate,
                    recurrance: fca.recurrance,
                    isCompleted: true,
                    dateCompleted: useDate
                  };
                  patchKidPetChore(updatedKitPetChores).then(() =>
                    history.push("/")
                  );
                }}
              ></Checkbox>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};
