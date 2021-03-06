import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import { Button } from "reactstrap";

const Login = props => {
  const password = useRef();
  const userName = useRef();

  // Checks if there is an active user. If not, it applies a class to the body for background styling for the launchpad page
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
          window.alert("Please register new user");
          return false
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
          <h2 className="signIn">Please Sign In</h2>
          <div className="logInUserContainer">
            <input
              ref={userName}
              type="userName"
              id="userName"
              className="logInUser"
              placeholder="Username"
              required
              autoFocus
            />
          </div>
          <div className="logInPassContainer">
            <input
              ref={password}
              type="password"
              id="password"
              className="logInPass"
              placeholder="Password"
              required
            />
          </div>
          <div className="buttons">
          <Button
            className="logInButton btn btn" color="primary"
            variant="contained"
            type="submit"
          >
            Sign in
          </Button>
          <Button
            className=" cancelBtn" color="light" size="sm"
            onClick={() => props.history.push("/launchpad")}
          >
            Cancel
          </Button>
          </div>
        </form>
      </section>
      <section className="link--register">
        <Link to="/register">Not a member yet?</Link>
      </section>
    </main>
  );
};
export default Login;
