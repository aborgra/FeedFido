import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

export default ({ child, history }) => {
  return (
    <section className="childCard">
      <h3 className="child__name">{child.userName}</h3>

      <Button
        className="graphButton" variant="contained"
        onClick={() => {
          history.push(`/child/graph/${child.id}`);
        }}
      >
        Graph
      </Button>
    </section>
  );
};
