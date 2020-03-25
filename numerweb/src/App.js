
import './App.css';
import { Menu, Breadcrumb, Layout, Switch, BackTop,Affix } from 'antd';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  InboxOutlined,
  MailOutlined,
} from '@ant-design/icons';
import Bisection from './Bisection';
import React, { useState } from "react";
import { Component } from 'react';
import { render } from '@testing-library/react';
import { createPortal } from 'react-dom';
import Home from './Home';
import FalsePosition from './FalsePosition';
import OnePoint from './OnePoint';
import TaylorSeries from './TaylorSeries';
import NewtonRaphson from './NewtonRaphson';
import Secant from './Secant';
import Cramer from './Cramer';
import GaussElimination from './GaussElimination';
import GaussJordan from './GaussJordan';
import GaussSeidel from './GaussSeidel';
import Jacobi from './Jacobi';
import Trapezoidel from './Trapezoidel';
import Simpson from './Simpson';
import NDD from './NDD';
import Lagrange from './Lagrange';
import ForwardDif from './ForwardDif';
import BackwardDif from './BackwardDif';
import CentralDif from './CentralDif';
import Conjugate from './Conjugate';
import LU from './LU';
import PolyRegression from './PolyRegression';
import MultipleRegression from './MultipleRegression';
function App() {
  const [pageState, setPageState] = useState(<Home/>);
  const { Header, Content, Footer, Sider } = Layout;
  const { SubMenu } = Menu;
  const openHome = () => setPageState(<Home/>);
  const openBisection = () => setPageState(<Bisection/>);
  const openFalsePosition = () => setPageState(<FalsePosition/>);
  const openOnePoint = () => setPageState(<OnePoint/>);
  const openNewtonRaphson = () => setPageState(<NewtonRaphson/>);
  const openSecant = () => setPageState(<Secant/>);
  const openCramer = () => setPageState(<Cramer/>);
  const openGaussElimination = () => setPageState(<GaussElimination/>);
  const openGaussJordan = () => setPageState(<GaussJordan/>);
  const openGaussSeidel = () => setPageState(<GaussSeidel/>);
  const openTrapezoidel = () => setPageState(<Trapezoidel/>);
  const openSimpson = () => setPageState(<Simpson/>);
  const openNDD = () => setPageState(<NDD/>);
  const openLagrange = () => setPageState(<Lagrange/>);
  const openForwardDif = () => setPageState(<ForwardDif/>);
  const openBackwardDif = () => setPageState(<BackwardDif/>);
  const openCentralDif = () => setPageState(<CentralDif/>);
  const openJacobi = () => setPageState(<Jacobi/>);
  const openConjugate = () => setPageState(<Conjugate/>);
  const openLU = () => setPageState(<LU/>);
  const openPolyRegression = () => setPageState(<PolyRegression/>);
  const openMultipleRegression = () => setPageState(<MultipleRegression/>);
  const [collapsed, setcollapsed] = useState(false)
  const oncollapsed = () => setcollapsed(!collapsed)
  const [sw, setsw] = useState({ theme: 'dark', current: '1' })
  const onsw = (value) => {
    console.log(value)
    if (value === false) {
      setsw({ theme: 'light' })

    }
    else {
      setsw({ theme: 'dark' })
    }
  }
  return (
    <Layout style={{ minHeight: '100vh'  }}>
      <Sider theme={sw.theme} collapsible collapsed={collapsed} onCollapse={oncollapsed} aria-expanded="false" style={{minHeight: "100vh"}}>
        <div className="logo" />
        <Switch
          checked={sw.theme === 'dark'}
          onChange={onsw}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        /> 
        <br />
        <br />
        <Menu
          theme={sw.theme}
          defaultOpenKeys={['sub1']}
          mode="inline"

        >
          <Menu.Item key="sub2" onClick={openHome}>
            Home
        </Menu.Item>
          <SubMenu
            color="dark"
            key="sub2"
            title={
              <span>
                <PieChartOutlined />
                <span>Root of Equation</span>
              </span>
            }
          >
            <Menu.Item key="1" onClick={openBisection}>
              Bisection
            </Menu.Item>
            <Menu.Item key="2" onClick={openFalsePosition}>False Position</Menu.Item>
            <Menu.Item key="3" onClick={openOnePoint}>One point</Menu.Item>
            <Menu.Item key="4" onClick={openNewtonRaphson}>Newton-Raphson</Menu.Item>
            <Menu.Item key="5" onClick={openSecant}>Secant</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub3"
            title={
              <span>
                <PieChartOutlined />
                <span>Linear Algebra</span>
              </span>
            }
          >
            <Menu.Item key="6" onClick={openCramer}>Cramer's Rule</Menu.Item>
            <SubMenu key="sub4" title="Gauss">
              <Menu.Item key="7" onClick={openGaussElimination}>Elimination</Menu.Item>
              <Menu.Item key="8" onClick={openGaussJordan}>Jordan</Menu.Item>
              <Menu.Item key="9" onClick={openGaussSeidel}>Gauss - Seidel</Menu.Item>
            </SubMenu>
            <Menu.Item key="10" onClick={openLU}>LU Decomposition</Menu.Item>
            <Menu.Item key="11" onClick={openJacobi}>Jacobi</Menu.Item>
            <Menu.Item key="12" onClick={openConjugate}>Conjugate Gradient</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub5"
            title={
              <span>
                <PieChartOutlined />
                <span>Interpolation</span>
              </span>
            }
          >
            <Menu.Item key="13" onClick={openNDD}>Newton Divide Difference</Menu.Item>
            <Menu.Item key="14" onClick={openLagrange}>Lagrange</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub6"
            title={
              <span>
                <PieChartOutlined />
                <span>Least Square Error</span>
              </span>
            }
          >
            <Menu.Item key="16" onClick={openPolyRegression}>Polynomial Regression</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub7"
            title={
              <span>
                <PieChartOutlined />
                <span>Integration</span>
              </span>
            }
          >
            <Menu.Item key="18" onClick={openTrapezoidel}>Composite Trapezoidal Rule</Menu.Item>
            <Menu.Item key="19" onClick={openSimpson}>Composite Simpson's Rule</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub8"
            title={
              <span>
                <PieChartOutlined />
                <span>Ordinary Differential Equation</span>
              </span>
            }
          >
            <Menu.Item key="20" onClick={openForwardDif}>Forward Divided-Diffences Method</Menu.Item>
            <Menu.Item key="21" onClick={openBackwardDif}>Backward Divided-Diffences Method</Menu.Item>
            <Menu.Item key="22" onClick={openCentralDif}>Central Divided-Diffences Method</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#268', padding: 10 }}>
          <font color="Yellow">Numer Method</font>
        </Header>
        {pageState}
      </Layout>
      </Layout>
      )
    }
    export default App;
