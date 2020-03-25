import React from 'react';
import ReactDOM from 'react-dom';
import { Menu, Icon, Breadcrumb, Layout, Switch } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
class Home extends React.Component {
  render() {
    return (
      <Layout>
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ padding: 24, background: '#fff', minHeight: 480 }}>
          IS A GOOD WEED <br />
          Credit<br />
          https://ant.design <br />
          https://mathjs.org <br />
          https://mauriciopoppe.github.io/function-plot/ <br/>
          https://nodejs.org/uk/docs/guides/nodejs-docker-webapp/ <br/>
        </div>
      </Content>
      </Layout>
    )
  }
}
export default Home