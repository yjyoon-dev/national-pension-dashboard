import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Col, InputNumber, Row, Slider, Typography } from 'antd';
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import '../../components/Card.css';
import csv from '../../../../data/csv/member.csv';

const { Title } = Typography;

const SubscriberChart = () => {
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
              subscriber: parseInt(data[i][1]),
              recipient: parseInt(data[i][2]),
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
        <Title level={4}>국민연금 가입자 및 수급자 추이</Title>
        <ComposedChart
          width={window.innerWidth / 2.7}
          height={window.innerHeight / 6}
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis
            dataKey="year"
            label={{ position: 'insideBottomRight', offset: 0 }}
            scale="band"
          />
          <YAxis dataKey="subscriber" />
          <Tooltip />
          <Legend />
          <Line
            name="가입자(만명)"
            type="monotone"
            dataKey="subscriber"
            stroke="#8884d8"
          />
          <Line
            name="수급자(만명)"
            type="monotone"
            dataKey="recipient"
            stroke="#ff7300"
          />
        </ComposedChart>
      </Col>
    </span>
  );
};

export default SubscriberChart;
