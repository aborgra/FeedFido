import React from "react";
import { UserProvider } from "../users/UserProvider";
import { PetProvider } from "../pets/PetProvider";
import { ChoreProvider } from "../chores/ChoreProvider";
import { KidPetChoreProvider } from "../chores/KidPetChoreProvider";

export default props => {
  return (
    <>
      <KidPetChoreProvider>
        <PetProvider>
          <ChoreProvider>
            <UserProvider>{props.children}</UserProvider>
          </ChoreProvider>
        </PetProvider>
      </KidPetChoreProvider>
    </>
  );
};
