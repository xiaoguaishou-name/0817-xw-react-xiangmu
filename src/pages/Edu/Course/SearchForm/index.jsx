import React, { useState ,useEffect} from "react";
import { Form, Input, Select, Cascader, Button } from "antd";
import {reqAllSubjectList,reqGetSecSubject} from '@api/edu/subject'
import {reqGetAllTeacherList} from '@api/edu/teacher'
import {getAllCourseList} from '../redux/actions'
import {connect} from 'react-redux'
//国际化的组件和hooks
import { FormattedMessage, useIntl } from 'react-intl'
import "./index.less";

const { Option } = Select;

function SearchForm(props) {
  const [form] = Form.useForm();
  //获得一个国际化对象
  const intl = useIntl()
  const [subjects,setSubjects] = useState([])
  const [teachers,setTeachers] = useState([])
  const [options,setOptions] = useState([])
  //模拟挂载的生命周期函数钩子
  useEffect(()=>{
    async function fetchData(){
      const [subject,teacher] = await Promise.all([reqAllSubjectList(),reqGetAllTeacherList()])
      setSubjects(subject)
      setTeachers(teacher)
      // 注意这里之所以用subject而不用subjects，是因为这是个函数组件，没有this，拿不到subjects，这里如果写subjects，拿到的是undefined
      const optionList = subject.map(item=>{
        return{
          value:item._id,
          label:item.title,
          isLeaf:false  //有没有子节点，false代表有
        }
      })
      setOptions(optionList)
    }
    fetchData()
  },[])

  // const [options, setOptions] = useState([
  //   {
  //     value: "zhejiang",
  //     label: "Zhejiang",
  //     isLeaf: false
  //   },
  //   {
  //     value: "jiangsu",
  //     label: "Jiangsu",
  //     isLeaf: false
  //   }
  // ]);
  
  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };

  const loadData = async selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    //发送异步请求获取数据
    const res = await reqGetSecSubject(targetOption.value)
    targetOption.loading = false   //请求完后隐藏加载效
    if(res.items.length){
      targetOption.children = res.items.map(item=>{
        return{
          value:item._id,
          label:item.title,
        }
      })
    }else{
      targetOption.isLeaf = true
    }
    setOptions([...options])
  };

  const resetForm = () => {
    form.resetFields();
  };
  const onFinish = (options) =>{
    console.log(options)
    props.getAllCourseList()
  }
  return (
    <Form layout="inline" form={form} onFinish={onFinish}>
      <Form.Item name="title" label={<FormattedMessage id="title"></FormattedMessage>}>
        <Input placeholder={intl.formatMessage({
          id:'title'
        }) } style={{ width: 250, marginRight: 20 }} />
      </Form.Item>
      <Form.Item name="teacherId" label={<FormattedMessage id="teacher"></FormattedMessage>}>
        <Select
          allowClear
          placeholder={intl.formatMessage({
            id:'teacher'
          })}
          style={{ width: 250, marginRight: 20 }}
        >
          {/* <Option value="lucy1">Lucy1</Option>
          <Option value="lucy2">Lucy2</Option>
          <Option value="lucy3">Lucy3</Option> */}
          {teachers.map(item=>{
            return (<Option value={item._id} key={item._id}>{item.name}</Option>)
          })}
        </Select>
      </Form.Item>
      <Form.Item name="subject" label={<FormattedMessage id="subject"></FormattedMessage>}>
        <Cascader
          style={{ width: 250, marginRight: 20 }}
          options={options}
          loadData={loadData}
          onChange={onChange}
          changeOnSelect
          placeholder={intl.formatMessage({
            id:'subject'
          })}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ margin: "0 10px 0 30px" }}
        >
          <FormattedMessage id="searchBtn"></FormattedMessage>
        </Button>
        <Button onClick={resetForm}><FormattedMessage id="resetBtn"></FormattedMessage></Button>
      </Form.Item>
    </Form>
  );
}
//因为我们在searchform并不使用数据，所以可以写null
export default connect(null,{getAllCourseList})(SearchForm);
