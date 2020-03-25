import React, { useState, useEffect, useRef } from "react";
import {
    Select, Breadcrumb, Layout, Input, InputNumber,
    Table, BackTop, Row, Col, Button, Modal, message
} from 'antd';
import api from './api'
import d3 from "d3";

window.d3 = d3;
const { Column, ColumnGroup } = Table;
const { parse, det } = require("mathjs");
const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;
const functionPlot = require("function-plot");

function NDD() {
    var [chx, setchx] = useState([])
    var [chfx, setchfx] = useState([])
    var [size, setsize] = useState(0)
    const [showans, setshowans] = useState();
    const [n, setn] = useState(0);
    const [xn, setxn] = useState(0);
    var temp
    var X = []
    var Xi = []
    var fxi = []
    const [getamatrixA,setgetamatrixA] = useState([])
    const [getamatrixB,setgetamatrixB] = useState([])
    const [getaXn,setgetaXn] = useState([])
    const [getafcs,setgetafcs] = useState([])
    useEffect(() => {
        api.getinterpo().then(res => {
            const tempfcs = []
            const tempchx = []
            const tempchfx = []
            const tempXn = []
            for (let i = 0; i < res.data.data.length; i++) {
                tempfcs.push(<Option key={i} value={i} >{res.data.data[i].matrixA},{res.data.data[i].matrixB}  </Option>)
                tempchx.push(res.data.data[i].matrixA)
                tempchfx.push(res.data.data[i].matrixB)
                tempXn.push(res.data.data[i].Xn)
            }
            setgetafcs(tempfcs)
            setgetamatrixA(tempchx)
            setgetamatrixB(tempchfx)
            setgetaXn(tempXn)
            console.log("tempXn="+tempXn)
        })
    }, []);

    function changevalue(value) {
        setchx(getamatrixA[value])
        setchfx(getamatrixB[value])
        setxn(getaXn[value])
        console.log(chx)
        console.log(chfx)
        console.log('Xn='+xn)
    }
    const NDDCode = () => {
        console.log(chx)
        console.log(chfx)
        console.log('Xn='+xn)
        const polynomail = (xn, x, temp) => {
            for (j = 1; j < x.length; j++) {
                for (i = 0; i < (x.length - j); i++) {
                    temp[i][j] = (temp[i + 1][j - 1] - temp[i][j - 1]) / (x[i + j] - x[i])
                }
            }
            console.table(temp)
            return f(xn, x, temp)
        }

        const f = (xn, x, temp) => {
            var ans = 0
            for (i = 0; i < x.length; i++) {
                ans += (temp[0][i] * fx(xn, x, i))
            }
            console.log(ans.toFixed(6))
            setshowans(ans.toFixed(6))
            return ans.toFixed(6)
        }

        const fx = (xn, x, i) => {
            var sx = 1
            for (j = 0; j < i; j++) {
                sx *= xn - x[j]
            }
            return sx
        }
        var temp = Array.from(Array(chx.length), _ => Array(chx.length).fill(0))
        var i, j
        for (i = 0; i < chx.length; i++) {
            temp[i][0] = chfx[i]
        }
        return (polynomail(xn, chx, temp))

    }
    const setfirst = () => {
        setchx(Array(n).fill(0))
        setchfx(Array(n).fill(0))
        setsize(n)
    }
    const createInput = () => {
        temp = Array(size).fill(0)
        Xi = chx
        fxi = chfx
        return (
            <div>
                <tr>
                    <th>X</th>
                </tr>
                {createx()}

                <tr>
                    <th>Y</th>
                </tr>
                {createfx()}
            </div>
        );
    }

    const createx = () => {
        return temp.map((x, i) => (
            <td>
                <InputNumber defaultValue={0} size="small" onChange={value => Xi[i] = value} />
            </td>
        ));
    }
    const createfx = () => {
        return temp.map((x, i) => (
            <td>
                <InputNumber defaultValue={0} size="small" onChange={value => fxi[i] = value} />
            </td>
        ));
    }

    const [visible1, setvisible1] = useState(false);
    const makeinput = () => {
        setvisible1(true)
    }
    const handleOk = e => {
        setvisible1(false)
    }
    const handleCancel = e => {
        setvisible1(false)
    }
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
                    <Breadcrumb.Item>Newton Divide </Breadcrumb.Item>
                    <Breadcrumb.Item>Method</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ padding: 24, background: '#fff', minHeight: 30 }}><h1>Cramer's rule.</h1>
                    <Row>
                        <Col span={8}>
                            <div><h1>Input ' N ' point</h1>
                                <InputNumber placeholder="N" onChange={value => setn(value)} />
                                <br />
                                <br />
                                <Button type="primary" onClick={setfirst} >set N</Button>
                                <br />
                            </div>
                        </Col>
                    </Row>
                    <br />
                    <div>
                        <Button type="primary" onClick={makeinput} >See Box Input</Button>
                    </div>
                    <div>
                        <Modal
                            title="X Y Point"
                            visible={visible1}
                            onOk={handleOk}
                            onCancel={handleCancel}
                        >
                            {createInput(size)}
                            <br />
                            X = <InputNumber defaultValue={0} size="small" onChange={value => setxn(value)} />
                            <br />
                        </Modal>
                        <br />
                        Example = <Select defaultValue="0" style={{ width: 120 }} onChange={changevalue}>
                        {getafcs}
                    </Select>
                    <br />
                    <br />
                    </div>
                    <br />
                    
                    <Row>
                        <Col span={8}>
                            <div>
                                <Button onClick={NDDCode} type="primary">Submit</Button>

                            </div>
                        </Col>
                    </Row>
                    <br />
                    <p> f({xn}) = {showans} </p>
                </div>
            </Content>
        </Layout>
    );
}
export default NDD