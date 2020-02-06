import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { KidPetChoreContext } from "../chores/KidPetChoreProvider";
import { CardContent, CardActions, Card, Typography } from "@material-ui/core";


export default ({pet, history}) => {
  const { patchKidPetChore } = useContext(KidPetChoreContext)
  const activeUserId = parseInt(localStorage.getItem("fido_user"));
return (
    <Card className="petCard">
        <h3 className="pet__name">{pet.name}</h3>
        {/* <img className="pet__pic">{pet.pic}</img> */}

        <CardContent>
        <ul className="pet__chores">
 
        {pet.foundChoresArray.map(fca => (
        <li>{fca.chores.name}
        <input
          onClick={() => {
            const updatedKitPetChores = {
              id: fca.id,
              petId: pet.id,
              userId: activeUserId,
              choreId: fca.chores.id,
              dueDate: fca.dueDate,
              recurrance: fca.recurrance,
              isCompleted: true
            };
            patchKidPetChore(updatedKitPetChores).then(() => history.push("/"));
          }}
          type="checkbox"
        />
        </li>))}
        </ul>
        
        </CardContent>
    </Card>
)}





