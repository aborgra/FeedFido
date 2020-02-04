import React, { useRef } from "react"
import { Link } from "react-router-dom";
import "./Login.css"


const Login = props => {
    const password = useRef()
    const userName = useRef()

    if(localStorage.getItem("fido_user") === null) {
        document.body.classList.add("logInBackground")
    }

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?userName=${userName.current.value}`)
            .then(_ => _.json())
            .then(user => {
                if (user.length) {
                    return user[0]
                }
                return false
            })
    }

    const handleLogin = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then(exists => {
                if (exists && exists.password === password.current.value) {
                    localStorage.setItem("fido_user", exists.id)
                    document.body.classList.remove("logInBackground")
                    props.history.push("/")
                } else if (exists && exists.password !== password.current.value) {
                    window.alert("Password does not match")
                } 
            })
    }

    return (
        <main className="form-group logInFormContainer">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Welcome to Feed Fido!</h1>
                    <h2>Please Sign In</h2>
                    <fieldset className="logInUserContainer">
                        <label htmlFor="inputUserName"> Username </label>
                        <input ref={userName} type="userName"
                            id="userName"
                            className="form-control logInUser"
                            placeholder="Username"
                            required autoFocus />
                    </fieldset>
                    <fieldset className="logInPassContainer">
                        <label htmlFor="inputPassword"> Password </label>
                        <input ref={password} type="password"
                            id="password"
                            className="form-control logInPass"
                            placeholder="Password"
                            required />
                    </fieldset>
                    <fieldset>
                        <button className="btn btn-primary logInButton" type="submit">
                            Sign in
                    </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    )
}
export default Login