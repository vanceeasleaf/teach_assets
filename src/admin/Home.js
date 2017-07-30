/*
* @Author: vance
* @Date:   2017-07-28 17:10:19
* @Last Modified by:   vance
* @Last Modified time: 2017-07-30 15:11:59
*/

import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Row, Col } from 'antd';
import './Home.css';
import EditableTable from '../components/EditableTable'
const {SubMenu} = Menu;

const MenuItemGroup = Menu.ItemGroup;
const {Header, Content, Footer, Sider} = Layout;
class AdminHome extends Component {
  render() {
    return (
      <Layout className="teacher-home">
        <Header className="header">
          <div className="logo" />
          <Row>
            <Col span={ 10 } offset={ 0 }>
              <Menu theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={ ['2'] }
                    style={ { lineHeight: '64px' } }>
                <Menu.Item key="1">
                  nav 1
                </Menu.Item>
                <Menu.Item key="2">
                  nav 2
                </Menu.Item>
                <Menu.Item key="3">
                  nav 3
                </Menu.Item>
              </Menu>
            </Col>
            <Col span={ 1 } offset={ 11 }>
              <Menu theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={ ['1'] }
                    style={ { lineHeight: '64px' } }>
                <SubMenu title={ <span>欢迎您，管理员</span> }>
                  <Menu.Item key="setting:1">
                    个人信息
                  </Menu.Item>
                  <Menu.Item key="setting:2">
                    修改密码
                  </Menu.Item>
                  <Menu.Item key="setting:3">
                    注销
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Col>
          </Row>
        </Header>
        <Content style={ { padding: '0 50px' } }>
          <Breadcrumb style={ { margin: '12px 0' } }>
            <Breadcrumb.Item>
              管理员主页
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              教师管理
            </Breadcrumb.Item>
          </Breadcrumb>
          <Layout style={ { padding: '24px 0', background: '#fff' } }>
            <Sider width={ 200 } style={ { background: '#fff' } }>
              <Menu mode="inline"
                    defaultSelectedKeys={ ['1'] }
                    defaultOpenKeys={ ['sub1', 'sub2', 'sub3'] }
                    style={ { height: '100%' } }>
                <SubMenu key="sub1" title={ <span><Icon type="user" />subnav 1</span> }>
                  <Menu.Item key="1">
                    option1
                  </Menu.Item>
                  <Menu.Item key="2">
                    option2
                  </Menu.Item>
                  <Menu.Item key="3">
                    option3
                  </Menu.Item>
                  <Menu.Item key="4">
                    option4
                  </Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={ <span><Icon type="laptop" />subnav 2</span> }>
                  <Menu.Item key="5">
                    option5
                  </Menu.Item>
                  <Menu.Item key="6">
                    option6
                  </Menu.Item>
                  <Menu.Item key="7">
                    option7
                  </Menu.Item>
                  <Menu.Item key="8">
                    option8
                  </Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" title={ <span><Icon type="notification" />subnav 3</span> }>
                  <Menu.Item key="9">
                    option9
                  </Menu.Item>
                  <Menu.Item key="10">
                    option10
                  </Menu.Item>
                  <Menu.Item key="11">
                    option11
                  </Menu.Item>
                  <Menu.Item key="12">
                    option12
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content style={ { padding: '0 24px', minHeight: 280 } }>
            </Content>
          </Layout>
        </Content>
        <Footer style={ { textAlign: 'center' } }>
          JHPY ©2017 Created by Yang Zhou
        </Footer>
      </Layout>);
  }
}
export default AdminHome;


