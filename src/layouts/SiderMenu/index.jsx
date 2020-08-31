import React, { Component } from 'react'
import {connect} from 'react-redux'
import {  Menu } from 'antd'
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'
//导入所有字体图标对象
import icons from '@conf/icons'
import {Link,withRouter} from 'react-router-dom'
import {defaultRoutes} from '@conf/routes'
const { SubMenu } = Menu
@withRouter
@connect(state=>({permissionList:state.user.permissionList}))
class SiderMenu extends Component {
  //根据数据动态渲染menu
  RenderMenu = (routes) =>{
    return routes.map(route=>{
      if(route.hidden) return
      const Icon = icons[route.icon]
      if(route.children && route.children.length){
        // console.log(route.path,Icon)
        return <SubMenu key={route.path} icon={<Icon />} title={route.name}>
          {route.children.map(secItem=>{
            if(secItem.hidden) return null
            return (
              <Menu.Item key={route.path + secItem.path}>
                <Link to={route.path + secItem.path}>{secItem.name}</Link>
              </Menu.Item>
            )
          })}
        </SubMenu>
      }else{
        return (
        <Menu.Item key={route.path} icon={<Icon />}>
          {route.path === '/' ? <Link to ='/'>{route.name}</Link> : route.name}
        </Menu.Item>
        )
      }
    })
  }
  render() {
    // console.log(this.props.permissionList)
    const pathname = this.props.location.pathname
    const matchArr = pathname.match(/[/][\w]*/)
    const openKey = matchArr && matchArr[0]
    return (
      <div>
           <Menu theme='dark' defaultSelectedKeys={[pathname]} mode='inline'
           defaultOpenKeys={[openKey]}>
             {this.RenderMenu(defaultRoutes)}
             {this.RenderMenu(this.props.permissionList)}
            {/* <Menu.Item key='1' icon={<PieChartOutlined />}>
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
            <Menu.Item key='9' icon={<FileOutlined />} /> */}
          </Menu>
      </div>
    )
  }
}
export default SiderMenu
