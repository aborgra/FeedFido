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

  const { users } = useContext(UserContext);



  

      const [event, setEvent] = useState({})
      const [buttonClicked, setButtonClicked] = useState(false)
      const [singleChore, setSingleChore] = useState({});
      const activeUserId = parseInt(localStorage.getItem("fido_user"));

      const editMode = props.match.params.hasOwnProperty("kpcId");
      // Not currently determining edit vs add
      const children = users.filter(user => user.parentId > 0) || []
      const userChildren = children.filter(child => child.parentId === activeUserId)
    
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
        }
      };
    
      useEffect(() => {
        setDefaults();
      }, [kidPetChores]);
    
  
     
      let closingTimeButtonClicked = false
  
      const constructNewKidPetChore = () => {
        if (editMode) {
          editKidPetChore({
            id: singleChore.id,
            petId: parseInt(singleChore.petId),
            userId: parseInt(singleChore.userId),
            choreId: parseInt(singleChore.choreId),
            dueDate: singleChore.dueDate,
            recurrance: "Daily",
            isCompleted: false
          }).then(() => props.history.push("/"));
        } else {
          console.log("parseInt(props.match.params.petId)", parseInt(props.match.params.petId))
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
            petId: parseInt(props.match.params.petId),
            userId: parseInt(singleChore.userId),
            choreId: parseInt(singleChore.choreId),
            dueDate: singleChore.dueDate,
            recurrance: "Daily",
            isCompleted: false
          }).then(() => props.history.push("/"));
        }
      };
    

  
  return (
    <>
    <form className="choreForm">
      <h2 className="choreForm__title">
        {editMode ? "Edit Chore" : "Add Chore"}
      </h2>
      
      <fieldset>
        <select
          defaultValue={singleChore.choreId}
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
          defaultValue={singleChore.userId}
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
        <div className="form-group">
          <label htmlFor="name">Due Date </label>
          <input type="date"
            name="dueDate" 
            required 
            autoFocus 
            className="form-control"
            proptype="varchar"
            placeholder=""
            defaultValue={singleChore.date}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      
      
      
     <fieldset>
       <checkbox>Recurring Event?</checkbox>
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
</>
  )
}
