import React, { Component,Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import {Spin} from 'antd'
import { constantRoutes } from "@conf/routes";

class PublicLayout extends Component {
  renderRoute = (routes) => {
    return routes.map((route) => {
      return (
        <Route
          key={route.path}
          path={route.path}
          component={route.component}
          exact={true}
        />
      );
    });
  };

  render() {
    return <Suspense fallback={<Spin tip="Loading..."></Spin>}><Switch>{this.renderRoute(constantRoutes)}</Switch></Suspense>;
  }
}

export default PublicLayout;
