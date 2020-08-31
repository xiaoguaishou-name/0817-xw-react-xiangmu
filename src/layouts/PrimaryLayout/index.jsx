import React, { Component, Suspense } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  GlobalOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import SiderMenu from "../SiderMenu/index";
import { connect } from "react-redux";
import { withRouter, Route } from "react-router-dom";
import components from "@conf/asyncComps";
import { defaultRoutes } from "@conf/routes";
import "./index.less";

import logo from "@assets/images/logo.png";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
@withRouter
@connect((state) => ({ user: state.user }))
class PrimaryLayout extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    // console.log(collapsed);
    this.setState({ collapsed });
  };
  //将permissionList数据，转成Route组件的函数
  renderRoute = (routes, path) => {
    return routes.map((item) => {
      if (item.component) {
        console.log(item.component, 444);
        console.log(components["Test"], 333);
        const MyComponent = components[item.component]()
          // const MyComponent = components[item.component] && components[item.component]();
        // console.log(typeof MyComponent)
        // console.log(typeof components[item.component])
        return (
          <Route
            path={path ? path + item.path : item.path}
            component={MyComponent}
            exact
            key={item.path}
          ></Route>
        );
      }
      if (item.children && item.children.length) {
        return this.renderRoute(item.children, item.path);
      }
    });
  };
  render() {
    const { name, avatar, permissionList } = this.props.user;
    const pathname = this.props.location.pathname;
    const reg = /[/][\w]*/g;
    const matchArr = pathname.match(reg);
    const firstPath = matchArr[0];
    const secPath = matchArr[1];
    const thirdPath = matchArr[2] || "";
    let firstName;
    let secName;
    permissionList.forEach((route) => {
      if (route.path === firstPath) {
        firstName = route.name;
        route.children.forEach((secItem) => {
          if (secItem.path === secPath + thirdPath) {
            secName = secItem.name;
          }
        });
      }
    });
    return (
      <Layout className="layout">
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo">
            <img src={logo} alt="" />
            {!this.state.collapsed && <h1>硅谷教育管理系统</h1>}
          </div>
          {/* <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>
            <Menu.Item key='1' icon={<PieChartOutlined />}>
              Option 1
            </Menu.Item>
            <Menu.Item key='2' icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
            <SubMenu key='sub1' icon={<UserOutlined />} title='User'>
              <Menu.Item key='3'>Tom</Menu.Item>
              <Menu.Item key='4'>Bill</Menu.Item>
              <Menu.Item key='5'>Alex</Menu.Item>
            </SubMenu>
            <SubMenu key='sub2' icon={<TeamOutlined />} title='Team'>
              <Menu.Item key='6'>Team 1</Menu.Item>
              <Menu.Item key='8'>Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key='9' icon={<FileOutlined />} />
          </Menu> */}
          <SiderMenu></SiderMenu>
        </Sider>

        <Layout className="site-layout">
          <Header className="layout-header">
            <img src={avatar} alt="" />
            <span>{name}</span>
            <GlobalOutlined />
          </Header>
          <Content>
            <div className="layout-nav">
              {!firstName ? (
                <h2>首页</h2>
              ) : (
                <Breadcrumb>
                  <Breadcrumb.Item>{firstName}</Breadcrumb.Item>
                  <Breadcrumb.Item>{secName}</Breadcrumb.Item>
                </Breadcrumb>
              )}
              <h3>{secName}</h3>
            </div>

            {/* <div className="layout-content">Bill is a cat.</div> */}
            <div className="layout-content">
              <Suspense fallback={<div>正在加载中...</div>}>
                {this.renderRoute(defaultRoutes)}
                {this.renderRoute(this.props.user.permissionList)}
              </Suspense>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
export default PrimaryLayout;
