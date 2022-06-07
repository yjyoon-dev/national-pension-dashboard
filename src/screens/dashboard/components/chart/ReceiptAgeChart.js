import React, { useState } from 'react';
import { Slider, InputNumber, Row, Col, Table, Typography } from 'antd';
import { ResponsiveContainer } from 'recharts';

const { Title } = Typography;

const dataSource = [
  {
    key: '1',
    year: '~ 1952년',
    age: 60,
  },
  {
    key: '2',
    year: '1953년 ~ 1956년',
    age: 61,
  },
  {
    key: '3',
    year: '1957년 ~ 1960년',
    age: 62,
  },
  {
    key: '4',
    year: '1961년 ~ 1964년',
    age: 63,
  },
  {
    key: '5',
    year: '1965년 ~ 1968년',
    age: 64,
  },
  {
    key: '6',
    year: '1969년 ~ ',
    age: 65,
  },
];

const columns = [
  {
    title: '출생연도',
    dataIndex: 'year',
    key: 'year',
    width: 40,
  },
  {
    title: '연령',
    dataIndex: 'age',
    key: 'year',
    width: 40,
  },
];

const ReceiptAgeChart = ({ receiptAge, onChangeReceiptAge }) => {
  const [data, setData] = useState(dataSource);

  const onChange = (value) => {
    if (isNaN(value)) return;

    onChangeReceiptAge(value);
    setData((data) => [
      ...data.slice(0, -1),
      {
        key: '6',
        year: '1969년 ~ ',
        age: receiptAge,
      },
    ]);
  };

  return (
    <ResponsiveContainer
      width={window.innerWidth / 4}
      height={window.innerHeight / 3.5}
    >
      <Col>
        <Title level={4}>출생연도별 국민연금 수급연령</Title>
        <Col span={16}>
          <Table
            bordered={true}
            pagination={false}
            dataSource={data}
            columns={columns}
            size="small"
          />
        </Col>
        <Row>
          <Col span={16}>
            <Slider
              min={60}
              max={75}
              onChange={onChange}
              value={receiptAge}
              step={1}
              style={{
                margin: '26px 0px',
              }}
            />
          </Col>
          <Col span={4}>
            <InputNumber
              min={60}
              max={75}
              step={1}
              style={{
                margin: '16px 16px',
              }}
              value={receiptAge}
              onChange={onChange}
            />
          </Col>
        </Row>
      </Col>
    </ResponsiveContainer>
  );
};

export default ReceiptAgeChart;
