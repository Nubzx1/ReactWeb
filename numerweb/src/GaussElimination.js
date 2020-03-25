import React, { useState, useEffect, useRef } from "react";
import {
    Select, Breadcrumb, Layout, Input, InputNumber,
    Table, BackTop, Row, Col, Button, Popconfirm, message
} from 'antd';
import api from './api'
import d3 from "d3";
window.d3 = d3;

const { Column, ColumnGroup } = Table;
const { parse, det } = require("mathjs");
const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;
const functionPlot = require("function-plot");

function GaussElimination() {
    const chart = useRef(null);
    const tempData = [];
    const tempChart = [];
    const [data, setdata] = useState();
    const [n, setn] = useState(0);
    const [getamatrixA,setgetamatrixA] = useState([])
    const [getamatrixB,setgetamatrixB] = useState([])
    const [getafcs,setgetafcs] = useState([])
    var temp
    var X = []
    var matrixA = []
    var matrixB = []
    const GaussEliminationcode = () => {
        console.log(matrixA)
        console.log(matrixB)
        var X = Array(matrixA.length).fill(0)
        var i, j, k, temp
        for (k = 0; k < matrixA.length - 1; k++) {
            for (i = k + 1; i < matrixA.length; i++) {
                temp = matrixA[i][k]
                for (j = k; j < matrixA.length; j++) {
                    matrixA[i][j] = (matrixA[i][j] - (matrixA[k][j] / matrixA[k][k]) * temp).toFixed(6)
                }
                matrixB[i] = (matrixB[i] - (matrixB[k] / matrixA[k][k]) * temp).toFixed(6)
            }
        }
        for (i = matrixA.length - 1; i >= 0; i--) {
            X[i] = matrixB[i] / matrixA[i][i];
            for (j = i - 1; j >= 0; j--) {
                matrixB[j] -= matrixA[j][i] * X[i]
            }
            tempData.unshift({
                iteration: i+1,
                x: X[i].toFixed(6)
            });
        }
        console.log(X)
        setdata(tempData)
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
        return temp.map((X, j) => <th>X{j + 1}</th>);
    }
    const createRow = () => {
        return temp.map((X, i) => (
            <tr>
                <th>{i + 1}</th>
                {createCol(i)}
            </tr>
        ));
    }
    const createCol = (i) => {
        return temp[0].map((X, j) => (
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
                    <Breadcrumb.Item>Cramer Rule</Breadcrumb.Item>
                    <Breadcrumb.Item>Method</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ padding: 24, background: '#fff', minHeight: 30 }}><h1>GaussElimination</h1>
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
                                <Button onClick={GaussEliminationcode} type="primary">Submit</Button>
                            </div>
                        </Col>
                    </Row>
                    <Table dataSource={data}>
                        <Column title="iteration" dataIndex="iteration" key="iteration" />
                        <Column title="X" dataIndex="x" key="x" />
                    </Table>
                </div>
            </Content>
        </Layout>
    );
}
export default GaussElimination