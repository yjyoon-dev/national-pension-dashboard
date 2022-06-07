import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Col, InputNumber, Row, Slider, Typography } from 'antd';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';
import '../../components/Card.css';
import csv from '../../../../data/csv/fund_port.csv';

const { Title } = Typography;

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${value}십억원`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const FundPortChart = ({ year }) => {
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
              { name: '공공부문', value: parseInt(data[i][1]) },
              { name: '복지부문', value: parseInt(data[i][2]) },
              { name: '금융부문', value: parseInt(data[i][3]) },
              { name: '기타부문', value: parseInt(data[i][4]) },
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
        <Title level={4}>기금 포트폴리오 - {year}년</Title>
        <PieChart
          width={window.innerWidth / 6.77}
          height={window.innerHeight / 6}
        >
          <Pie
            activeIndex={index}
            activeShape={renderActiveShape}
            data={data.get(year)}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={60}
            fill="#82ca9d"
            dataKey="value"
            onMouseEnter={onPieEnter}
          />
        </PieChart>
      </Col>
    </span>
  );
};

export default FundPortChart;
