import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import { UserContext } from "../users/UserProvider";

export default props => {

const { users } = useContext(UserContext)
  const activeUserId = parseInt(localStorage.getItem("fido_user"))
  const activeUser = users.find(user => user.id === activeUserId) || {}
  console.log(activeUserId)

  return (
    <div className="navbar">
      <h3 className="navbar__message">{activeUser.userName} - Welcome to Feed Fido!</h3>
{
    localStorage.getItem("fido_user")
        ?
          <button className= "logoutButton btn btn-light " onClick={e => {
                    e.preventDefault()
                    localStorage.removeItem("fido_user")
                    props.history.push("/")
                }}>
            Log Out
          </button>
  
       
        : ""
}
      
    </div>
  );
};