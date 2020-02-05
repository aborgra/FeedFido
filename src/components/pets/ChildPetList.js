import React, { useContext } from "react";
import "./ChildPet.css";
import { PetContext } from "./PetProvider";
import { ChildPet } from "./ChildPet";
import { UserContext } from "../users/UserProvider";
import { KidPetChoreContext } from "../chores/KidPetChoreProvider";

export default props => {
  const { users } = useContext(UserContext);
  const { pets } = useContext(PetContext);
  const { kidPetChores } = useContext(KidPetChoreContext)

console.log("pets", pets)

  const activeUserId = parseInt(localStorage.getItem("fido_user"));
  const activeUser = users.find(user => user.id === activeUserId) || {}
  const petChoresArray =
    pets.map(pet => {
      let allChildPetChores = []
      let foundPetChores = pet.kidPetChores.map(kpc => {
        if (kpc.userId === activeUserId) {
          console.log("kpc", kpc)
          allChildPetChores.push(kpc)}}) || []
      pet.foundChoresArray = allChildPetChores
      return pet}) || [];

 

  console.log("allChildPetChores", petChoresArray);


  return (
    <div className="childPets">
      {petChoresArray.map(kpc => {
        return (
          <div>{kpc.kidPetChores.dueDate}</div>
          // <ChildPet
          //   key={kpc.id}
          //   kpc={kpc}
          // />
        );
      })}
    </div>
  );
};
