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
  const { kidPetChores } = useContext(KidPetChoreContext)
  const { chores } = useContext(ChoreContext)
  const today = new Date()
  const dayOfWeek = today.getDay()

  const activeUserId = parseInt(localStorage.getItem("fido_user"));
  // const activeUser = users.find(user => user.id === activeUserId) || {}
  const allPetChoresArray =
    pets.map(pet => {
      let allChildPetChores = []
      let foundPetChores = pet.kidPetChores.map(kpc => {
        if (kpc.userId === activeUserId && kpc.isCompleted === false && kpc.day === dayOfWeek) {
          kpc.chores = chores.find(chore => kpc.choreId === chore.id)
          allChildPetChores.push(kpc)}}) || []
      pet.foundChoresArray = allChildPetChores
      return pet}) || [];

      const filteredPetChores = allPetChoresArray.filter (pc => pc.day !== 0 
        // && pc.day === dayOfWeek
        
      ) || []

 console.log("filteredPetChored", filteredPetChores, dayOfWeek)

  return (
    <div className="childPets">
      {filteredPetChores.map(fpc => {
        return (
          <ChildPet {...props}
            key={fpc.id}
            pet={fpc}
          />
        );
      })}
    </div>
  );
};
