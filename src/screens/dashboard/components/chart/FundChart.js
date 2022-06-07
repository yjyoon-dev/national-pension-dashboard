import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Col, InputNumber, Row, Slider, Typography } from 'antd';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';
import '../../components/Card.css';
import csv from '../../../../data/csv/fund.csv';

const { Title } = Typography;

const FundChart = ({ onChangeYear }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getCsv() {
      Papa.parse(csv, {
        download: true,
        complete: function (csvFile) {
          const data = csvFile.data;
          const tempData = [];
          for (let i = 1; i < data.length; i++)
            tempData.push({
              year: parseInt(data[i][0]),
              earn: parseInt(data[i][1]),
            });
          tempData.pop();
          setData(tempData);
        },
      });
    }
    getCsv();
  }, []);

  const onHoverBar = (data, index) => {
    console.log(data.year);
    onChangeYear(data.year);
  };

  return (
    <span className="Card">
      <Col>
        <Title level={4}>기금운용 수익금</Title>
        <BarChart
          width={window.innerWidth / 5}
          height={window.innerHeight / 6}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <ReferenceLine y={0} stroke="#000" />
          <Bar
            name="수익금(십억원)"
            dataKey="earn"
            fill="#8884d8"
            onMouseOver={onHoverBar}
          />
        </BarChart>
      </Col>
    </span>
  );
};

export default FundChart;
