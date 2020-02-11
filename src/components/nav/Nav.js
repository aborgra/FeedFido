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

  let today = Date.now();

  console.log("test", userChildren);

  const notificationIcon = () => {
    if (activeUser.parentId === 0) {
      let missingChores = [];

      let incompleteChildChoresArray =
        userChildren.map(child => {
          child.kidPetChores.map(kpc => {
            if (kpc.isCompleted === false) {
              if (kpc.hasOwnProperty("schedDate")) {
                let scheduledDate = moment(kpc.schedDate).valueOf();
                console.log(scheduledDate);
                if (scheduledDate < today) {
                  missingChores.push(kpc);
                }
              }
            }
          });
          return child;
        }) || [];
      console.log(missingChores, "missingChores")
      let missingChoresCount = missingChores.length;

      return (
        <Button
          className="btn btn-danger"
          onClick={e => {
            props.history.push(`/notifications/${activeUserId}`);
          }}
        >
          {missingChoresCount}
        </Button>
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
        <Button
          className="logoutButton btn btn-light"
          onClick={e => {
            e.preventDefault();
            localStorage.removeItem("fido_user");
            props.history.push("/");
          }}
        >
          Logout
        </Button>
      ) : (
        ""
      )}
    </div>
  );
};
