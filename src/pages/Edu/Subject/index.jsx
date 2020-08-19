import React, { Component } from "react";
import { Button, message, Modal } from "antd";
import { PlusOutlined, FormOutlined, DeleteOutlined } from "@ant-design/icons";
import { Table, Tooltip, Input } from "antd";
import { connect } from "react-redux";
import {
  getSubjectList,
  updateSubjectList,
  getSecSubjectList,
  delSubjectList,
} from "./redux";
import { reqUpdateSubject } from "@api/edu/subject";
import './index.less'
const data = [
  {
    key: 1,
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    description:
      "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
  },
  {
    key: 2,
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    description:
      "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
  },
  {
    key: 3,
    name: "Not Expandable",
    age: 29,
    address: "Jiangsu No. 1 Lake Park",
    description: "This not expandable",
  },
  {
    key: 4,
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    description:
      "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
  },
];

@connect((state) => ({ subjectList: state.subjectList }), {
  getSubjectList,
  updateSubjectList,
  getSecSubjectList,
  delSubjectList
})
class Subject extends Component {
  page = 1;
  state = {
    subjectid: "",
    title: "",
  };
  componentDidMount() {
    this.props.getSubjectList(1, 5);
  }
  //点击跳转到新增课程分类组件
  handleAdd = () => {
    this.props.history.push("/edu/subject/add");
  };
  //更新按钮的触发事件
  handleUpdate = ({ _id, title }) => () => {
    this.setState({
      subjectid: _id,
      title: title,
    });
    //记录旧的标题名称
    this.title = title;
  };
  //更改课程分类标题受控组件的事件处理回调
  handleUpdateChange = (e) => {
    this.setState({
      title: e.target.value,
    });
  };
  //点击确定提交按钮
  handleConfirm = async () => {
    if (!this.state.title.trim()) {
      message.warn("课程名称不能为空");
      return;
    }
    if (this.state.title === this.title) {
      return;
    }
    let id = this.state.subjectid;
    let title = this.state.title;
    // await reqUpdateSubject(id, title);
    await this.props.updateSubjectList(id, title);
    message.success("课程更新成功");
    this.setState({
      subjectid: "",
      title: "",
    });
    //// 重新请求一级菜单数据;
    // this.props.getSubjectList(1, 5);
  };
  //点击取消
  handleCancle = () => {
    this.setState({
      subjectid: "",
      title: "",
    });
  };
  //页码发生变化时触发的回调函数
  handleChange = (page, pageSize) => {
    this.page = page;
    this.props.getSubjectList(page, pageSize);
  };
  //一页展示的数据条数发生变化时触发的回调函数
  handleShowSizeChange = (page, pageSize) => {
    this.props.getSubjectList(page, pageSize);
  };
  //点击扩展的回调函数
  handleExpand = (expanded, record) => {
    if (expanded) {
      this.props.getSecSubjectList(record._id);
    }
  };
  //删除的回调
  handleDel = (record) => () => {
    Modal.confirm({
      title: (<>你确定要删除<span style={{ color: 'red', margin: '0 10px' }}>{record.title}</span>吗？</>),
      onOk: async () => {
        await this.props.delSubjectList(record._id)
        message.success('删除成功')
        if (record.parentId === '0') {
          if (this.page > 1 && this.props.subjectList.items.length <= 0 && record._id === '0') {
            this.props.getSubjectList(--this.page, 5)
            return
          }
          this.props.getSubjectList(this.page,5)
        }
      }
    })
  };
  render() {
    const columns = [
      {
        title: "分类名称",
        // dataIndex: "title",
        key: "name",
        render: (record) => {
          if (this.state.subjectid === record._id) {
            return (
              <Input
                style={{ width: 200 }}
                value={this.state.title}
                onChange={this.handleUpdateChange}
              ></Input>
            );
          }
          return record.title;
        },
      },
      {
        title: "操作",
        key: "x",
        render: (record) => {
          if (this.state.subjectid === record._id) {
            return (
              <>
                <Button
                  type="primary"
                  style={{ marginRight: 10 }}
                  onClick={this.handleConfirm}
                >
                  确定
                </Button>
                <Button type="danger" onClick={this.handleCancle}>
                  取消
                </Button>
              </>
            );
          } else {
            return (
              <>
                <Tooltip
                  placement="topLeft"
                  title="更新课程"
                  arrowPointAtCenter
                >
                  <Button
                    icon={<FormOutlined />}
                    style={{ marginRight: 20 }}
                    type="primary"
                    size="large"
                    onClick={this.handleUpdate(record)}
                  ></Button>
                </Tooltip>
                <Tooltip
                  placement="topLeft"
                  title="删除课程"
                  arrowPointAtCenter
                >
                  <Button
                    icon={<DeleteOutlined />}
                    type="danger"
                    size="large"
                    style={{ width: 40 }}
                    onClick={this.handleDel(record)}
                  ></Button>
                </Tooltip>
              </>
            );
          }
        },
        width: 200,
      },
    ];
    return (
      <div className="subject">
        <Button
          type="primary"
          className="subject-btn"
          icon={<PlusOutlined />}
          onClick={this.handleAdd}
        >
          新建
        </Button>
        <Table
          columns={columns}
          expandable={{
            // expandedRowRender: (record) => (
            //   <p style={{ margin: 0 }}>{record.description}</p>
            // ),
            // rowExpandable: (record) => record.name !== "Not Expandable",
            onExpand: this.handleExpand,
          }}
          dataSource={this.props.subjectList.items}
          rowKey="_id"
          pagination={{
            total: this.props.subjectList.total,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "15"],
            showQuickJumper: true,
            defaultPageSize: 5,
            onChange: this.handleChange,
            onShowSizeChange: this.handleShowSizeChange,
          }}
        />
      </div>
    );
  }
}
export default Subject;
