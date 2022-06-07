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
import csv from '../../../../data/csv/replacement.csv';

const { Title } = Typography;

const ReplacementChart = ({ replacement, onChangeReplacement }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getCsv() {
      Papa.parse(csv, {
        download: true,
        complete: function (csvFile) {
          const data = csvFile.data;
          const tempData = [];
          for (let i = 1; i < data.length; i++)
            tempData.push({ year: data[i][0], replacement: data[i][1] });
          setData(tempData);
        },
      });
    }
    getCsv();
  }, []);

  const onChange = (value) => {
    if (isNaN(value)) return;

    onChangeReplacement(value);
    setData((data) => [
      ...data.slice(0, -1),
      { year: 2060, replacement: replacement },
    ]);
  };

  return (
    <Col>
      <Title level={4}>만기가입자 명목 소득대체율</Title>
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
        <YAxis dataKey="replacement" />
        <Tooltip />
        <Legend />
        <Line
          name="소득대체율(%)"
          type="stepAfter"
          dataKey="replacement"
          stroke="#82ca9d"
          dot={false}
        />
      </LineChart>
      <Row>
        <Col span={16}>
          <Slider
            min={20}
            max={90}
            onChange={onChange}
            value={replacement}
            step={0.5}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={20}
            max={90}
            style={{
              margin: '0 16px',
            }}
            step={0.5}
            value={replacement}
            onChange={onChange}
          />
        </Col>
      </Row>
    </Col>
  );
};

export default ReplacementChart;
