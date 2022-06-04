import React from 'react';
import '../Card.css';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, {name: 'Page A', uv: 200, pv: 2400, amt: 2400}, {name: 'Page A', uv: 700, pv: 2400, amt: 2400}, {name: 'Page A', uv: 400, pv: 2400, amt: 2400}];

const MyLineChart = () => (
  <div className='Card'>
    <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
    </LineChart>
  </div>
);

export default MyLineChart;