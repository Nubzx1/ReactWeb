import React, { useState, useEffect, useRef } from "react";
import ReactDOM from 'react-dom';
import {
    Select, Breadcrumb, Layout, Input, InputNumber,
    Row, Col, Button, Table, BackTop, Radio
} from 'antd';
import api from './api'
import d3 from "d3";
window.d3 = d3;
const { Column, ColumnGroup } = Table;
const { parse, derivative } = require("mathjs");
const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;
const functionPlot = require("function-plot");

function BackwardDif() {
    const chart = useRef(null);
    let [H, setH] = useState(0)
    let [X, setX] = useState(0)
    let [Diff, setDiff] = useState(0)
    let [ANSs, setANSs] = useState(0)
    let [Es, setEs] = useState(0)
    let [iteration] = useState(0)
    const [fc, setfc] = useState('x^4-13')
    const tempData = [];
    const tempChart = [];
    const [data, setdata] = useState();
    let [fcs, setfcs] = useState('x');
    var state = 1
    const [getafcs, setgetafcs] = useState();
    var [getafc, setgetafc] = useState();
    var [getaX, setgetaX] = useState();
    var [getaH, setgetaH] = useState();
    var [getaDiff, setgetaDiff] = useState();
    function changevalue(value) {
        setfc(getafc[value])
        setX(getaX[value])
        setH(getaH[value])
        setDiff(getaDiff[value])
    }
    useEffect(() => {
        api.getdiff().then(res => {
            const tempfc = []
            const tempfcs = []
            const tempX = []
            const tempH = []
            const tempDiff = []
            for (let i = 0; i < res.data.data.length; i++) {
                tempfcs.push(<Option key={i} value={i} >{res.data.data[i].fc} </Option>)
                tempfc.push(res.data.data[i].fc)
                tempX.push(res.data.data[i].X)
                tempH.push(res.data.data[i].H)
                tempDiff.push(res.data.data[i].Diff)
                console.log("fc = "+tempfc[i])
                console.log('x = '+tempX[i])
                console.log('H ='+tempH[i])
            }
            setgetafcs(tempfcs)
            setgetafc(tempfc)
            setgetaX(tempX)
            setgetaH(tempH)
            setgetaDiff(tempDiff)
        })
    }, []);
    function BackwardDifCode() {
        const answer = (fc, X) => parse(fc).evaluate({ x: X })
        const e = (E, ANS) => Math.abs((E - ANS) / E)
        const Deri1fc = (fc, X) => derivative(parse(fc), 'x').evaluate({ x: X })
        const Deri2fc = (fc, X) => derivative(derivative(parse(fc), 'x'), 'x').evaluate({ x: X })
        const Deri3fc = (fc, X) => derivative(derivative(derivative(parse(fc), 'x'), 'x'), 'x').evaluate({ x: X })
        const Deri4fc = (fc, X) => derivative(derivative(derivative(derivative(parse(fc), 'x'), 'x'), 'x'), 'x').evaluate({ x: X })
        var ANS = 0
        var E = 0
        if (state === 1) {
            if (Diff === 1) {
                ANS = (answer(fc, X) - answer(fc, X-H)) / (H)
                E = Deri1fc(fc, X)
            }
            else if (Diff === 2) {
                ANS = ((answer(fc, X)) - (2 * answer(fc, X - H)) + answer(fc, X-(2*H))) / (H ** 2)
                E = Deri2fc(fc, X)
            }
            else if (Diff === 3) {
                ANS = (answer(fc,X) - 3 * answer(fc,X - H) + 3 * answer(fc,X-(2*H)) - answer(fc,X-(3*H))) / Math.pow(H, 3)
                E = Deri3fc(fc, X)
            }
            else if (Diff === 4) {
                ANS = ((answer(fc, X)) - (4 * answer(fc, X - (H))) + (6 * answer(fc, X - (2 * H))) - (4 * answer(fc, X - (3*H))) + answer(fc, X-(4*H))) / (H ** 4)
                E = Deri4fc(fc, X)
            }
            else {
                ANS = 0
            }
           
        }
        else if(state === 2){
            if (Diff === 1) {
                ANS = (  (3*answer(fc,X))- (4*answer(fc, X-H))+ answer(fc, X - (2*H)) ) / (2*H)
                E = Deri1fc(fc, X)
            }
            else if (Diff === 2) {
                ANS = ( (2*(answer(fc,X))) - (5*answer(fc,X-H))+ (4*answer(fc,X-(2*H)))- ( answer(fc,X-(3*H)))  )  / (H ** 2)
                E = Deri2fc(fc, X)
            }
            else if (Diff === 3) {
                ANS = (  (5*answer(fc,X)) - (18*answer(fc,X-H)) + (24*answer(fc,X-(2*H))) - ( 14*answer(fc,X-(3*H) )) - (answer(fc,X-(4*H))) ) / (2*(H ** 3))
                E = Deri3fc(fc, X)
            }
            else if (Diff === 4) {
                ANS = ( (3*answer(fc,X))- (14*answer(fc,X-H))+ (26*answer(fc,X-(2*H)))- (24*answer(fc,X-(3*H)))+ (11*answer(fc,X-(4*H)))-(2*answer(fc,X-(5*H)))      ) / (H ** 4)
                E = Deri4fc(fc, X)
            }
            else {
                ANS = 0
            }
        }
        setANSs(ANS)
        console.log('real= '+E)
        E = e(E, ANS)
        setEs(E)
        console.log('ANS =' + ANS)
        console.log("E =" + E)
    }
    const onChange = e => {
        console.log('radio checked', e.target.value);
        state = e.target.value
        console.log('state ', state)
    };
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
                    <Breadcrumb.Item>Bisection</Breadcrumb.Item>
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
                        <Col span={3}>
                            X = <InputNumber step={0.1} onChange={value => setX(value)} />
                        </Col>
                        <br />
                        <Col span={3}>
                            H = <InputNumber step={0.1} onChange={value => setH(value)} />
                        </Col>
                        <br />
                        <Col span={3}>
                            Diff = <InputNumber step={1} onChange={value => setDiff(value)} />
                        </Col>
                        <Col span={6}>
                            Example = <Select defaultValue="0" style={{ width: 120 }} onChange={changevalue}>
                                {getafcs}
                            </Select>
                        </Col>
                    </Row>
                    <br />
                    <Radio.Group onChange={onChange} defaultValue={1}>
                        <Radio value={1}>O(h)</Radio>
                        <Radio value={2}>O(h^2)</Radio>
                    </Radio.Group>
                    <br />
                    <br />
                    <Button type="primary" onClick={BackwardDifCode} >Submit</Button>
                    <br />
                    <br />
                    ANS = {ANSs}
                    <br />
                    <br />
                    Error = {Es}
                    <br />
                    <br />
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
export default BackwardDif