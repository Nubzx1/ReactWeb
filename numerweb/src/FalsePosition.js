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

function FalsePosition() {
  let [XR, setXR] = useState(0.03)
  let [XL, setXL] = useState(0.02)
  let [XM, XMO, setXM] = useState(0)
  let [iteration] = useState(0)
  let [Xs, setXs] = useState(0)
  const [fc, setfc] = useState('x^4-13')
  const tempData = [];
  const [data, setdata] = useState();
  let [fcs, setfcs] = useState('x');
  const [getafcs, setgetafcs] = useState();
  const [getafc, setgetafc] = useState();
  const [getaXL, setgetaXL] = useState();
  const [getaXR, setgetaXR] = useState();
  function FalsePositionCode() {
    const answer = (fc, X) => parse(fc).evaluate({ x: X })
    const e = (XM, XMO) => Math.abs((XM - XMO) / XM)
    const fXM = (XL, XR) => ((XL * answer(fc, XR)) - (XR * answer(fc, XL))) / (answer(fc, XR) - answer(fc, XL))
    while (iteration <= 1 || e(XM, XMO) > 0.000001) {
      XMO = XM
      XM = fXM(XL, XR)
      if (answer(fc, XM) * answer(fc, XR) < 0) {
        XL = XM
      } else {
        XR = XM
      }
      tempData.push({
        iteration: iteration,
        x: XM.toFixed(6),
        y: answer(fc, XM).toFixed(6),
        e: e(XM, XMO).toFixed(6)
      });
      iteration++
    }
    console.log('XM = ' + XM)
    console.log('iteration = ' + iteration)
    setdata(tempData)
    setfcs(fc)
    Xs = setXs(XM)
  }
  useEffect(() => {
    api.getfalseposition().then(res => {
      const tempfc = []
      const tempfcs = []
      const tempXL = []
      const tempXR = []
      for (let i = 0; i < res.data.data.length; i++) {
        tempfcs.push(<Option key={i} value={i} >{res.data.data[i].fc} </Option>)
        tempfc.push(res.data.data[i].fc)
        tempXL.push(res.data.data[i].XL)
        tempXR.push(res.data.data[i].XR)
        console.log(tempfc[i])
        console.log(tempXL[i])
        console.log(tempXR[i])
      }
      setgetafcs(tempfcs)
      setgetafc(tempfc)
      setgetaXL(tempXL)
      setgetaXR(tempXR)
    })
  }, []);
  const chart = useRef(null);
  function changevalue(value) {
    setfc(getafc[value])
    setXL(getaXL[value])
    setXR(getaXR[value])
    console.log('fc =', fc)
    console.log('XL =', XL)
    console.log('XR =', XR)
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
          fn: fcs
          
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
          <Breadcrumb.Item>FalsePosition</Breadcrumb.Item>
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
              XL = <InputNumber XL step={0.1} onChange={value => setXL(value)} />
            </Col>
            <Col span={6}>
              XR = <InputNumber XR step={0.1} onChange={value => setXR(value)} />
            </Col>
            <Col span={6}>
              Example = <Select defaultValue="0" style={{ width: 120 }} onChange={changevalue}>
                {getafcs}
              </Select>

            </Col>
          </Row>
          <br />
          <Button type="primary" onClick={FalsePositionCode} >Submit</Button>
          <br />
          <br />
          X = {Xs.toFixed(6)}
          <Table dataSource={data}>
            <Column title="iteration" dataIndex="iteration" key="iteration" />
            <Column title="X" dataIndex="x" key="x" />
            <Column title="Y" dataIndex="y" key="y" />
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
export default FalsePosition