import React, { useState, useEffect, useRef } from "react";
import ReactDOM from 'react-dom';
import {
  Select, Breadcrumb, Layout, Input, InputNumber,
  Row, Col, Button, Table, BackTop
} from 'antd';
import api from './api'
import d3 from "d3";
window.d3 = d3;
const { Column, ColumnGroup } = Table;
const { parse } = require("mathjs");
const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;
const functionPlot = require("function-plot");

function Taylor() {
  let [X, setX] = useState(2)
  let XO = 0
  let [iteration] = useState(0)
  let [Xs, setXs] = useState(0)
  const [fc, setfc] = useState('2-e^(x/4)')
  const tempData = [];
  const [data, setdata] = useState();
  let [fcs, setfcs] = useState('2-e^(x/4)');
  const [getafcs, setgetafcs] = useState();
  const [getafc, setgetafc] = useState();
  const [getaX, setgetaX] = useState();
  function TaylorCode() {
    const answer = (fc, X) => parse(fc).evaluate({ x: X })
    const e = (X, XO) => Math.abs((X - XO) / X)
    while (iteration <= 1 || e(X, XO) > 0.000001) {
      if(iteration>0){
        XO=X
      }
      X = answer(fc,XO)
      tempData.push({
        iteration: iteration,
        x: X.toFixed(6),
        e: e(X, XO).toFixed(6)
      });
      iteration++
    }
    Xs = setXs(X)
    console.log('X = ' + X)
    console.log('iteration = ' + iteration)
    setdata(tempData)
    setfcs(fc)
  }
  useEffect(() => {
    api.getfalseposition().then(res => {
      const tempfc = []
      const tempfcs = []
      const tempX = []
      for (let i = 0; i < res.data.data.length; i++) {
        tempfcs.push(<Option key={i} value={i} >{res.data.data[i].fc} </Option>)
        tempfc.push(res.data.data[i].fc)
        tempX.push(res.data.data[i].X)
        console.log(tempfc[i])
        console.log(tempX[i])
      }
      setgetafcs(tempfcs)
      setgetafc(tempfc)
      setgetaX(tempX)
    })
  }, []);
  const chart = useRef(null);
  function changevalue(value) {
    setfc(getafc[value])
    setX(getaX[value])
    console.log('fc =', fc)
    console.log('X =', X)
  }
  
  useEffect(() => {
    functionPlot({
      target: chart.current,
      yAxis: { domain: [-1, 9] },
      tip: {
        renderer: function () { }
      },
      grid: false,
      data: [
        {
          fn: fcs.replace("e",Math.E)
          
        }
      ],
      annotations: [{
        x: Xs
      }]
    });
  });
  return (
    <Layout>
      <Content style={{ margin: '0 16px' }}>
        <BackTop style={{
          color: '#fff',
          Height: '40px',
          Width: '40px',
          lineHeight: '40px',
          backgroundColor: 'rgba(64, 64, 64, 0.6)',
          textAlign: 'center',
          fontSize: '15px',
          borderRadius: '30px'
        }}>
          UP
          </BackTop>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Taylor Series</Breadcrumb.Item>
          <Breadcrumb.Item>Method</Breadcrumb.Item>
        </Breadcrumb>

        <div style={{ padding: 24, background: '#fff', minHeight: 480 }}>
          Function =  <Input
            fc
            onChange={event => setfc(event.target.value)}
            placeholder="Example : x^2-20"
            style={{ width: "300px", size: "10px", margin: '10px 0' }}
          />
          <br />
          <br />
          <Row >
            <Col span={6}>
              X = <InputNumber  step={0.1} onChange={value => setX(value)} />
            </Col>
            <Col span={6}>
              <Select defaultValue="0" style={{ width: 120 }} onChange={changevalue}>
                {getafcs}
              </Select>

            </Col>
          </Row>
          <br />
          <Button type="primary" onClick={TaylorCode} >Submit</Button>
          <br />
          <br />
          X = {Xs.toFixed(6)}
          <br />
          <Table dataSource={data}>
            <Column title="iteration" dataIndex="iteration" key="iteration" />
            <Column title="X" dataIndex="x" key="x" />
            <Column title="Error" dataIndex="e" key="e" />
          </Table>
          <div ref={chart}></div>
        </div>
      </Content>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </Layout>
  )
}
export default Taylor