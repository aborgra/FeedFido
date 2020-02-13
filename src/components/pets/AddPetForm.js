import React, { useContext, useState, useEffect } from "react";
import { PetContext } from "./PetProvider";
import "./AddPet.css";
// import { render } from "@testing-library/react";
// import { Image, CloudinaryContext } from 'cloudinary-react'
import { Label, Input, Button, FormGroup } from "reactstrap";

export default props => {
  const { addPet, pets, editPet } = useContext(PetContext);
  const [newPet, setNewPet] = useState({});
  const editMode = props.match.params.hasOwnProperty("petId");


  const handleControlledInputChange = event => {
    const newSinglePet = Object.assign({}, newPet);
    newSinglePet[event.target.name] = event.target.value;
    setNewPet(newSinglePet);
  };

  const setDefaults = () => {
    if (editMode) {
      const petId = parseInt(props.match.params.petId);
      console.log(petId, "petId");
      const selectedPet =
        pets.find(pet => pet.id === petId) || {};
      setNewPet(selectedPet);
      console.log("selectedPet", selectedPet);
    }
  };

  useEffect(() => {
    setDefaults();
  }, [pets]);


  const constructNewPet = () => {

    if (editMode) {
      editPet({
            id: newPet.id,
            name: newPet.name,
            type: newPet.type,
            userId: parseInt(localStorage.getItem("fido_user"))
        })
            .then(() => props.history.push("/"))
    } else {

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
  }}

  return (
    <section className="petFormContainer">
      <FormGroup className="addPetForm">
        <h2 className="addPetForm__title">Add a Pet</h2>
        <fieldset>
          <div className="form-group">
            <Label htmlFor="name">Pet Name </Label>
            <Input
              type="text"
              name="name"
              required
              autoFocus
              className="form-control petName"
              proptype="varchar"
              placeholder="Pet Name"
              defaultValue={newPet.name}
              onChange={handleControlledInputChange}
            />
          </div>
        </fieldset>
        <fieldset>
          <Label htmlFor="type">Pet Type </Label>
          <Input
            type="select"
            value={newPet.type}
            name="type"
            id="type"
            className="form-control petType"
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
          </Input>
        </fieldset>
        <div className="saveButtonContainer">
          <button
            type="submit"
            onClick={evt => {
              evt.preventDefault();
              constructNewPet();
            }}
            className="savePetBtn btn btn-primary"
          >
            Save
          </button>
          <Button
            className=" closeBtn btn btn-light"
            onClick={() => props.history.push("/")}
          >
            Cancel
          </Button>
        </div>
      </FormGroup>
    </section>
  );
};
