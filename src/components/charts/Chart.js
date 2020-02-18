import React from 'react';
import {Bar} from 'react-chartjs-2'; 
import "./Chart.css"


export default ({data}) => {

const mydata = {
  labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
  datasets: [
    {
      label: 'Completed Chores',
      backgroundColor: '#ffa726',
      borderColor: '#ffa726',
      borderWidth: 1,
      hoverBackgroundColor: '#29b6f6',
      hoverBorderColor: '#29b6f6',
      data: data
    }
  ]
};


    return (
      <div className="chart">
        <h2 className="chartTitle">Weekly Completed Chores</h2>
        <Bar
          data={mydata}
          width={300}
          height={200}
          options={{
            maintainAspectRatio: true
          }}
        />
      </div>
    );
  }
