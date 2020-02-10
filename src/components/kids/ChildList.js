import React, { useContext } from "react";
import "./Kids.css";
import Child from "./Child";
import { UserContext } from "../users/UserProvider";

export default props => {
  const { users } = useContext(UserContext);

  const activeUserId = parseInt(localStorage.getItem("fido_user"));

  const userChildren =
    users.filter(user => user.parentId === activeUserId) || [];

  

  return (
    <>
      <section className="parentKids">
        <img className="addChild" src={require("../pets/add-user.svg")}
        onClick={() => props.history.push("/addChild")}
        />
        <button
            className=" closeBtn btn btn-light"
            onClick={() => props.history.push("/")}
          >
            Back
          </button>
        <div className="kids__list">
          {userChildren.map(child => {
            return <Child {...props} key={child.id} child={child} />;
          })}
        </div>
      </section>
    </>
  );
};
