import React, { useContext } from "react";
import "./Kids.css";
import Child from "./Child";
import { UserContext } from "../users/UserProvider";

export default props => {
  const { users } = useContext(UserContext);

  const activeUserId = parseInt(localStorage.getItem("fido_user"));

  const userChildren =
    users.filter(user => user.parentId === activeUserId) || [];

  //   const allUserPets = pets.filter(pet => pet.userId === activeUserId) || []

  //   const allPetChoresArray =
  //     allUserPets.map(pet => {
  //       console.log("allUserPets", allUserPets)

  //       let allChildPetChores = [];
  //       let foundPetChores =
  //         pet.kidPetChores.map(kpc => {
  //           // if (kpc.userId === activeUserId) {
  //             // console.log("kpc", kpc);
  //             kpc.chores = chores.find(chore => kpc.choreId === chore.id)
  //             kpc.child = users.find(user => kpc.userId === user.id)
  //             allChildPetChores.push(kpc);
  //           // }
  //         }) || [];
  //       pet.foundChoresArray = allChildPetChores;
  //       return pet;
  //     }) || [];
  // console.log(allPetChoresArray)
  //   // const filteredPetChores =
  //   //   allPetChoresArray.filter(pc => pc.foundChoresArray.length !== 0) || [];

  return (
    <>
      <section className="parentKids">
        <img className="addChild" src={require("../pets/add-user.svg")}
        onClick={() => props.history.push("/addChild")}
        />
        <div className="kids__list">
          {userChildren.map(child => {
            return <Child {...props} key={child.id} child={child} />;
          })}
        </div>
      </section>
    </>
  );
};
