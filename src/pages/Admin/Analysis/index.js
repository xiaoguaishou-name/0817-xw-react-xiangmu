import React, { Component } from "react";
//使用antd的栅格布局
import { Row, Col, Statistic, Progress } from "antd";
import Card from "@comps/Card";
import {
  QuestionCircleOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import { AreaChart, ColumnChart } from "bizcharts";
// import './index.less'
const firstRowCol = {
  xs: { span: 24 },
  md: { span: 12 },
  lg: { span: 6 },
};
// 面积图数据源
const data = [
  { year: "1991", value: 3 },
  { year: "1992", value: 5 },
  { year: "1993", value: 7 },
  { year: "1994", value: 9 },
  { year: "1995", value: 4.9 },
  { year: "1996", value: 6 },
  { year: "1997", value: 17 },
  { year: "1998", value: 9 },
  { year: "1999", value: 3 },
];
//柱状图数据源
// 数据源
const data2 = [
  {
    type: "家具家电",
    sales: 23,
  },
  {
    type: "粮油副食",
    sales: 42,
  },
  {
    type: "生鲜水果",
    sales: 33,
  },
  {
    type: "美容洗护",
    sales: 56,
  },
  {
    type: "母婴用品",
    sales: 84,
  },
  {
    type: "进口食品",
    sales: 19,
  },
  {
    type: "食品饮料",
    sales: 34,
  },
  {
    type: "家庭清洁",
    sales: 21,
  },
];
export default class Analysis extends Component {
  render() {
    return (
      <div>
        {/* gutter的值是数组时，第一个水平间隔，第二个垂直间隔 */}
        <Row gutter={[16, 16]}>
          <Col {...firstRowCol}>
            <Card
              title={<Statistic prefix="￥" title="总销售额" value={112893} />}
              // extra={<QuestionCircleOutlined />}
              footer={<span>日销售额 ￥12,423</span>}
            >
              <span>
                周同比 12%
                <CaretUpOutlined
                  style={{ color: "red", marginRight: 15, marginLeft: 5 }}
                />
              </span>
              <span>
                日同比 10%
                <CaretDownOutlined style={{ color: "green", marginLeft: 5 }} />
              </span>
            </Card>
          </Col>
          <Col {...firstRowCol}>
            <Card
              title={<Statistic title="访问量" value={22222} />}
              // extra={<QuestionCircleOutlined />}
              footer={<span>日销售额 ￥12,423</span>}
            >
              <AreaChart
                data={data}
                // title={{
                //   visible: true,
                //   text: "面积图",
                // }}
                xField="year"
                yField="value"
                padding="0"
                xAxis={{ visible: false }}
                yAxis={{ visible: false }}
                smooth={true}
                color={["pink"]}
              />
            </Card>
          </Col>
          <Col {...firstRowCol}>
            <Card
              title={<Statistic title="支付笔数" value={33333} />}
              // extra={<QuestionCircleOutlined />}
              footer={<span>转化率60%</span>}
            >
              <ColumnChart
                data={data2}
                // title={{
                //   visible: true,
                //   text: "基础柱状图",
                // }}
                forceFit
                padding="0"
                xField="type"
                yField="sales"
                xAxis={{ visible: false }}
                yAxis={{ visible: false }}
                smooth={true}
                meta={{
                  type: {
                    alias: "类别",
                  },
                  sales: {
                    alias: "销售额(万)",
                  },
                }}
              />
            </Card>
          </Col>
          <Col {...firstRowCol}>
            <Card
              title={<Statistic title="运营结果" value={44444} />}
              // extra={<QuestionCircleOutlined />}
              footer={
                <div>
                  <span>
                    周同比 12%
                    <CaretUpOutlined
                      style={{ color: "red", marginRight: 15, marginLeft: 5 }}
                    />
                  </span>
                  <span>
                    日同比 10%
                    <CaretDownOutlined
                      style={{ color: "green", marginLeft: 5 }}
                    />
                  </span>
                </div>
              }
            >
              <Progress
                strokeColor={{
                  from: "#108ee9",
                  to: "#87d068",
                }}
                percent={89.2}
                status="active"
              />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}