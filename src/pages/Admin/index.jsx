import React, { Component } from "react";
import Analysis from './Analysis/index'
import Sales from './Sales/index'
import Static from './Static/index'
import Search from './Search/index'
export default class Admin extends Component {
  render() {
    return (
      <div>
        <Analysis></Analysis>
        <Sales></Sales>
        <Static></Static>
        <Search></Search>
      </div>
    );
  }
}
