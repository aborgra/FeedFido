import Chart from "./Chart";
import React, { useContext } from "react";
import { KidPetChoreContext } from "../chores/KidPetChoreProvider";
import moment from "moment";
import "./Chart.css"

export default props => {
  const { kidPetChores } = useContext(KidPetChoreContext);
  const childId = parseInt(props.match.params.childId);
  const filteredChildArray =
    kidPetChores.filter(kpc => kpc.userId === childId) || [];

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
  timeFrom(7)
console.log(dates)
  let foundChoresCountArray = [];
  const foundDates =
    dates.map(date => {
      let datefilteredArray =
        filteredChildArray.filter(obj => obj.dateCompleted === date) || [];
      console.log("test", datefilteredArray);
      foundChoresCountArray.push(datefilteredArray.length);
    }) || [];

  console.log(foundChoresCountArray);

  return (
    <div className="childChartContainer">
      <Chart {...props} key={foundChoresCountArray.id} data={foundChoresCountArray} />
    </div>
  );
};
