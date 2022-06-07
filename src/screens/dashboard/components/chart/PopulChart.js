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
  ResponsiveContainer,
} from 'recharts';
import '../../components/Card.css';
import csv from '../../../../data/csv/popul.csv';

const { Title } = Typography;

const PopulChart = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getCsv() {
      Papa.parse(csv, {
        download: true,
        complete: function (csvFile) {
          const data = csvFile.data;
          const tempData = [];
          for (let i = 1; i < data.length; i++) {
            let baby = 0;
            let young = 0;
            let elder = 0;
            for (let j = 1; j < 5; j++) baby += parseInt(data[j][i]);
            for (let j = 5; j < 14; j++) young += parseInt(data[j][i]);
            for (let j = 14; j < 22; j++) elder += parseInt(data[j][i]);
            tempData.push({
              year: data[0][i],
              baby: baby,
              young: young,
              elder: elder,
            });
          }
          tempData.pop();
          setData(tempData);
        },
      });
    }
    getCsv();
  }, []);

  return (
    <span className="Card">
      <Col>
        <Title level={4}>연도별 인구 연령 분포</Title>
        <BarChart
          width={window.innerWidth / 6.77}
          height={window.innerHeight / 3.5}
          data={data}
          margin={{
            top: 20,
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
          <Bar name="유소년(만명)" dataKey="baby" stackId="a" fill="#8884d8" />
          <Bar name="청장년(만명)" dataKey="young" stackId="a" fill="#82ca9d" />
          <Bar name="노년(만명)" dataKey="elder" stackId="a" fill="#ff7300" />
        </BarChart>
      </Col>
    </span>
  );
};

export default PopulChart;
