import React, { useContext, useState, useEffect } from "react"
import { UserContext } from "../users/UserProvider"
import "./Kids.css"


export default props => {
  const { addUser, users, editUser } = useContext(UserContext)
  const [newUser, setNewUser] = useState({})
  const editMode = props.match.params.hasOwnProperty("childId");

  
  const handleControlledInputChange = (event) => {
   
    const newSingleUser = Object.assign({}, newUser)
    newSingleUser[event.target.name] = event.target.value
    setNewUser(newSingleUser)
  }

  const setDefaults = () => {
    if (editMode) {
      const childId = parseInt(props.match.params.childId);
      console.log(childId, "childId");
      const selectedChild =
        users.find(user => user.id === childId) || {};
      setNewUser(selectedChild);
      console.log("selectedChild", selectedChild);
    }
  };

  useEffect(() => {
    setDefaults();
  }, [users]);

  const constructNewUser = () => {

    if (editMode) {
      editUser({
            id: newUser.id,
            userName: newUser.userName,
            password: newUser.password,
            parentId: parseInt(localStorage.getItem("fido_user"))
        })
            .then(() => props.history.push("/"))
    } else {
    
        addUser({
            userName: newUser.userName,
            password: newUser.password,
            parentId: parseInt(localStorage.getItem("fido_user"))
        })
            .then(() => props.history.push("/"))
    }}

  

  return (
    <form className="addChildForm">
      <h2 className="addChildForm__title">Add a Child</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="userName">Child Username </label>
          <input type="text" name="userName" required autoFocus className="form-control"
   
            proptype="varchar"
            placeholder="username"
            defaultValue={newUser.userName}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Child Password</label>
          <input type="text" name="password" required autoFocus className="form-control"

            proptype="varchar"
            placeholder="password"
            defaultValue={newUser.password}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <div className="saveButtonContainer">
      <button type="submit"
        onClick={evt => {
          evt.preventDefault()
          constructNewUser()
        }}
        className="btn btn-primary">
       Save
      </button>
      <button className=" closeBtn btn btn-light" onClick={() => props.history.push("/")}>Close</button>
      </div>
    </form>
  )
}