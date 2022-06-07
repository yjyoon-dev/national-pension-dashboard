import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Col, InputNumber, Row, Slider, Typography } from 'antd';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import '../../components/Card.css';
import csv from '../../../../data/csv/price.csv';

const { Title } = Typography;

const PriceChart = () => {
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
              year: data[i][0],
              price: parseFloat(data[i][1]),
            });
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
        <Title level={4}>소비자 물가지수 상승률</Title>
        <AreaChart
          width={window.innerWidth / 6.77}
          height={window.innerHeight / 6}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Area
            name="상승률(%)"
            type="monotone"
            dataKey="price"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </Col>
    </span>
  );
};

export default PriceChart;
