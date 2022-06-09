import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Col, InputNumber, Row, Slider, Typography } from 'antd';
import {
  PieChart,
  Pie,
  Sector,
  ResponsiveContainer,
  Cell,
  Legend,
} from 'recharts';
import '../../components/Card.css';
import csv from '../../../../data/csv/fin_port.csv';

const { Title } = Typography;

const COLORS = [
  '#8884D8',
  '#83A6ED',
  '#8DD1E1',
  '#82CA9D',
  '#8aca82',
  '#b0ca82',
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const FinPortChart = ({ year }) => {
  const [data, setData] = useState(new Map());
  const [index, setIndex] = useState(1);

  const onPieEnter = (_, value) => {
    setIndex(value);
  };

  useEffect(() => {
    async function getCsv() {
      Papa.parse(csv, {
        download: true,
        complete: function (csvFile) {
          const data = csvFile.data;
          const tempData = new Map();
          for (let i = 1; i < data.length; i++)
            tempData.set(parseInt(data[i][0]), [
              { name: '국내주식', value: parseInt(data[i][1]) },
              { name: '해외주식', value: parseInt(data[i][2]) },
              { name: '국내채권', value: parseInt(data[i][3]) },
              { name: '해외채권', value: parseInt(data[i][4]) },
              { name: '대체투자', value: parseInt(data[i][5]) },
              { name: '단기자금', value: parseInt(data[i][6]) },
            ]);
          setData(tempData);
        },
      });
    }
    getCsv();
  }, []);

  return (
    <span className="Card">
      <Col>
        <Title level={4}>금융 포트폴리오 - {year}년</Title>
        <PieChart
          width={window.innerWidth / 6.77}
          height={window.innerHeight / 6}
        >
          <Pie
            data={data.get(year)}
            cx="50%"
            cy="50%"
            innerRadius={30}
            outerRadius={70}
            fill="#82ca9d"
            labelLine={false}
            label={renderCustomizedLabel}
          >
            {data.get(year) &&
              data
                .get(year)
                .map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
          </Pie>
          <Legend />
        </PieChart>
      </Col>
    </span>
  );
};

export default FinPortChart;
