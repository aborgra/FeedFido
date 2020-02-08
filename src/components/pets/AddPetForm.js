import React, { useContext, useState, useEffect } from "react";
import { PetContext } from "./PetProvider";
import "./AddPet.css";
// import { render } from "@testing-library/react";
// import { Image, CloudinaryContext } from 'cloudinary-react'
import FormGroup from '@material-ui/core/FormGroup';


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
        type: newPet.type,
        userId: parseInt(localStorage.getItem("fido_user"))
      }).then(() => props.history.push("/"));
    } else {
      window.alert("Pet already exists");
    }
  }


  return (
    <section className="PetFormContainer">
      <FormGroup className="addPetForm">
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
          <select
            value={newPet.type}
            name="type"
            id="type"
            className="form-control"
            onChange={handleControlledInputChange}
          >
            <option value="0">Pet Type</option>
            <option value="1">Cat</option>
            <option value="2">Dog</option>
            <option value="3">Small Pet</option>
            <option value="4">Fish</option>
            <option value="5">Bird</option>
            <option value="6">Reptile</option>
            <option value="7">Other</option>

          </select>
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
            Cancel
          </button>
        </div>
      </FormGroup>
    </section>
  );
  }
