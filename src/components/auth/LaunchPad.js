import React, { useRef } from "react"
import { Link } from "react-router-dom";


const Launchpad = props => {

  return (
<>
<h1 className="launchpad__title">Welcome to Feed Fido!</h1>

<section className="launchpad__form">
<div className="launchpad__choice">I am a ...</div>
<button className="btn btn-primary" onClick={() => props.history.push("/login")}>
        Parent
      </button>
      <hr></hr>
      <button className="btn btn-primary" onClick={() => props.history.push("/kidLogin")}>
        Child
      </button>
      </section>
</>
  )
}

export default Launchpad