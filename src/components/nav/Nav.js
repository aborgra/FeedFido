import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import { UserContext } from "../users/UserProvider";
import Button from '@material-ui/core/Button';


export default props => {

const { users } = useContext(UserContext)
  const activeUserId = parseInt(localStorage.getItem("fido_user"))
  const activeUser = users.find(user => user.id === activeUserId) || {}
  console.log(activeUserId)

  return (
    <div className="navbar">
      <img className="backIcon"src={require("../pics/undo.svg")}
      onClick={() => props.history.push("/")}
      />
      <h2 className="siteName">Feed Fido</h2>
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