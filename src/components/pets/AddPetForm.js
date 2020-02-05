import React, { useContext, useState, useEffect } from "react";
import { PetContext } from "./PetProvider";

export default props => {
  const { addPet, pets, deletPet } = useContext(PetContext);
  const [newPet, setNewPet] = useState({});

  const handleControlledInputChange = event => {
    const newSinglePet = Object.assign({}, newPet);
    newSinglePet[event.target.name] = event.target.value;
    setNewPet(newSinglePet);
  };

  const constructNewPet = () => {
    const foundPet = pets.find(pet => newPet.name === pet.name);
    if (foundPet === undefined) {
      addPet({
        name: newPet.name,
        pic: newPet.pic,
        userId: parseInt(localStorage.getItem("fido_user"))
      }).then(() => props.history.push("/"));
    }else{
      window.alert("Pet already exists")
    }
  };

  return (
    <form className="addPetForm">
      <h2 className="addPetForm__title">Add a Pet</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Pet Name </label>
          <input
            type="text"
            name="name"
            required
            autoFocus
            className="form-control"
            proptype="varchar"
            placeholder="Pet Name"
            defaultValue={newPet.name}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="pic">Pet Picture </label>
          <input
            type="file"
            name="pic"
            required
            autoFocus
            className="form-control"
            proptype="varchar"
            placeholder=""
            defaultValue={newPet.pic}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">{/* Pet Pic */}</div>
      </fieldset>
      <div className="saveButtonContainer">
        <button
          type="submit"
          onClick={evt => {
            evt.preventDefault();
            constructNewPet();
          }}
          className="btn btn-primary"
        >
          Save
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
