import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { AreaChartOutlined, InfoCircleFilled } from '@ant-design/icons';
import DashBoard from '../dashboard/Dashboard';
import About from '../about/About';
const { Content, Sider, Header, Footer } = Layout;

const menus = ["대시보드", "팀 정보"];

function Main () {
  const [tab, setTab] = useState(0);

  return (
    <Layout>
      <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div 
        className="logo"
        style={{
          padding: '24px',
          color: 'white',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '1.5em'
        }}
      >
        JUNA Dashboard
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={[AreaChartOutlined, InfoCircleFilled].map(
          (icon, index) => ({
            key: String(index + 1),
            icon: React.createElement(icon),
            label: menus.at(index)
          }),
        )}
      />
    </Sider>
    <Layout>
    <Header
        className="site-layout-sub-header-background"
        style={{
          backgroundColor: 'white',
          height: '5vh',
          textAlign: 'center',
          paddingRight: '20px',
          fontSize: '1.5em',
          fontWeight: 'bold',
          color: '#001529'
        }}
      >
        국민연금 보험료율에 따른 기금 재정수지 분석 대시보드
      </Header>
        <Content
          style={{
            margin: '24px 16px 0',
          }}
        >
          <div
            className="site-layout-background"
            style={{
              padding: 3,
              paddingLeft: 9,
              minHeight: 360,
              height: '88.1vh'
            }}
          >
            {tab === 0 ? <DashBoard /> : <About />}
          </div>
        </Content>
        <Footer
        style={{
          textAlign: 'center',
          backgroundColor: '#e1e6ed',
          color: '#90a1bc',
          height: '5vh'
        }}
      >
        ©2022 JUNA Team
      </Footer>
      </Layout>
    </Layout>
   );
}

export default Main;

