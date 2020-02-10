import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import { UserContext } from "../users/UserProvider";
import {Button} from 'reactstrap';


export default props => {

const { users } = useContext(UserContext)
  const activeUserId = parseInt(localStorage.getItem("fido_user"))
  const activeUser = users.find(user => user.id === activeUserId) || {}
  console.log(activeUserId)

  const parentIcons = () => {
    if(activeUser.parentId === 0) {
      return (
        <>
          <img
            className="addPetIcon"
            src={require("../pics/veterinary.svg")}
            onClick={() => props.history.push("/addPet")}
          />
          <img
            className="showChildrenIcon"
            src={require("../pics/boy.svg")}
            onClick={() => props.history.push("/ChildList")}
          />
        </>
      )
    }
  }

  return (
    <div className="navbar">
      <img className="backIcon"src={require("../pics/undo.svg")}
      onClick={() => props.history.push("/")}
      />
      <h2 className="siteName">Feed Fido</h2>
      {parentIcons()}
     {/* <h3 className="navbar__message">{activeUser.userName} - Welcome to Feed Fido!</h3> */}
{
    localStorage.getItem("fido_user")
        ?
          <Button variant="contained" className= "logoutButton" onClick={e => {
                    e.preventDefault()
                    localStorage.removeItem("fido_user")
                    props.history.push("/")
                }}>
            Log Out
          </Button>
  
       
        : ""
}
      
    </div>
  );
};