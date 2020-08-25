import React from "react";
import { Router } from "react-router-dom";
import history from "@utils/history";
import {connect} from 'react-redux'
import Layout from "./layouts";
//引入国际化组件
import { IntlProvider } from "react-intl";
//导入语言包
import { zh, en } from "./locales";
//实现antd分页国际化
//1.引入 ConfigProvider 组件
import { ConfigProvider } from "antd";
// 2. 引入antd中提供的语言包
import enUS from "antd/es/locale/en_US";
import zhCN from "antd/es/locale/zh_CN";
// 引入重置样式（antd已经重置了一部分了）
import "./assets/css/reset.css";

function App(props) {
  const locale = props.intl
  const messages = locale === 'en' ? en : zh
  // antd中的数据,使用antd的国际化语言包
  const antdlocale = locale === "en" ? enUS : zhCN;
  return (
    <Router history={history}>
      <ConfigProvider locale={antdlocale}>
        <IntlProvider locale={locale} messages={messages}>
          <Layout />
        </IntlProvider>
      </ConfigProvider>
    </Router>
  );
}

export default connect(state=>({intl:state.intl}))(App);
