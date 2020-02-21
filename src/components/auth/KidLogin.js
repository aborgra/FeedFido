import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./KidLogin.css";
import { Button } from "reactstrap";

const KidLogin = props => {
  const password = useRef();
  const userName = useRef();

  if (localStorage.getItem("fido_user") === null) {
    document.body.classList.add("logInBackground");
  }

  const existingUserCheck = () => {
    return fetch(
      `http://localhost:8088/users?userName=${userName.current.value}`
    )
      .then(_ => _.json())
      .then(user => {
        if (user.length) {
          return user[0];
        }else {
          window.alert("User not found. Please ask a parent to register you as a user.")
          return false;
        }
      });
  };

  const handleLogin = e => {
    e.preventDefault();

    existingUserCheck().then(exists => {
      if (exists && exists.password === password.current.value) {
        localStorage.setItem("fido_user", exists.id);
        document.body.classList.remove("logInBackground");
        props.history.push("/");
      } else if (exists && exists.password !== password.current.value) {
        window.alert("Password does not match");
      }
    });
  };

  return (
    <main className="form-group logInFormContainer">
      <h1 className="welcomeTitle">
        <div>Welcome to </div>
        <div>Feed Fido</div>
      </h1>
      <section>
        <form className="form--login" onSubmit={handleLogin}>
          <div className="logInUserContainer">
            <label htmlFor="inputUserName" className="formLabel">
              {" "}
              Username{" "}
            </label>
            <input
              ref={userName}
              type="userName"
              id="userName"
              className="form-control logInUser"
              placeholder="Username"
              required
              autoFocus
            />
          </div>
          <div className="logInPassContainer">
            <label htmlFor="inputPassword" className="formLabel">
              {" "}
              Password{" "}
            </label>
            <input
              ref={password}
              type="password"
              id="password"
              className="form-control logInPass"
              placeholder="Password"
              required
            />
          </div>
          <div className="buttons">
            <button className="logInButton btn btn-primary" type="submit">
              Sign in
            </button>
            <Button
              className=" cancelBtn btn btn-light"
              onClick={() => props.history.push("/launchpad")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
};
export default KidLogin;
