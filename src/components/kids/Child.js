import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { UserContext } from "../users/UserProvider";
import { KidPetChoreContext } from "../chores/KidPetChoreProvider";

export default ({ child, history }) => {
  const { deleteUser } = useContext(UserContext)
  const { kidPetChores, deleteKidPetChore } = useContext(KidPetChoreContext)



  return (
    <section className="childCard">
      <h2 className="child__name">{child.userName}</h2>
      <section>
                <img
                  src={require("../pets/edit.svg")}
                  className="edit__icon"
                  onClick={() => {
                    history.push(`/editChild/${child.id}`);
                  }}
                />
                <img
                  src={require("../pets/delete.svg")}
                  className="delete__icon"
                  onClick={() => {
                    let confirm = window.confirm("Delete this child and all child's events?")
                  if (confirm === true){
                    // kidPetChores.map ( kpc => {
                    //   if(kpc.user.id === child.id) {
                    //     deleteKidPetChore(kpc)
                    //   }
                    // })
                    deleteUser(child)} 
                  }}
                />
              </section>

      <button
        className="graphButton btn btn-primary" 
        onClick={() => {
          history.push(`/child/graph/${child.id}`);
        }}
      >
        Graph
      </button>
    </section>
  );
};
