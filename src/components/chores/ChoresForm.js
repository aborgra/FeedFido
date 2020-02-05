import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../users/UserProvider";
import { ChoreContext } from "./ChoreProvider";
import { KidPetChoreContext } from "./KidPetChoreProvider";
export default props => {
  const { addChore, chores, editChore } = useContext(ChoreContext);
  const {
    addKidPetChore,
    kidPetChores,
    deleteKidPetChore,
    editKidPetChore
  } = useContext(KidPetChoreContext);
  const [singleChore, setSingleChore] = useState({});

  const editMode = props.match.params.hasOwnProperty("choreId")
  // Not currently determining edit vs add

  const handleControlledInputChange = event => {
    
    const newSingleChore = Object.assign({}, singleChore);
    newSingleChore[event.target.name] = event.target.value;
    setSingleChore(newSingleChore);
  };

  const setDefaults = () => {
    if (editMode) {
      const kpcId = parseInt(props.match.params.kpcId);
      const selectedKidPetChore =
        kidPetChores.find(chore => chore.id === kpcId) || {};
      setSingleChore(selectedKidPetChore);
    }
  };

  useEffect(() => {
    setDefaults();
  }, [kidPetChores]);

  const constructNewKidPetChore = () => {
    if (editMode) {
      editKidPetChore({
        id: singleChore.id,
        petId: singleChore.petId,
        userId: singleChore.userId,
        choreId: singleChore.choreId,
        dueDate: singleChore.dueDate,
        recurrance: singleChore.recurrance,
        isCompleted: singleChore.complete
      }).then(() => props.history.push("/"));
    } else {
      let formattedDate = new Date().toString();
      formattedDate = formattedDate.split(" ");
      formattedDate[0] += ".";
      formattedDate[1] += ".";
      let formattedTime = formattedDate[4].split(":");
      let formattedHour = parseInt(formattedTime[0], 10);
      if (formattedHour > 11) {
        formattedHour -= 12;
        if ((formattedHour = 0)) {
          formattedHour = 12;
        }
        formattedTime[0] = formattedHour.toString();
        formattedDate[5] = "PM";
      } else {
        formattedDate[5] = "AM";
      }
      formattedDate[4] = formattedTime.slice(0, 2).join(":");
      formattedDate = formattedDate.slice(0, 6).join(" ");
      addKidPetChore({
        id: singleChore.id,
        petId: props.match.params.hasOwnProperty("petId"),
        userId: singleChore.child,
        choreId: singleChore.chore,
        dueDate: singleChore.dueDate,
        recurrance: singleChore.recurrance,
        isCompleted: singleChore.complete
      }).then(() => props.history.push("/"));
    }
  };

  return (
    <form className="choreForm">
      <h2 className="choreForm__title">
        {editMode ? "Edit Chore" : "Add Chore"}
      </h2>
      {/* <fieldset>
        <div className="form-group">
          <label htmlFor="name">Title </label>
          <input type="text" name="title" required autoFocus className="form-control"
   
            proptype="varchar"
            placeholder="News Title"
            defaultValue={singleNews.title}
            onChange={handleControlledInputChange}
          />
        </div> */}
      {/* </fieldset> */}
      <fieldset>
        <select
          defaultValue=""
          name="choreId"
          id="chore"
          className="form-control"
        >
          <option value="0">Select a Chore</option>
          {chores.map(chore => (
            <option key={chore.id} value={chore.id}>
              {chore.name}
            </option>
          ))}
        </select>
      </fieldset>
      {/* <fieldset>
        <div className="form-group">
          <label htmlFor="name">URL </label>
          <input type="text" name="url" required autoFocus className="form-control"

            proptype="varchar"
            placeholder="url"
            defaultValue={singleNews.url}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset> */}
      {/* <fieldset>
        <div className="form-group">
          <label htmlFor="treatment">Synopsis </label>
          <textarea cols="23" type="text" name="synopsis" className="form-control"
           
            proptype="varchar"
            placeholder="What's slothing?"
            value={singleNews.synopsis}
            onChange={handleControlledInputChange}>
          </textarea>
        </div>
      </fieldset> */}
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
  );
};
