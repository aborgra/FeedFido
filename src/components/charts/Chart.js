import React from 'react';
import {Bar} from 'react-chartjs-2'; 
import "./Chart.css"


export default ({data, dates}) => {

const mydata = {
  labels: dates,
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
        <h2 className="chartTitle">Completed Chores</h2>
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
