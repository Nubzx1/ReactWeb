import React, { useState, useEffect, useRef } from "react";
import {
    Select, Breadcrumb, Layout, Input, InputNumber,
    Table, BackTop, Row, Col, Button, Popconfirm, message
} from 'antd';
import api from './api'
import d3 from "d3";
window.d3 = d3;

const { Column, ColumnGroup } = Table;
const { parse, det,multiply,add, subtract, } = require("mathjs");
const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;
const functionPlot = require("function-plot");

function Conjugate() {
    const chart = useRef(null);
    const tempData = [];
    const tempChart = [];

    const [data, setdata] = useState();
    const [n, setn] = useState(0);
    var temp
    var matrixA = []
    var matrixB = []
    const [getamatrixA,setgetamatrixA] = useState([])
    const [getamatrixB,setgetamatrixB] = useState([])
    const [getafcs,setgetafcs] = useState([])
    useEffect(() => {
        api.getcramer().then(res => {
            const tempfcs = []
            const tempmatrixA = []
            const tempmatrixB = []
            for (let i = 0; i < res.data.data.length; i++) {
                tempfcs.push(<Option key={i} value={i} >{res.data.data[i].matrixA},{res.data.data[i].matrixB}  </Option>)
                tempmatrixA.push(res.data.data[i].matrixA)
                tempmatrixB.push(res.data.data[i].matrixB)
            }
            setgetafcs(tempfcs)
            setgetamatrixA(tempmatrixA)
            setgetamatrixB(tempmatrixB)
        })
    }, []);

    function changevalue(value) {
        matrixA = getamatrixA[value]
        matrixB = getamatrixB[value]
        console.log(matrixA)
        console.log(matrixB)
    }

    const Conjugatecode = () => {
        console.log(matrixA)
        console.log(matrixB)
        const e = (R) => Math.sqrt(multiply(R, R)).toFixed(6)
        const epsilon = 0.000001
        var X = Array(matrixA.length).fill(0)
        var R = Array(matrixA.length).fill(0)
        var D = Array(matrixA.length).fill(0)
        var iter = 1
        var alpha, lamda
        var i = 0
        R = subtract(multiply(matrixA, X), matrixB)
        while (iter === 1 || e(R) > epsilon) {
            D = (iter === 1) ? multiply(R, -1) : add(multiply(R, -1), multiply(alpha, D))
            lamda = (-(multiply(D, R))) / (multiply(D, multiply(matrixA, D)))
            X = add(X, multiply(lamda, D))
            R = subtract(multiply(matrixA, X), matrixB)
            iter++
            alpha = (multiply(R, multiply(matrixA, D))) / (multiply(D, multiply(matrixA, D)))
        }

        for(i=0;i<X.length;i++){
            tempData.push({
                x: X[i].toFixed(6)
            });
         }
        setdata(tempData)
        console.log(X)
        return X
    }

    const createInput = () => {
        if (n >= 0) {
            temp = Array.from(Array(n), _ => Array(n + 1).fill(0))
            matrixA = Array.from(Array(n), _ => Array(n).fill(0))
            matrixB = Array(n).fill(0)

            return (
                <div>
                    <tr>
                        <th></th>
                        {createHead()}
                        {(n > 0) ? <th><center>b</center></th> : ""}
                    </tr>
                    {createRow()}
                </div>
            );
        }
    }

    const createHead = () => {
        return temp.map((x, j) => <th>x{j + 1}</th>);
    }

    const createRow = () => {
        return temp.map((x, i) => (
            <tr>
                <th>{i + 1}</th>
                {createCol(i)}
            </tr>
        ));
    }

    const createCol = (i) => {
        return temp[0].map((x, j) => (
            <td>
                <InputNumber defaultValue={0} size="small" onChange={value => {
                    if (j === n) {
                        matrixB[i] = value
                    } else {
                        matrixA[i][j] = value
                    }
                }}
                />
            </td>
        ));
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
                    <Breadcrumb.Item>Conjugate Gradient</Breadcrumb.Item>
                    <Breadcrumb.Item>Method</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ padding: 24, background: '#fff', minHeight: 30 }}><h1>Conjugate Gradient</h1>
                    <Row>
                        <Col span={8}>
                            <div><h1>Input 'N x N' matrix</h1>
                                <InputNumber placeholder="N" onChange={value => setn(value)} />
                            </div>
                        </Col>
                    </Row>
                    <div>
                        <Popconfirm placement="bottom" title={createInput(n)}>
                            <br /><Button>Show</Button>
                        </Popconfirm>
                    </div>
                    Example = <Select defaultValue="0" style={{ width: 120 }} onChange={changevalue}>
                        {getafcs}
                    </Select>
                    <br />
                    <Row>
                        <Col span={8}>
                            <div>
                                <Button onClick={Conjugatecode} type="primary">Submit</Button>
                            </div>
                        </Col>
                    </Row>
                    <Table dataSource={data}>
                        <Column title="X" dataIndex="x" key="x" />
                    </Table>
                </div>
            </Content>
        </Layout>
    );
}
export default Conjugate