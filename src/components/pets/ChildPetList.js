import React, { useContext } from "react";
import "./ChildPet.css";
import { PetContext } from "./PetProvider";
import ChildPet from "./ChildPet";
import { UserContext } from "../users/UserProvider";
import { KidPetChoreContext } from "../chores/KidPetChoreProvider";
import { ChoreContext } from "../chores/ChoreProvider";

export default props => {
  const { users } = useContext(UserContext);
  const { pets } = useContext(PetContext);
  const { kidPetChores } = useContext(KidPetChoreContext);
  const { chores } = useContext(ChoreContext);
  const today = new Date();
  const dayOfWeek = today.getDay();
  const activeUserId = parseInt(localStorage.getItem("fido_user"));
  var options = { year: "numeric", month: "numeric", day: "numeric" };

  const [scheduledDate, x] = today.toLocaleString("en-US", options).split(",");

  const allPetChoresArray =
    pets.map(pet => {
      let allChildPetChores = [];
      let foundPetChores = pet.kidPetChores.filter(
        kpc =>
          (kpc.day === dayOfWeek && !kpc.hasOwnProperty("schedDate")) ||
          kpc.schedDate === scheduledDate
      );
      let foundkpc =
        foundPetChores.map(fkpc => {
          // console.log(fkpc, "fkpc")
          if (fkpc.userId === activeUserId && fkpc.isCompleted === false) {
            fkpc.chores = chores.find(chore => fkpc.choreId === chore.id);
            allChildPetChores.push(fkpc);
          }
        }) || [];
      pet.foundChoresArray = allChildPetChores;
      return pet;
    }) || [];

  const filteredPetChores =
    allPetChoresArray.filter(pc => pc.foundChoresArray.length !== 0) || [];

  const childListRender = () => {
    if (filteredPetChores.length === 0) {
      return <div className="childMessageContainer"><h2 className="childMessage">You Have No Chores For Today</h2>
        <img className="happyDogPic" src={require("../pics/happyDog.svg")}/></div>
    } else if (filteredPetChores === []){}
    else {
      return (
        <>
          {filteredPetChores.map(fpc => {
            return(
            <ChildPet {...props} key={fpc.id} pet={fpc} />)
          })}
        </>
      );
    }
  };

  return (
    <>
      <div className="childPets">
        <div className="childListContainer">{childListRender()}</div>
      </div>
    </>
  );
};
