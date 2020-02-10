import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { KidPetChoreContext } from "../chores/KidPetChoreProvider";
import {
  CardContent,
  CardActions,
  Card,
  Typography,
  Input,
  CardBody,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import List from "reactstrap";
import ListItem from "reactstrap";
import ListItemIcon from "reactstrap";
import ListItemSecondaryAction from "reactstrap";
import ListItemText from "reactstrap";

export default ({ pet, history }) => {
  const { patchKidPetChore, addKidPetChore } = useContext(KidPetChoreContext);
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

  let [scheduledDateWeekly, not] = new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000
  )
    .toLocaleString("en-US", options)
    .split(",");
  let [scheduledDateDaily, test] = new Date(
    Date.now() + 1 * 24 * 60 * 60 * 1000
  )
    .toLocaleString("en-US", options)
    .split(",");
  console.log("weekly daily", scheduledDateWeekly, scheduledDateDaily);

  return (
    <Card className="petCard">
      <h3 className="pet__name">{pet.name}</h3>
      <div>{petType(pet.type)}</div>

      <CardBody>
        <ListGroup className="pet__chores">
          {pet.foundChoresArray.map(fca => (
            <ListGroupItem>
              {fca.chores.name}
              <Input
                type="checkbox"
                onClick={() => {
                  const updatedKitPetChores = {
                    id: fca.id,
                    // petId: pet.id,
                    // userId: activeUserId,
                    // choreId: fca.chores.id,
                    // dueDate: fca.dueDate,
                    // recurrance: fca.recurrance,
                    isCompleted: true,
                    dateCompleted: useDate
                  };
                  patchKidPetChore(updatedKitPetChores).then(() => {
                    if (fca.recurrance === "weekly") {
                      addKidPetChore( {
                        petId: pet.id,
                        userId: activeUserId,
                        choreId: fca.chores.id,
                        day: fca.day,
                        schedDate: scheduledDateWeekly,
                        recurrance: fca.recurrance,
                        isCompleted: false
                      })
                    } else {
                      addKidPetChore( {
                        petId: pet.id,
                        userId: activeUserId,
                        choreId: fca.chores.id,
                        day: fca.day,
                        schedDate: scheduledDateDaily,
                        recurrance: fca.recurrance,
                        isCompleted: false
                      })
                    
                    }
                    history.push("/");
                  });
                }}
              ></Input>
            </ListGroupItem>
          ))}
        </ListGroup>
      </CardBody>
    </Card>
  );
};
