import React, { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../users/UserProvider";
import { ChoreContext } from "./ChoreProvider";
import { KidPetChoreContext } from "./KidPetChoreProvider";
import { Container, Select, Checkbox } from "@material-ui/core";
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';






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
    let choreName = newChore.current.value
    console.log("choreName", choreName)
    const foundChore = chores.find(chore => chore.name === choreName)
    console.log("foundChore", foundChore)
    if(foundChore === undefined){
    addChore({
      name: choreName
    }).then(handleClose)
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

  function SimpleDialog(props) {
    // const classes = useStyles();
    const { onClose, open } = props;
    const handleClose = () => {
      onClose(singleChore);
    };
  
    // const handleListItemClick = value => {
    //   onClose(value);
    // };
    
    return (
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Add Chore MenuItem</DialogTitle>
        <FormControl>
          <input id="standard-uncontrolled" className="form-group addChoreInput" type="text" id="standard" required autoFocus label="Add a Chore" variant="outlined" name="name" defaultValue={""} ref={newChore}  
          />
        </FormControl>
        <Button className="saveChoreButton" onClick={(evt) => {
          evt.preventDefault();
          constructNewChore()
        }}>
          Save Chore
        </Button>
      </Dialog>
    );
  }

  const [open, setOpen] = React.useState(false);
  // const [selectedValue, setSelectedValue] = React.useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = value => {
    setOpen(false);
    // setSelectedValue(value);
  };

  // const handleControlledChoreInputChange = event => {
  //   const addedChore = Object.assign({}, selectedValue);
  //   addedChore[event.target.name] = event.target.value;
  //   setSelectedValue(addedChore);
  // };

  return (
    <>
      <Container>
        <FormControl className="choreForm">
          <h2 className="choreForm__title">
            {editMode ? "Edit Chore" : "Add Chore"}
          </h2>

          <FormControl>
            <InputLabel>Select a Chore</InputLabel>
            <Select
              value={singleChore.choreId}
              name="choreId"
              id="choreId"
              className="form-control"
              onChange={handleControlledInputChange}
            >
              {/* <MenuItem value="0">Select a Chore</MenuItem> */}
              {chores.map(chore => (
                <MenuItem key={chore.id} value={chore.id}>
                  {chore.name}
                </MenuItem>
              ))}
            </Select>
            <Button className="addChoreMenuItem" onClick={handleClickOpen}>Add Chore</Button>
            <SimpleDialog  open={open} onClose={handleClose} />
          </FormControl>
          <FormControl>
          <InputLabel>Select a Child</InputLabel>
            <Select
              value={singleChore.userId}
              name="userId"
              id="userId"
              className="form-control"
              onChange={handleControlledInputChange}
              placeholder="Select a Child"
            >
              {/* <MenuItem value="0">Select a Child</MenuItem> */}
              {userChildren.map(child => (
                <MenuItem key={child.id} value={child.id}>
                  {child.userName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl>
          <InputLabel>Select Day</InputLabel>

            <Select
              value={singleChore.day}
              name="day"
              id="day"
              className="form-control"
              onChange={handleControlledInputChange}
              placeholder="Select Day"
            >
              <MenuItem value="0">Sunday</MenuItem>
              <MenuItem value="1">Monday</MenuItem>
              <MenuItem value="2">Tuesday</MenuItem>
              <MenuItem value="3">Wednesday</MenuItem>
              <MenuItem value="4">Thursday</MenuItem>
              <MenuItem value="5">Friday</MenuItem>
              <MenuItem value="6">Saturday</MenuItem>
            </Select>
          </FormControl>

          <FormControl>
            <label>Recurring Event</label>
            <Checkbox type="checkbox" />
          </FormControl>

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
        </FormControl>
      </Container>
    </>
  );
};
