import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { AreaChartOutlined, InfoCircleFilled } from '@ant-design/icons';
import DashBoard from '../dashboard/Dashboard';
const { Content, Sider, Header, Footer } = Layout;

const menus = ['대시보드', '팀 정보'];

function Main() {
  return (
    <Layout>
      <Header
        className="site-layout-sub-header-background"
        style={{
          backgroundColor: '#1F2937',
          height: '5vh',
          textAlign: 'left',
          paddingRight: '20px',
          fontSize: '1.5em',
          fontWeight: 'bold',
          color: 'white',
        }}
      >
        국민연금 보험료율에 따른 기금 재정수지 분석 대시보드
      </Header>
      <Content
        style={{
          margin: '24px 16px 0 220px',
        }}
      >
        <div
          className="site-layout-background"
          style={{
            padding: 3,
            minHeight: 360,
            height: '88.1vh',
          }}
        >
          <DashBoard />
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
          backgroundColor: '#e1e6ed',
          color: '#90a1bc',
          height: '5vh',
        }}
      >
        ©2022 JUNA Team
      </Footer>
    </Layout>
  );
}

export default Main;
