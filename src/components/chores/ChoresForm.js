import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../users/UserProvider";
import { ChoreContext } from "./ChoreProvider";
import { KidPetChoreContext } from "./KidPetChoreProvider";
import { Container } from "@material-ui/core";

export default props => {
  const { addChore, chores, editChore } = useContext(ChoreContext);
  const {
    addKidPetChore,
    kidPetChores,
    deleteKidPetChore,
    editKidPetChore
  } = useContext(KidPetChoreContext);

  const { users } = useContext(UserContext);

  const [buttonClicked, setButtonClicked] = useState(false);
  const [singleChore, setSingleChore] = useState({});
  const activeUserId = parseInt(localStorage.getItem("fido_user"));

  const editMode = props.match.params.hasOwnProperty("kpcId");
  // Not currently determining edit vs add
  const children = users.filter(user => user.parentId > 0) || [];
  const userChildren = children.filter(
    child => child.parentId === activeUserId
  );

  const handleControlledInputChange = event => {
    const newSingleChore = Object.assign({}, singleChore);
    newSingleChore[event.target.name] = event.target.value;
    setSingleChore(newSingleChore);
  };

  const setDefaults = () => {
    if (editMode) {
      const kpcId = parseInt(props.match.params.kpcId);
      console.log(kpcId, "kpcId");
      const selectedKidPetChore =
        kidPetChores.find(chore => chore.id === kpcId) || {};
      setSingleChore(selectedKidPetChore);
      console.log("selectedKidPetChore", selectedKidPetChore);
    }
  };

  useEffect(() => {
    setDefaults();
  }, [kidPetChores]);

  const constructNewKidPetChore = () => {
    if (editMode) {
      editKidPetChore({
        id: singleChore.id,
        petId: parseInt(singleChore.petId),
        userId: parseInt(singleChore.userId),
        choreId: parseInt(singleChore.choreId),
        day: parseInt(singleChore.day),
        recurrance: "Daily",
        isCompleted: false
      }).then(() => props.history.push("/"));
    } else {
      console.log(
        "parseInt(props.match.params.petId)",
        parseInt(props.match.params.petId)
      );
      addKidPetChore({
        id: singleChore.id,
        petId: parseInt(props.match.params.petId),
        userId: parseInt(singleChore.userId),
        choreId: parseInt(singleChore.choreId),
        day: parseInt(singleChore.day),
        recurrance: "Daily",
        isCompleted: false
      }).then(() => props.history.push("/"));
    }
  };

  return (
    <>
      <Container>
        <form className="choreForm">
          <h2 className="choreForm__title">
            {editMode ? "Edit Chore" : "Add Chore"}
          </h2>

          <fieldset>
            <select
              value={singleChore.choreId}
              name="choreId"
              id="choreId"
              className="form-control"
              onChange={handleControlledInputChange}
            >
              <option value="0">Select a Chore</option>
              {chores.map(chore => (
                <option key={chore.id} value={chore.id}>
                  {chore.name}
                </option>
              ))}
            </select>
          </fieldset>
          <fieldset>
            <select
              value={singleChore.userId}
              name="userId"
              id="userId"
              className="form-control"
              onChange={handleControlledInputChange}
            >
              <option value="0">Select a Child</option>
              {userChildren.map(child => (
                <option key={child.id} value={child.id}>
                  {child.userName}
                </option>
              ))}
            </select>
          </fieldset>

          <fieldset>
            <select
              value={singleChore.day}
              name="day"
              id="day"
              className="form-control"
              onChange={handleControlledInputChange}
            >
              <option value="0">Sunday</option>
              <option value="1">Monday</option>
              <option value="2">Tuesday</option>
              <option value="3">Wednesday</option>
              <option value="4">Thursday</option>
              <option value="5">Friday</option>
              <option value="6">Saturday</option>
            </select>
          </fieldset>

          <fieldset>
            <label>Recurring Event</label>
            <input type="checkbox" />
          </fieldset>

          <div className="saveButtonContainer">
            <button
              type="submit"
              onClick={evt => {
                evt.preventDefault();
                constructNewKidPetChore();
              }}
              className="btn btn-primary"
            >
              {editMode ? "Save changes" : "Add Chore"}
            </button>
            <button
              className=" closeBtn btn btn-light"
              onClick={() => props.history.push("/")}
            >
              Close
            </button>
          </div>
        </form>
      </Container>
    </>
  );
};
