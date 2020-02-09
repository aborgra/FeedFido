import React from 'react';
import {Bar} from 'react-chartjs-2'; //import Bar module from react-chart-js-2

export default () => {
const mydata = {
  labels: ['Sunday', 'Monday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  datasets: [
    {
      label: 'Week Dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};


    return (
      <div>
        <h2>Vertical Bar Example (custom size)</h2>
        <Bar
          data={mydata}
          width={100}
          height={50}
          options={{
            maintainAspectRatio: false
          }}
        />
      </div>
    );
  }
