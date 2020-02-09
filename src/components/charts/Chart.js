import React from 'react';
import {Bar} from 'react-chartjs-2'; 


export default ({data}) => {

  console.log(data)
const mydata = {
  labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
  datasets: [
    {
      label: 'Completed Chores',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: data
    }
  ]
};


    return (
      <div>
        <h2>Weekly Completed Chores</h2>
        <Bar
          data={mydata}
          width={350}
          height={125}
          options={{
            maintainAspectRatio: false
          }}
        />
      </div>
    );
  }
