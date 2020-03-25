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

function MultipleRegression() {
    const chart = useRef(null);
    var [chx, setchx] = useState([])
    var [chfx, setchfx] = useState([])
    var [pow, setpow] = useState()
    var [xn, setxn] = useState()
    const tempData = [];
    const tempChart = [];
    const [data, setdata] = useState();
    const [n, setn] = useState(0);
    var [size, setsize] = useState(0)
    var temp
    var X = []
    var Xi = []
    var fxi = []

    const MultipleRegressioncode = () => {
        pow++
    var A = Array.from(Array(pow), _ => Array(pow).fill(0))
    var B = Array(pow).fill(0)
    var i,j

    const sum = (pow, ...X) => {
        var sum = 0
        if (X.length === 1) {
            for (var i = 0; i < X[0].length; i++) {
                sum += Math.pow(X[0][i], pow)
            }
        } else {
            for (i = 0; i < X[0].length; i++) {
                sum += (Math.pow(X[0][i], pow) * X[1][i])
            }
        }
        return sum
    }

    const guess = (A, B) => {
        console.log(A)
        console.log(B)
        var X = Array(A.length).fill(0)
        var i, j, k, temp
        for (k = 0; k < A.length - 1; k++) {
            for (i = k + 1; i < A.length; i++) {
                temp = A[i][k]
                for (j = k; j < A.length; j++) {
                    A[i][j] = (A[i][j] - (A[k][j] / A[k][k]) * temp)
                }
                B[i] = (B[i] - (B[k] / A[k][k]) * temp)
            }
        }
        for (i = A.length - 1; i >= 0; i--) {
            X[i] = B[i] / A[i][i];
            for (j = i - 1; j >= 0; j--) {
                B[j] -= A[j][i] * X[i]
            }
        }
        console.log(X)
        return X
    }

    for (i = 0; i < pow; i++) {
        B[i] = (!i) ? sum(1, fxi) : sum(i, Xi, fxi)
        for (j = 0; j < pow; j++) {
            if (!i && !j) {
                A[i][j] = Xi.length
            } else {
                A[i][j] = sum((i + j), Xi)
            }
        }
    }

    console.table(A)
    console.table(B)
    var ax = guess(A, B)
    console.table(ax)
    var ans = 0
    for (i = 0; i < pow; i++) {
        ans += ax[i] * Math.pow(xn, i)
    }
    console.log(ans)
    
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
                    <Breadcrumb.Item>Multiple Regression</Breadcrumb.Item>
                    <Breadcrumb.Item>Method</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ padding: 24, background: '#fff', minHeight: 30 }}><h1>Multiple Regression</h1>
                    <Row>
                        <Col span={8}>
                            <div><h1>Input 'N' counting</h1>
                                <InputNumber placeholder="N" onChange={value => setn(value)} />
                            </div>
                        </Col>
                    </Row>
                    <Button type="primary" onClick={setfirst} >set N</Button>
                    <div>
                        <Popconfirm placement="bottom" title={createInput(n)}>
                            <br /><Button>Show</Button>
                        </Popconfirm>
                    </div>
                    <br />
                    POW = <InputNumber defaultValue={0} size="small" onChange={value => setpow(value)} /> (1 = Linear) (>2 = Polynomial) 
                    <br />
                    <br />
                    X = <InputNumber defaultValue={0} size="small" onChange={value => setxn(value)} />
                    <br />
                    <br />
                    <Row>
                        <Col span={8}>
                            <div>
                                <Button onClick={MultipleRegressioncode} type="primary">Submit</Button>
                            </div>
                        </Col>
                    </Row>
                    
                </div>
            </Content>
        </Layout>
    );
}
export default MultipleRegression