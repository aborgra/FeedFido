import React from "react";
import { Card } from "reactstrap";


export default ({ chore, history }) => {
  return (
    <Card className="childCard">
<div>Due Date: {chore.schedDate}</div>
      <div className="child__name">Chore: {chore.chore.name}</div>
  <div>Pet: {chore.pet.name}</div>
  <div>Child: {chore.user.userName}</div>


      
    </Card>
  );
};