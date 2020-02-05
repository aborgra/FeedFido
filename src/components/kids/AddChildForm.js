import React, { useContext, useState, useEffect } from "react"
import { UserContext } from "../users/UserProvider"


export default props => {
  const { addUser, users } = useContext(UserContext)
  const [newUser, setNewUser] = useState({})

  
  const handleControlledInputChange = (event) => {
   
    const newSingleUser = Object.assign({}, newUser)
    newSingleUser[event.target.name] = event.target.value
    setNewUser(newSingleUser)
  }


  const constructNewUser = () => {
    
        addUser({
            userName: newUser.userName,
            password: newUser.password,
            parentId: parseInt(localStorage.getItem("fido_user"))
        })
            .then(() => props.history.push("/"))
    }

  

  return (
    <form className="addChildForm">
      <h2 className="addChildForm__title">Add a Child</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="userName">Username </label>
          <input type="text" name="userName" required autoFocus className="form-control"
   
            proptype="varchar"
            placeholder="Username"
            defaultValue={newUser.userName}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Password</label>
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