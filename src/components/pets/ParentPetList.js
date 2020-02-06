import React, { useContext } from "react";
import "./Pets.css";
import { PetContext } from "./PetProvider";
import ParentPet from "./ParentPet";
import { UserContext } from "../users/UserProvider";
import { KidPetChoreContext } from "../chores/KidPetChoreProvider";
import { ChoreContext } from "../chores/ChoreProvider";
import { Button } from '@material-ui/core'

export default props => {
  const { users } = useContext(UserContext);
  const { pets } = useContext(PetContext);
  const { kidPetChores } = useContext(KidPetChoreContext);
  const { chores } = useContext(ChoreContext);


  const activeUserId = parseInt(localStorage.getItem("fido_user"));
  // const activeUser = users.find(user => user.id === activeUserId) || {}
  const allUserPets = pets.filter(pet => pet.userId === activeUserId) || []
  
  
  const allPetChoresArray =
    allUserPets.map(pet => {
      console.log("allUserPets", allUserPets)

      let allChildPetChores = [];
      let foundPetChores =
        pet.kidPetChores.map(kpc => {
          // if (kpc.userId === activeUserId) {
            // console.log("kpc", kpc);
            kpc.chores = chores.find(chore => kpc.choreId === chore.id)
            kpc.child = users.find(user => kpc.userId === user.id)
            allChildPetChores.push(kpc);
          // }
        }) || [];
      pet.foundChoresArray = allChildPetChores;
      return pet;
    }) || [];
console.log(allPetChoresArray)
  // const filteredPetChores =
  //   allPetChoresArray.filter(pc => pc.foundChoresArray.length !== 0) || [];

  return (
    <>
      <section className="parentPets">
      <img className="addPetIcon"
              src={require("./addPet.svg")}
         onClick={() => props.history.push("/addPet")}
          
        />
        <div className="pets__list">
          {allPetChoresArray.map(pc => {
            return <ParentPet {...props} key={pc.id} pet={pc} />;
          })}
        </div>
      </section>
    </>
  );
};
