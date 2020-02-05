import React from "react";
import { Link } from "react-router-dom";

export default ({ child, history }) => {
  return (
    <section className="childCard">
      <h3 className="child__name">{child.userName}</h3>

      <button
        className="btn btn-light"
        onClick={() => {
          history.push(`/kids/graph/${child.id}`);
        }}
      >
        Graph
      </button>
    </section>
  );
};
