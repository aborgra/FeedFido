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
        <div className="kidList">
          {userChildren.map(child => {
            return <Child {...props} key={child.id} child={child} />;
          })}
        </div>
        {/* <div className="addChildContainer"> */}
        <img
          className="addChild"
          src={require("../pics/addChild.svg")}
          onClick={() => props.history.push("/addChild")}
        />
        {/* </div> */}
      </section>
    </>
  );
};
