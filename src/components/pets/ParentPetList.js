import React, { useContext } from "react";
import "./Pets.css";
import { PetContext } from "./PetProvider";
import ParentPet from "./ParentPet";
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
  var options = { year: "numeric", month: "numeric", day: "numeric" };

  const [scheduledDate, x] = today.toLocaleString("en-US", options).split(",");

  const activeUserId = parseInt(localStorage.getItem("fido_user"));
  // const activeUser = users.find(user => user.id === activeUserId) || {}
  const allUserPets = pets.filter(pet => pet.userId === activeUserId) || [];

  

  const allPetChoresArray =
    allUserPets.map(pet => {

      let allChildPetChores = [];
      let foundPetChores =
        pet.kidPetChores.map(kpc => {
          kpc.chores = chores.find(chore => kpc.choreId === chore.id);
          kpc.child = users.find(user => kpc.userId === user.id);
          allChildPetChores.push(kpc);
          // }
        }) || [];
      const dailyChores = allChildPetChores.filter(
        cpchore =>
          (cpchore.day === dayOfWeek && !cpchore.hasOwnProperty("schedDate")) ||
          cpchore.schedDate === scheduledDate
      );

      pet.foundChoresArray = dailyChores;
      return pet;
    }) || [];
  // console.log(allPetChoresArray);
  // const filteredPetChores =
  //   allPetChoresArray.filter(pc => pc.foundChoresArray.length !== 0) || [];

  return (
    <>
      <section className="parentPets">
        <div className="pets__list">
          {allPetChoresArray.map(pc => {
            console.log("parentpetpc", pc)
            return <ParentPet {...props} key={pc.id} pet={pc} />;
          })}
        </div>
      </section>
    </>
  );
};
