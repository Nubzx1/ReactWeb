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
const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;
const functionPlot = require("function-plot");
const { create, all, derivative, parse } = require("mathjs");
const mathjs = create(all)
const integral = require("mathjs-simple-integral")
mathjs.import(integral);
function Trapezoidel() {
  const chart = useRef(null);
  let [a, seta] = useState(-1)
  let [b, setb] = useState(5)
  let [n, setn] = useState(1)
  const [fc, setfc] = useState('4x^5-3x^4+x^3-6x+2')
  const tempChart = [];
  const [data, setdata] = useState([{ fn: 'x' }]);
  var Ireal = 0, Ical = 0,Error=0
  const [getafcs, setgetafcs] = useState();
  const [getafc, setgetafc] = useState();
  const [getaa, setgetaa] = useState();
  const [getab, setgetab] = useState();
  const [getan, setgetan] = useState();
  const [showIreal, setshowIreal] = useState(0);
  const [showIcal, setshowIcal] = useState(0);
  const [showError, setshowError] = useState(0);
  function changevalue(value) {
    setfc(getafc[value])
    seta(getaa[value])
    setb(getab[value])
    setn(getan[value])
    console.log('fc =', fc)
    console.log('a =', a)
    console.log('b =', b)
  }
  useEffect(() => {
    api.getinter().then(res => {
      const tempfc = []
      const tempfcs = []
      const tempa = []
      const tempb = []
      const tempn = []
      for (let i = 0; i < res.data.data.length; i++) {
        tempfcs.push(<Option key={i} value={i} >{res.data.data[i].fc} </Option>)
        tempfc.push(res.data.data[i].fc)
        tempa.push(res.data.data[i].a)
        tempb.push(res.data.data[i].b)
        tempn.push(res.data.data[i].n)
        console.log(tempfc[i])
        console.log(tempa[i])
        console.log(tempb[i])
      }
      setgetafcs(tempfcs)
      setgetafc(tempfc)
      setgetaa(tempa)
      setgetab(tempb)
      setgetan(tempn)
    })
  }, []);
  function TrapezoidelCode() {
    var h = (b - a) / n
    var i = a
    var io = i
    var j = 0
    var fx = []
    const tempDiffc = derivative(parse(fc), 'x')
    const answer = (fc, X) => parse(fc).evaluate({ x: X })
    const e = (Ireal, Ical) => Math.abs((Ireal - Ical) / Ireal)
    const integralANS = mathjs.integral(fc, 'x')
    const tempfc = integralANS.toString()
    Ireal = mathjs.parse(tempfc).evaluate({ x: b }) - mathjs.parse(tempfc).evaluate({ x: a })
    tempChart.push({ fn: fc })
    for (j = 0; j <= n; j++) {
      fx.push((answer(fc, i)))
      if (i === a || i === b) {
        Ical = Ical + fx[j]
      }
      else {
        Ical = Ical + (2 * fx[j])
      }
      if (j !== 0) {
        console.log('j!==0')
        console.log(`(${fx[j]})+(((${fx[j]})-(${fx[j-1]}))/((${i})-(${io})))*(x-(${i}))`)
        tempChart.push({
          fn: `(${fx[j]})+(((${fx[j]})-(${fx[j-1]}))/((${i})-(${io})))*(x-(${i}))`,
          range: [io, i],
          closed: true,
          color: "red",
          graphType: 'polyline'
        })
      }
      io = i
      i = i + h
    }
    Ical = (h / 2) * Ical
    console.log(fx)
    console.log(Ical)
    console.log(Ireal)
    Error = e(Ireal, Ical)
    console.log(Error)
    console.log(tempChart)
    setshowIreal(Ireal)
    setshowIcal(Ical)
    setshowError(Error)
    setdata(tempChart)
    console.log(data[0])
  }
  useEffect(() => {
    functionPlot({
      target: chart.current,

      tip: {
        renderer: function () { }
      },
      grid: false,
      data: data

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
          <Breadcrumb.Item>Trapezoidel</Breadcrumb.Item>
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
              a = <InputNumber step={0.1} onChange={value => seta(value)} />
            </Col>
            <Col span={6}>
              b = <InputNumber step={0.1} onChange={value => setb(value)} />
            </Col>
            <Col span={6}>
              n = <InputNumber step={1} onChange={value => setn(value)} />
            </Col>
            <Col span={6}>
             Example = <Select defaultValue="0" style={{ width: 120 }} onChange={changevalue}>
                {getafcs}
              </Select>
            </Col>
          </Row>
          <br />
          <Button type="primary" onClick={TrapezoidelCode} >Submit</Button>
          <br />
          <br />
          Ireal = {showIreal}<br />
          Ical = {showIcal}<br />
          Error = {showError}<br />
          <br />
          <br />
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
export default Trapezoidel