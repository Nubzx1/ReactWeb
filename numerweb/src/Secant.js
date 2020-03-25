import React, { useState, useRef, useEffect } from "react";
import ReactDOM from 'react-dom';
import {
    Select, Icon, Breadcrumb, Layout, Switch, Input, InputNumber,
    Row, Col, Button, Table, BackTop
} from 'antd';
import api from './api'
const { Column, ColumnGroup } = Table;
const { parse } = require("mathjs");
const { Header, Content, Footer, Sider } = Layout;
window.d3 = require('d3')
const functionPlot = require('function-plot')
const math = require("mathjs");
const { Option } = Select;

function Secant() {
    let [Xt, setXt] = useState(0)
    let [X, setX] = useState(0)
    let [XO, setXO] = useState(0)
    let [iteration] = useState(0)
    const [fc, setfc] = useState('x^4-13')
    const [fcs, setfcs] = useState('x')
    const tempData = [];
    const [data, setdata] = useState();
    const [getafcs, setgetafcs] = useState();
    const [getafc, setgetafc] = useState();
    const [getaX, setgetaX] = useState();
    const [getaXt, setgetaXt] = useState();
    let [Xs, setXs] = useState(0)
    const chart = useRef(null);
    function SecantCode() {
        const answer = (fc, X) => parse(fc).evaluate({ x: X })
        const e = (X, XO) => Math.abs((X - XO) / X)
        while (e(X, XO) > 0.000001) {
            XO = X
            Xt = X + Math.abs(Xt - X)
            X = X - (answer(fc, X) * (X - Xt)) / (answer(fc, X) - answer(fc, Xt))
            tempData.push({
                iteration: iteration,
                x: X.toFixed(6),
                y: answer(fc, X).toFixed(6),
                e: e(X, XO).toFixed(6)
            });
            iteration++
        }
        setdata(tempData)
        setfcs(fc)
        Xs = setXs(X)
    }
    useEffect(() => {
        api.getsecant().then(res => {
            const tempfc = []
            const tempfcs = []
            const tempX = []
            const tempXt = []
            for (let i = 0; i < res.data.data.length; i++) {
                tempfcs.push(<Option key={i} value={i} >{res.data.data[i].fc} </Option>)
                tempfc.push(res.data.data[i].fc)
                tempX.push(res.data.data[i].X)
                tempXt.push(res.data.data[i].Xt)
                console.log(tempfc[i])
                console.log(tempX[i])
            }
            setgetafcs(tempfcs)
            setgetafc(tempfc)
            setgetaX(tempX)
            setgetaXt(tempXt)
        })
    }, []);
    function changevalue(value) {
        setfc(getafc[value])
        setX(getaX[value])
        setXt(getaXt[value])
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
                fn: fcs.replace("e",Math.E),
                color: "black",
                graphType: 'polyline'
              
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
                    <Breadcrumb.Item>Secant</Breadcrumb.Item>
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
                            X = <InputNumber X step={0.1} onChange={value => setX(value)} />
                        </Col>
                        <Col span={6}>
                            Xt = <InputNumber Xt step={0.1} onChange={value => setXt(value)} />
                        </Col>
                        <Col span={6}>
                        Example = <Select defaultValue="0" style={{ width: 120 }} onChange={changevalue}>
                                {getafcs}
                            </Select>

                        </Col>
                    </Row>
                    <br />
                    <Button type="primary" onClick={SecantCode} >Submit</Button>
                    <br />
                    <br />
                    X = {Xs.toFixed(6)}
                    <Table dataSource={data}>
                        <Column title="iteration" dataIndex="iteration" key="iteration" />
                        <Column title="X" dataIndex="x" key="x" />
                        <Column title="Y" dataIndex="y" key="y" />
                        <Column title="Error" dataIndex="e" key="e" />
                    </Table>,
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
export default Secant