import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

export default ({ child, history }) => {
  return (
    <section className="childCard">
      <h2 className="child__name">{child.userName}</h2>

      <button
        className="graphButton btn btn-primary" 
        onClick={() => {
          history.push(`/child/graph/${child.id}`);
        }}
      >
        Graph
      </button>
    </section>
  );
};
