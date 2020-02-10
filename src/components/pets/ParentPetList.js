import React, { useContext } from "react";
import "./Pets.css";
import { PetContext } from "./PetProvider";
import ParentPet from "./ParentPet";
import { UserContext } from "../users/UserProvider";
import { KidPetChoreContext } from "../chores/KidPetChoreProvider";
import { ChoreContext } from "../chores/ChoreProvider";
import Drawer from "@material-ui/core/Drawer";
import toggleDrawer from "@material-ui/core/Drawer";
import sideList from "@material-ui/core/Drawer";
import state from "@material-ui/core/Drawer";

export default props => {
  const { users } = useContext(UserContext);
  const { pets } = useContext(PetContext);
  const { kidPetChores } = useContext(KidPetChoreContext);
  const { chores } = useContext(ChoreContext);
  const today = new Date();
  const dayOfWeek = today.getDay();

  const activeUserId = parseInt(localStorage.getItem("fido_user"));
  // const activeUser = users.find(user => user.id === activeUserId) || {}
  const allUserPets = pets.filter(pet => pet.userId === activeUserId) || [];

  // const renderDrawer = () => {
  //   return (
  //     <>
  //       <img
  //         src={require("./plus.svg")}
  //         onClick={() => {
  //           toggleDrawer("right", true);
  //         }}
  //       />
  //       <Drawer
  //         anchor="right"
  //         open={state.right}
  //         onClose={() => {
  //           toggleDrawer("right", false);
  //         }}
  //       >
  //         {sideList("right")}
  //       </Drawer>
  //     </>
  //   );
  // };

  const allPetChoresArray =
    allUserPets.map(pet => {
      console.log("allUserPets", allUserPets);

      let allChildPetChores = [];
      let foundPetChores =
        pet.kidPetChores.map(kpc => {
          // if (kpc.userId === activeUserId) {
          // console.log("kpc", kpc);
          kpc.chores = chores.find(chore => kpc.choreId === chore.id);
          kpc.child = users.find(user => kpc.userId === user.id);
          allChildPetChores.push(kpc);
          // }
        }) || [];
      const dailyChores = allChildPetChores.filter(
        cpchore => cpchore.day === dayOfWeek
      );
      pet.foundChoresArray = dailyChores;
      return pet;
    }) || [];
  console.log(allPetChoresArray);
  // const filteredPetChores =
  //   allPetChoresArray.filter(pc => pc.foundChoresArray.length !== 0) || [];

  return (
    <>
      <section className="parentPets">
        <div className="pets__list">
          {allPetChoresArray.map(pc => {
            return <ParentPet {...props} key={pc.id} pet={pc} />;
          })}
        </div>
      </section>
    </>
  );
};
