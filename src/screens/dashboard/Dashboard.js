import React, { useState, useEffect } from 'react';
import { Col, Row } from 'antd';
import Papa from 'papaparse';
import './components/chart/PremiumChart';
import PremiumChart from './components/chart/PremiumChart';
import ReplacementChart from './components/chart/ReplacementChart';
import ReceiptAgeChart from './components/chart/ReceiptAgeChart';
import BalanceChart from './components/chart/BalanceChart';
import SubscriberChart from './components/chart/SubscribeChart';
import FundChart from './components/chart/FundChart';
import FundPortChart from './components/chart/FundPortChart';
import FinPortChart from './components/chart/FinPortChart';
import PriceChart from './components/chart/PriceChart';
import PopulChart from './components/chart/PopulChart';

import csv from '../../data/csv/balance.csv';
import earning from '../../data/simulation/earning.csv';
import expense from '../../data/simulation/expense.csv';
import income from '../../data/simulation/income.csv';

const rawEarningMap = new Map();
const rawIncomeMap = new Map();

const earningMap = new Map();
const expenseMap = new Map();
const incomeMap = new Map();

const balanceData = [];

let flag = false;

const Dashboard = () => {
  const [balance, setBalance] = useState([]);
  const [premium, setPremium] = useState(9);
  const [replacement, setReplacement] = useState(40);
  const [receiptAge, setReceiptAge] = useState(65);
  const [year, setYear] = useState(1998);

  const onChangePremium = (value) => {
    setPremium(value);
    simulate(balanceData);
  };

  const onChangeReplacement = (value) => {
    setReplacement(value);
    simulate(balanceData);
  };

  const onChangeReceiptAge = (value) => {
    setReceiptAge(value);
    simulate(balanceData);
  };

  const onChangeYear = (value) => {
    setYear(value);
  };

  const loadCsv = () => {
    if (flag) return;
    flag = true;
    async function getEarning() {
      Papa.parse(earning, {
        download: true,
        complete: function (csvFile) {
          const data = csvFile.data;
          for (let i = 1; i < data.length; i++)
            rawEarningMap.set(parseInt(data[i][0]), parseFloat(data[i][1]));
        },
      });
    }

    async function getExpense() {
      Papa.parse(expense, {
        download: true,
        complete: function (csvFile) {
          const data = csvFile.data;
          for (let i = 1; i < data.length; i++)
            expenseMap.set(parseInt(data[i][0]), parseFloat(data[i][1]));
        },
      });
    }

    async function getIncome() {
      Papa.parse(income, {
        download: true,
        complete: function (csvFile) {
          const data = csvFile.data;
          for (let i = 1; i < data.length; i++)
            rawIncomeMap.set(parseInt(data[i][0]), parseFloat(data[i][1]));
        },
      });
    }

    async function getCsv() {
      Papa.parse(csv, {
        download: true,
        complete: function (csvFile) {
          const data = csvFile.data;
          for (let i = 1; i < data.length; i++)
            balanceData.push({
              year: parseInt(data[i][0]),
              earn: parseInt(data[i][1]),
              expense: parseInt(data[i][2]),
              asset: parseInt(data[i][3]),
            });
          balanceData.pop();
          simulate(balanceData);
        },
      });
    }
    getEarning().then(getExpense().then(getIncome().then(getCsv())));
  };

  function simulate(baseData) {
    for (let i = 2018; i <= 2060; i++) {
      earningMap.set(
        i,
        (rawEarningMap.get(i) / (0.6 + 0.16 / (replacement / 100))) *
          (65 / receiptAge) ** 2,
      );
    }

    for (let i = 2019; i <= 2060; i++)
      incomeMap.set(i, ((rawIncomeMap.get(i) / 0.09) * premium) / 100);

    const assets = [638800];
    const earns = [];
    for (let i = 0; i < 42; i++) {
      const year = 2019 + i;
      earns.push(assets[i] * (earningMap.get(year) - 1) + incomeMap.get(year));
      assets.push(
        Math.max(
          0,
          assets[i] * earningMap.get(year) +
            incomeMap.get(year) -
            expenseMap.get(year),
        ),
      );
    }

    assets.splice(0, 4);
    earns.splice(0, 3);

    const simulatedData = [];
    for (let i = 0; i < 39; i++) {
      simulatedData.push({
        year: i + 2022,
        earn: parseInt(earns[i]),
        expense: parseInt(expenseMap.get(i + 2022)),
        asset: parseInt(assets[i]),
      });
    }
    setBalance(baseData.concat(simulatedData));
  }

  useEffect(loadCsv, []);

  return (
    <Row>
      <Col>
        <PremiumChart premium={premium} onChangePremium={onChangePremium} />
        <ReplacementChart
          replacement={replacement}
          onChangeReplacement={onChangeReplacement}
        />
        <ReceiptAgeChart
          receiptAge={receiptAge}
          onChangeReceiptAge={onChangeReceiptAge}
        />
      </Col>
      <Col>
        <Row>
          <BalanceChart balance={balance} />
          <PopulChart />
        </Row>
        <Row>
          <SubscriberChart />
          <PriceChart />
        </Row>
        <Row>
          <FundChart onChangeYear={onChangeYear} />
          <FundPortChart year={year} />
          <FinPortChart year={year} />
        </Row>
      </Col>
    </Row>
  );
};

export default Dashboard;
