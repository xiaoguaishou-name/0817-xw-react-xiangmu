import React, { Component } from "react";
import {
  Card,
  Form,
  Input,
  Select,
  Switch,
  Button,
  message,
} from "antd";
import { ArrowLeftOutlined} from "@ant-design/icons";
import { Link } from "react-router-dom";
import MyUpload from '@comps/Upload'
import {addLesson} from '@api/edu/lesson'
//表单布局属性
const layout = {
  // antd把一个宽度分为24份
  // 表单文字描述部分
  labelCol: {
    span: 2,
  },
  // 表单项部分
  wrapperCol: {
    span: 6,
  },
};
// 获取Option组件
const Option = Select.Option;

export default class AddLesson extends Component {
  onFinish = async(value) =>{
    const {title,free,video} = value
    console.log(this.props.location)
    const chapterId = this.props.location.state._id
    const data = {
      chapterId,
      title,
      free,
      video
    }
    await addLesson(data)
    message.success('添加课时成功')
    this.props.history.push('/edu/chapter/list')
  }
  render() {
    return (
      <Card
        title={
          <>
            <Link to="/edu/chapter/list">
              <ArrowLeftOutlined> </ArrowLeftOutlined>
            </Link>
            <span style={{ marginLeft: 10 }}>新增课程</span>
          </>
        }
      >
        <Form
          {...layout}
          name="chapter"
          onFinish={this.onFinish}
          // onFinishFailed={onFinishFailed}
          //给表单里的表单项添加默认值
          initialValues = {{free:false}}
        >
          <Form.Item
            label="课时名称"
            name="title"
            rules={[
              {
                required: true,
                message: "请输入课时名称!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            valuePropName='checked'
            label="是否免费"
            name="free"
            rules={[
              {
                required: true,
                message: "请选择是否免费!",
              },
            ]}
          >
            <Switch
              checkedChildren="开启"
              unCheckedChildren="关闭"
              defaultChecked
            />
          </Form.Item>
          <Form.Item
            label="上传视频"
            name="video"
            rules={[
              {
                required: true,
                message: "请上传视频!",
              },
            ]}
          >
            <MyUpload></MyUpload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              添加
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}
