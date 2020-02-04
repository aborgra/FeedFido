import React, { useContext } from "react";
import "./ChildPet.css";
import { PetContext } from "./PetProvider";
import { ChildPet } from "./ChildPet"
import { UserContext } from "../users/UserProvider"
import { KidPetChoreContext } from "../chores/KidPetChoreProvider";


export default props => {
  const { users } = useContext(UserContext);
  const { pets } = useContext(PetContext);
  const { kidPetChores } = useContext(KidPetChoreContext);
  console.log(pets)

  const activeUserId = parseInt(localStorage.getItem("fido_user"))
  const activeUser = users.find(user => user.id === activeUserId) || {}
  let allChildPetChores = []
  const petChoresArray = pets.filter(
    pet => {
      let singleChoreObj = pet.kidPetChores.map(kpc => {
        console.log(kpc)
        if (kpc.userId === activeUserId){
          return kpc}
      })
      if(singleChoreObj !== undefined && singleChoreObj !== []){return singleChoreObj} 

    }
    ) || []

    let filteredPetChoresArray = []
    petChoresArray.map(petChore => {
      if(petChore.kidPetChores.length > 0){
        filteredPetChoresArray.push(petChore)
      }
    })

    console.log("petChoresArray", petChoresArray)
    console.log("filtered", filteredPetChoresArray)
    // returning all chores of pets with at least one chore with userId of activeUser

  
  return (
    <div className="childPets">
      
        {allChildPetChores.map(kpc => {
       

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
