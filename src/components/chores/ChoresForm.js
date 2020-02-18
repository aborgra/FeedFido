import React, { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../users/UserProvider";
import { ChoreContext } from "./ChoreProvider";
import { KidPetChoreContext } from "./KidPetChoreProvider";
import {
  Container,
  FormGroup,
  Label,
  Form,
  Modal,
  ModalHeader,
  Input,
  Alert
} from "reactstrap";
import { Button } from "reactstrap";
import "./ChoreForm.css";
import moment from "moment";
import { PetContext } from "../pets/PetProvider";

export default props => {
  const { addChore, chores, editChore } = useContext(ChoreContext);
  const {
    addKidPetChore,
    kidPetChores,
    deleteKidPetChore,
    editKidPetChore
  } = useContext(KidPetChoreContext);
  const { pets } = useContext(PetContext)
  const { users } = useContext(UserContext);
  const newChore = useRef("");
  // const [ButtonClicked, setButtonClicked] = useState(false);
  const [singleChore, setSingleChore] = useState({});
  const activeUserId = parseInt(localStorage.getItem("fido_user"));
  const foundPet = pets.find(pet => pet.id === parseInt(props.match.params.petId)) || {}
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

console.log(singleChore.schedDate, "date")

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

  const constructNewChore = () => {
    let choreName = singleChore.newChore;
    console.log("choreName", choreName);
    const foundChore = chores.find(chore => chore.name === choreName);
    console.log("foundChore", foundChore);
    if (foundChore === undefined) {
      addChore({
        name: choreName
      });
    } else {
     window.alert("Chore already exists")
    }
    
  
  };

  const constructNewKidPetChore = () => {
    let chosenDate = moment(singleChore.schedDate).format('l')
    console.log("chosenDate", chosenDate)
    

    if (editMode) {
      editKidPetChore({
        id: singleChore.id,
        petId: parseInt(singleChore.petId),
        userId: parseInt(singleChore.userId),
        choreId: parseInt(singleChore.choreId),
        schedDate: chosenDate,
        recurrance: singleChore.recurrance,
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
        schedDate: chosenDate,
        recurrance: singleChore.recurrance,
        isCompleted: false
      }).then(() => props.history.push("/"));
    }
  };

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <>
      <Container className="choreFormContainer">
        <FormGroup className="choreForm">
          <h2 className="choreForm__title">
            {editMode ? "Edit Chore" : `Add Chore for ${foundPet.name}`}
          </h2>

          <Form>
            <Label>Select a Chore</Label>
            <Input
              type="select"
              value={singleChore.choreId}
              name="choreId"
              id="choreId"
              className="form-control choreDropdown"
              onChange={handleControlledInputChange}
            >
              <option className="optionDropdown" value="0">Select a Chore</option>
              {chores.map(chore => (
                <option className="optionDropdown" key={chore.id} value={chore.id}>
                  {chore.name}
                </option>
              ))}
            </Input>
            <Button className="addChoreoption" color="primary" onClick={toggle}>
              Add Chore
            </Button>
            <Modal isOpen={modal} 
            toggle={toggle} 
            className="choreDialog">
              <ModalHeader id="simple-dialog-title">
                Add Chore Option
              </ModalHeader>
              <FormGroup>
                <Input
                  id="standard-uncontrolled"
                  className="form-group addChoreInput"
                  type="text"
                  id="standard"
                  required
                  autoFocus
                  label="Add a Chore"
                  variant="outlined"
                  name="newChore"
                  value={singleChore.newChore}
                  onChange={handleControlledInputChange}
                />
              </FormGroup>
              <Button
                className="saveChoreButton btn" color="primary"
                onClick={evt => {
                  evt.preventDefault();
                  constructNewChore();
                  toggle();
                }}
              >
                Save Chore
              </Button>
            </Modal>
            {/* <Modal  open={open} onClose={handleClose} /> */}
          </Form>
          <FormGroup>
            <Label>Select a Child</Label>
            <Input
              type="select"
              value={singleChore.userId}
              name="userId"
              id="userId"
              className="form-control choreChild"
              onChange={handleControlledInputChange}
              placeholder="Select a Child"
            >
              <option value="0">Select a Child</option>
              {userChildren.map(child => (
                <option key={child.id} value={child.id}>
                  {child.userName}
                </option>
              ))}
            </Input>
          </FormGroup>

          <FormGroup>
            <Label>Select Day</Label>

            <Input
              type="date"
              value={moment(singleChore.schedDate).format('YYYY-MM-DD')}
              name="schedDate"
              id="schedDate"
              className="form-control choreDate"
              onChange={handleControlledInputChange}
              placeholder="Select Day"
            >
            </Input>
          </FormGroup>

          <FormGroup>
            <Label>Recurring Event</Label>
            <Input
              type="select"
              value={singleChore.recurrance}
              name="recurrance"
              id="recurrance"
              className="form-control choreRecurring"
              onChange={handleControlledInputChange}
              placeholder="Select Frequency"
            >
              <option value="0">None</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </Input>
          </FormGroup>

          <div className="saveButtonContainer">
            <button
              type="submit"
              onClick={evt => {
                evt.preventDefault();
                constructNewKidPetChore();
              }}
              className="btn btn-primary"
            >
              {editMode ? "Save changes" : "Save Chore"}
            </button>
            <Button
              className=" closeBtn btn btn-light"
              onClick={() => props.history.push("/")}
            >
              Close
            </Button>
          </div>
        </FormGroup>
      </Container>
    </>
  );
};
