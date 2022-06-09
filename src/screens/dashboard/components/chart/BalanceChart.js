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
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import '../../components/Card.css';

const { Title } = Typography;

const earningMap = new Map();
const expenseMap = new Map();
const incomeMap = new Map();

const BalanceChart = ({ balance }) => {
  return (
    <span className="Card">
      <Col>
        <Title level={4}>적립기금 및 재정수지 시뮬레이션</Title>
        <ComposedChart
          width={window.innerWidth / 2.7}
          height={window.innerHeight / 3.5}
          data={balance}
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
          <YAxis yAxisId="left" orientation="left" />
          <YAxis yAxisId="right" orientation="right" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar
            name="적립기금(십억원)"
            yAxisId="left"
            dataKey="asset"
            barSize={20}
            fill="#82ca9d"
          />
          <Line
            name="총 수입(십억원)"
            type="monotone"
            yAxisId="right"
            dataKey="earn"
            stroke="#8884d8"
          />
          <Line
            name="총 지출(십억원)"
            type="monotone"
            yAxisId="right"
            dataKey="expense"
            stroke="#ff7300"
          />
        </ComposedChart>
      </Col>
    </span>
  );
};

export default BalanceChart;
