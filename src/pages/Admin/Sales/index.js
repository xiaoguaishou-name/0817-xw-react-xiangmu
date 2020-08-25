import React, { Component } from "react";
import { Card, Button, DatePicker } from "antd";
import moment from 'moment'
const tabListNoTitle = [
  {
    key: "article",
    tab: "销售量",
  },
  {
    key: "app",
    tab: "访问量",
  },
];
const contentListNoTitle = {
  article: <p>销售量.....</p>,
  app: <p>访问量.....</p>,
};

const { RangePicker } = DatePicker;
export default class index extends Component {
  state = {
    noTitleKey: "sales",
    dateFlag: 'day', //右侧按钮的状态值
    rangTime: [moment(), moment()],
  };
  // 页签切换的回调函数
  onTabChange = (key) => {
    console.log(key);
    this.setState({ noTitleKey: key });
  };
  // 点击按钮的时候,修改状态的值
  handleClick = (dateFlag) => () => {
    let rangTime = [];
    switch (dateFlag) {
      case 'day':
        rangTime = [moment(), moment()];
        break;
      case 'week':
        rangTime = [(moment(), moment().add(7, "d"))];
        break;
      case 'month':
        rangTime = [(moment(), moment().add(1, "M"))];
        break;
      case 'year':
        rangTime = [(moment(), moment().add(1, "y"))];
        break;
    }
    this.setState({
      dateFlag,
      rangTime,
    });
  };
  // 在事件处理函数中修改rangTime的值
  RangePickerChange = (dates) => {
    // dates -> [moment,moment] 选中的日期的moment对象数组
    // dateStrings -> ['日期字符串','日期字符串']
    this.setState({
      rangTime: dates,
    });
  };
  render() {
    //右侧按钮和日期
    const Extra = (
      <>
        <Button
          type={this.state.dateFlag === "day" ? "link" : "text"}
          onClick={this.handleClick("day")}
        >
          
          今日
        </Button>
        <Button
          type={this.state.dateFlag === "week" ? "link" : "text"}
          onClick={this.handleClick("week")}
        >
          本周
        </Button>
        <Button
          type={this.state.dateFlag === "month" ? "link" : "text"}
          onClick={this.handleClick("month")}
        >
          本月
        </Button>
        <Button
          type={this.state.dateFlag === "year" ? "link" : "text"}
          onClick={this.handleClick("year")}
        >
          
          本年
        </Button>
        <RangePicker
          value={this.state.rangTime}
          onChange={this.RangePickerChange}
        />
      </>
    );
    const { dateFlag } = this.state;
    return (
      <div>
        <Card
          style={{ width: "100%" }}
          // 定义标签名称
          tabList={tabListNoTitle}
          // 控制页高亮
          activeTabKey={this.state.noTitleKey}
          //右侧额外部分的展示
          tabBarExtraContent={Extra}
          // 切换页签的回调
          onTabChange={this.onTabChange}
        >
          {contentListNoTitle[this.state.noTitleKey]}
        </Card>
      </div>
    );
  }
}