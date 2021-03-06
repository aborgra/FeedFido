import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import { UserContext } from "../users/UserProvider";
import { Button } from "reactstrap";
import { KidPetChoreContext } from "../chores/KidPetChoreProvider";
import moment from "moment";

export default props => {
  const { users } = useContext(UserContext);
  const { kidPetChores } = useContext(KidPetChoreContext);
  const activeUserId = parseInt(localStorage.getItem("fido_user"));
  const activeUser = users.find(user => user.id === activeUserId) || {};
 

  const userChildren =
    users.filter(user => user.parentId === activeUserId) || [];

  let compareDate = moment().subtract(1, 'days')

  const notificationIcon = () => {
    if (activeUser.parentId === 0) {
      let missingChores = [];
      let incompleteChildChoresArray =
        userChildren.map(child => {
          child.kidPetChores.map(kpc => {
            if (kpc.isCompleted === false) {
              if (kpc.hasOwnProperty("schedDate")) {
                let scheduledDate = moment(kpc.schedDate).valueOf();
                if (scheduledDate < compareDate) {
                  missingChores.push(kpc);
                }
              }
            }
          });
          return child;
        }) || [];
      let missingChoresCount = missingChores.length;

      return (
        <>
        <img src={require("../pics/bell.svg")}
        className="notificationBell"
        onClick={e => {
          props.history.push(`/notifications/${activeUserId}`);
        }}
        />

        <Button
          className="notificationButton"
          color="danger"
          
        >
          <div className="buttonCount">{missingChoresCount}</div>
        </Button>
        </>
      );
    }
  };

  const parentIcons = () => {
    if (activeUser.parentId === 0) {
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
      );
    }
  };

  return (
    <div className="navbar">
      <img
        className="backIcon"
        src={require("../pics/undo.svg")}
        onClick={() => props.history.push("/")}
      />
      <h2 className="siteName">Feed Fido</h2>
      {notificationIcon()}
      {parentIcons()}
      {/* <h3 className="navbar__message">{activeUser.userName} - Welcome to Feed Fido!</h3> */}
      {localStorage.getItem("fido_user") ? (
        <img
          className="logoutButton"
          src={require("../pics/logout.svg")}
          onClick={e => {
            e.preventDefault();
            localStorage.removeItem("fido_user");
            props.history.push("/");
          }}
        />
      ) : (
        ""
      )}
    </div>
  );
};
