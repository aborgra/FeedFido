import React, { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../users/UserProvider";
import { ChoreContext } from "./ChoreProvider";
import { KidPetChoreContext } from "./KidPetChoreProvider";
import { Container, FormGroup, Label, Form, Modal, ModalHeader, Input } from "reactstrap";
import {DialogTitle} from 'reactstrap';
import {Dialog} from 'reactstrap';
import {Button} from 'reactstrap';
import {TextField} from 'reactstrap';
import {option} from 'reactstrap';
import {Select} from 'reactstrap';







export default props => {
  const { addChore, chores, editChore } = useContext(ChoreContext);
  const {
    addKidPetChore,
    kidPetChores,
    deleteKidPetChore,
    editKidPetChore
  } = useContext(KidPetChoreContext);

  const { users } = useContext(UserContext);
  const newChore = useRef("")
  // const [ButtonClicked, setButtonClicked] = useState(false);
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

  const constructNewChore = () => {
    let choreName = singleChore.newChore
    console.log("choreName", choreName)
    const foundChore = chores.find(chore => chore.name === choreName)
    console.log("foundChore", foundChore)
    if(foundChore === undefined){
    addChore({
      name: choreName
    })
    // .then(handleClose)
  }else(
    window.alert("Chore already exists")
  )
}

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

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  

  // const [open, setOpen] = React.useState(false);
  // const [selectedValue, setSelectedValue] = React.useState({});

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = value => {
  //   setOpen(false);
  //   // setSelectedValue(value);
  // };

  // const handleControlledChoreInputChange = event => {
  //   const addedChore = Object.assign({}, selectedValue);
  //   addedChore[event.target.name] = event.target.value;
  //   setSelectedValue(addedChore);
  // };

  return (
    <>
      <Container>
        <FormGroup className="choreForm">
          <h2 className="choreForm__title">
            {editMode ? "Edit Chore" : "Add Chore"}
          </h2>

          <Form>
            <Label>Select a Chore</Label>
            <Input
              type="select"
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
            </Input>
            <Button className="addChoreoption" onClick={toggle}>Add Chore</Button>
            <Modal isOpen={modal} toggle={toggle} className="choreDialog">
      <ModalHeader id="simple-dialog-title">Add Chore option</ModalHeader>
        <FormGroup>
          <Input id="standard-uncontrolled" className="form-group addChoreInput" type="text" id="standard" required autoFocus label="Add a Chore" variant="outlined" name="newChore" value={singleChore.newChore} onChange={handleControlledInputChange}
          />
        </FormGroup>
        <Button className="saveChoreButton" onClick={(evt) => {
          evt.preventDefault();
          constructNewChore();
          toggle()
        }}>
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
              className="form-control"
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
              type="select"
              value={singleChore.day}
              name="day"
              id="day"
              className="form-control"
              onChange={handleControlledInputChange}
              placeholder="Select Day"
            >
              <option value="0">Sunday</option>
              <option value="1">Monday</option>
              <option value="2">Tuesday</option>
              <option value="3">Wednesday</option>
              <option value="4">Thursday</option>
              <option value="5">Friday</option>
              <option value="6">Saturday</option>
            </Input>
          </FormGroup>

          <FormGroup>
            <Label>Recurring Event</Label>
            <Input type="checkbox" />
          </FormGroup>

          <div className="saveButtonContainer">
            <Button
              type="submit"
              onClick={evt => {
                evt.preventDefault();
                constructNewKidPetChore();
              }}
              className="btn btn-primary"
            >
              {editMode ? "Save changes" : "Save Chore"}
            </Button>
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
