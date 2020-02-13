import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { KidPetChoreContext } from "../chores/KidPetChoreProvider";
import { Card, ListGroup, ListGroupItem } from "reactstrap";
import { PetContext } from "./PetProvider";


export default ({ pet, history }) => {
  const { deleteKidPetChore } = useContext(KidPetChoreContext);
  const { pets, deletePet } = useContext(PetContext)
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
      
      </div>
      <div className="addPetButtonContainer">
      <img
        src={require("./plus.svg")}
        className="addPet"
        onClick={() => {
          history.push(`/addChore/${pet.id}`);
        }}
      />
      </div>
      <section>
        <ListGroup className="pet__chores">
          {pet.foundChoresArray.map(fca => (
            <ListGroupItem
              className={
                fca.isCompleted
                  ? (choreItemCompleted = "choreCompleted petChore")
                  : (choreItemCompleted = "notCompleted petChore")
              }
            >
              <div className="choreName">{fca.chores.name}</div><div className="child__name">{fca.child.userName}</div>
              <section>
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
              </section>
            </ListGroupItem>
          ))}
        </ListGroup>
        <section className="editPetIcons">
                <img
                  src={require("../pets/edit.svg")}
                  className="edit__icon"
                  onClick={() => {
                    history.push(`/editPet/${pet.id}`);
                  }}
                />
                <img
                  src={require("../pets/delete.svg")}
                  className="delete__icon"
                  onClick={() => {
                    let confirm = window.confirm("Delete this pet and all pet's chores?")
                  if (confirm === true){
                    // kidPetChores.map ( kpc => {
                    //   if(kpc.user.id === child.id) {
                    //     deleteKidPetChore(kpc)
                    //   }
                    // })
                    deletePet(pet).then(history.push("/"))} 
                  }}
                />
              </section>
      </section>
    </Card>
  );
};
