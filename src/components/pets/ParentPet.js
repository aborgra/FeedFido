import React from "react";
import { Link } from "react-router-dom";

export default ({ pet, history }) => {
  return (
    <section className="petCard">
      <h3 className="pet__name">{pet.name}</h3>
      {/* <img className="pet__pic">{pet.pic}</img> */}
      <button
              className="btn btn-light"
              onClick={() => {
                history.push(`/addChore/${pet.id}`);
              }}
            >
              Add Chore
            </button>
      <ul className="pet__chores">
        {pet.foundChoresArray.map(fca => (
          <li>
            {fca.chores.name} Due:{fca.dueDate} Assigned to:{fca.child.userName}
            <button
              className="btn btn-light"
              onClick={() => {
                history.push(`/editChore/${pet.kidPetChores.id}`);
              }}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};
