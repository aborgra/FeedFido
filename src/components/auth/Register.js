import React, { useRef } from "react"
import "./Login.css"

const Register = props => {
    const userName = useRef()
    const email = useRef()
    const password = useRef()
    const verifyPassword = useRef()

    if(localStorage.getItem("fido_user") === null) {
        document.body.classList.add("logInBackground")
    }

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?userName=${userName.current.value}`)
            .then(_ => _.json())
            .then(user => {
                if (user.length) {
                    return true
                }
                return false
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            existingUserCheck()
                .then(() => {
                    fetch("http://localhost:8088/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email: email.current.value,
                            password: password.current.value,
                            userName: userName.current.value
                        })
                    })
                        .then(_ => _.json())
                        .then(createdUser => {
                            if (createdUser.hasOwnProperty("id")) {
                                localStorage.setItem("fido_user", createdUser.id)
                                document.body.classList.remove("logInBackground")
                                props.history.push("/")
                            }
                        })
                })
        } else {
            window.alert("Passwords do not match")
        }
    }

    return (
        <main>
            <form className="form--login registerContainer" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal registerHeader">Please Register for fido</h1>
                <fieldset className="registerUserContainer">
                    <label htmlFor="userName"> Username </label>
                    <input ref={userName} type="text"
                        name="userName"
                        className="form-control registerUser"
                        placeholder="Username"
                        required autoFocus />
                </fieldset>
                <fieldset className="registerEmailContainer">
                    <label htmlFor="inputEmail"> Email address </label>
                    <input ref={email} type="email"
                        name="email"
                        className="form-control registerEmail"
                        placeholder="Email address"
                        required />
                </fieldset>
                <fieldset className="registerPassContainer">
                    <label htmlFor="inputPassword"> Password </label>
                    <input ref={password} type="password"
                        name="password"
                        className="form-control registerPass"
                        placeholder="Password"
                        required />
                </fieldset>
                <fieldset className="confirmPassContainer">
                    <label htmlFor="verifyPassword"> Verify Password </label>
                    <input ref={verifyPassword} type="password"
                        name="verifyPassword"
                        className="form-control confirmPass"
                        placeholder="Verify password"
                        required />
                </fieldset>
                <fieldset>
                    <button className="btn btn-primary registerButton" type="submit">
                        Sign in
                    </button>
                </fieldset>
            </form>
        </main>
    )
}

export default Register