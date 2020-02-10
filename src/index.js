import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';


import Fido from "./components/Fido";


ReactDOM.render(
  <Router>
    <Fido />
  </Router>,
  document.getElementById("root")
);