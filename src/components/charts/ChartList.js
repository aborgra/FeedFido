import Chart from "./Chart";
import React, { useContext, useRef, useState } from "react";
import { KidPetChoreContext } from "../chores/KidPetChoreProvider";
import moment from "moment";
import "./Chart.css";
import { Label, Input, Form } from "reactstrap";

export default props => {
  const { kidPetChores } = useContext(KidPetChoreContext);
  const childId = parseInt(props.match.params.childId);
  const filteredChildArray =
    kidPetChores.filter(kpc => kpc.userId === childId) || [];
  const [newTime, setNewTime] = useState({time:7});

  const handleControlledInputChange = event => {
    const newSingleTime = Object.assign({}, newTime);
    newSingleTime[event.target.name] = event.target.value;
    setNewTime(newSingleTime);
  };

  let dates = [];
  const timeFrom = X => {
    for (let I = 0; I < Math.abs(X); I++) {
      let [date, Foo] = new Date(
        new Date().getTime() - (X >= 0 ? I : I - I - I) * 24 * 60 * 60 * 1000
      )
        .toLocaleString()
        .split(",");
      dates.push(date);
    }
    return dates;
  };
  timeFrom(parseInt(newTime.time, 10));

  console.log("dates", dates)
  console.log(newTime.time)
  let foundChoresCountArray = [];
  const foundDates =
    dates.map(date => {
      let datefilteredArray =
        filteredChildArray.filter(obj => obj.dateCompleted === date) || [];
      foundChoresCountArray.push(datefilteredArray.length);
    }) || [];

  return (
    <>
      <div className="childChartContainer">
      <Form>
      <fieldset>
        {/* <Label htmlFor="time">Time</Label> */}
        <Input
          type="select"
          // value={newTime.time}
          name="time"
          id="time"
          defaultValue={newTime.time}
          className="form-control chartTime"
          onChange={handleControlledInputChange}
        >
          <option value="7">1 Week</option>
          <option value="14">2 Weeks</option>
          <option value="30">1 Month</option>
          <option value="180">6 Months</option>
        </Input>
      </fieldset>
      </Form>
        <Chart
          {...props}
          key={foundChoresCountArray.id}
          data={foundChoresCountArray}
          dates={dates}
        />
      </div>
    </>
  );
};
