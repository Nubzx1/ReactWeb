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

function LU() {
    const chart = useRef(null);
    const tempData = [];
    const tempChart = [];
    const [getamatrixA,setgetamatrixA] = useState([])
    const [getamatrixB,setgetamatrixB] = useState([])
    const [getafcs,setgetafcs] = useState([])
    const [data, setdata] = useState();
    const [n, setn] = useState(0);
    var temp
    var matrixA = []
    var matrixB = []
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

    const LUcode = () => {
        console.log(matrixA)
        console.log(matrixB)
        var X = Array(matrixA.length).fill(0)
        var Y = Array(matrixA.length).fill(0)
        var L = Array.from(Array(matrixA.length), _ => Array(matrixA.length).fill(0))
        var U = Array.from(Array(matrixA.length), _ => Array(matrixA.length).fill(0))
        var i, j, k
        for (i = 0; i < matrixA.length; i++) {
            for (j = 0; j < matrixA.length; j++) {
                if (j > i) {
                    U[i][j] = matrixA[i][j];
                }
                else {
                    if (i === j) {
                        U[i][j] = 1;
                    }
                    L[i][j] = matrixA[i][j];
                }
            }
        }
        for (k = 0; k < matrixA.length; k++) {
            for (i = 0; i < matrixA.length; i++) {
                for (j = 0; j < matrixA.length; j++) {
                    if (i > k) {
                        if (j !== k) {
                            U[k][i] -= L[k][j] * U[j][i];
                        }
                    }
                    else {
                        if (j !== i) {
                            L[k][i] -= L[k][j] * U[j][i];
                        }
                    }
                }
                if (k >= i) {
                    L[k][i] /= U[i][i];
                }
                else {
                    U[k][i] /= L[k][k];
                }
            }
        }
        for (i = 0; i < matrixA.length; i++) {
            Y[i] = (matrixB[i] / L[i][i]).toFixed(6)
            for (j = i + 1; j < matrixA.length; j++) {
                matrixB[j] -= L[j][i] * Y[i];
            }
        }
        for (i = matrixA.length - 1; i >= 0; i--) {
            X[i] = (Y[i] / U[i][i]).toFixed(6)
            for (j = i - 1; j >= 0; j--) {
                Y[j] -= U[j][i] * X[i];
            }
        }
        console.log(X)
        for(i=0;i<X.length;i++){
            tempData.push({
                x: (X[i])
            });
         }
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
                    <Breadcrumb.Item>LU Decomposite</Breadcrumb.Item>
                    <Breadcrumb.Item>Method</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ padding: 24, background: '#fff', minHeight: 30 }}><h1>LU Decomposite</h1>
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
                                <Button onClick={LUcode} type="primary">Submit</Button>
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
export default LU