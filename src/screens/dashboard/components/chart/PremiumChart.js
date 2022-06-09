import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Col, InputNumber, Row, Slider, Typography } from 'antd';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import csv from '../../../../data/csv/premium.csv';

const { Title } = Typography;

const PremiumChart = ({ premium, onChangePremium }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getCsv() {
      Papa.parse(csv, {
        download: true,
        complete: function (csvFile) {
          const data = csvFile.data;
          const tempData = [];
          for (let i = 1; i < data.length; i++)
            tempData.push({ year: data[i][0], premium: data[i][1] });
          setData(tempData);
        },
      });
    }
    getCsv();
  }, []);

  const onChange = (value) => {
    if (isNaN(value)) return;

    onChangePremium(value);
    const temp = [];

    for (let i = 2023; i <= 2060; i++) temp.push({ year: i, premium: premium });
    setData(data.slice(0, 35).concat(temp));
  };

  return (
    <div>
      <Title level={4}>국민연금 보험료율</Title>
      <LineChart
        width={window.innerWidth / 6}
        height={window.innerHeight / 5}
        data={data}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis dataKey="premium" />
        <Tooltip />
        <Legend />
        <Line
          name="보험료율(%)"
          type="stepAfter"
          dataKey="premium"
          stroke="#8884d8"
          strokeWidth={3}
          dot={false}
        />
      </LineChart>
      <Row>
        <Col span={16}>
          <Slider
            min={0}
            max={18}
            onChange={onChange}
            value={premium}
            step={1}
          />
        </Col>
        <Col span={1}>
          <InputNumber
            min={0}
            max={18}
            style={{
              margin: '0 16px',
            }}
            step={1}
            value={premium}
            onChange={onChange}
          />
        </Col>
      </Row>
    </div>
  );
};

export default PremiumChart;
