import React, { Component } from "react";
import {
  Button,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import * as qiniu from 'qiniu-js'
import {nanoid} from 'nanoid'
import {reqUploadToken} from '@api/edu/lesson'
export default class MyUpload extends Component {
  constructor(){
    super()
    this.state = {
      isUpload:true
    }
    const jsonStr = localStorage.getItem('uploadToken')
    if(jsonStr){
      this.tokenObj = JSON.parse(jsonStr)
      return
    }
    this.tokenObj = {}
  }
  beforeUpload = (file,fileList) =>{
    // console.log(file)
    //最大视频不能超过20M
    const MAX_SIZE = 20*1024*1024
    return new Promise(async(res,rej)=>{
      if(file.size > MAX_SIZE){
        rej()
      }
      if(this.tokenObj.expires && this.tokenObj.expires > Date.now()){
        res()
        return
      }
      const result = await reqUploadToken()
      console.log(result)
      result.expires = Date.now() + result.expires*1000 - 2*60*1000
      
      this.tokenObj = result
      const jsonStr = JSON.stringify(result)
      localStorage.setItem('uploadToken',jsonStr)
      return res()
    })
  }
  handleCustomRequest = ({file,onProgress,onError,onSuccess}) =>{
    // console.log(111)
    const observer = {
      next(res){
        onProgress({percent:res.total.percent})
      },
      error(err){
        onError(err)
      },
      complete:(res)=>{
        onSuccess(res)
        //在这里调用form.item传过来的onchange事件就可以解决表单验证不通过的bug
        console.log(this.props)
        this.props.onChange('http://qfekzkjt3.hn-bkt.clouddn.com/' + res.key)
        this.setState({
          isUpload:false
        })
      }
    }
    const key = nanoid(10)
    const token = this.tokenObj.uploadToken
    const config = {
      useCdnDomain:true,
      region:qiniu.region.z2
    }
    const putExtra = {
      mimeType:"video/*"
    }
    const observable = qiniu.upload(file,key,token,putExtra,config)
    this.subscription = observable.subscribe(observer)  //上传开始
  }
  componentWillUnmount(){
    //前面的this.subscription是为了解决什么都不做直接返回，控制台报错的bug（作用域问题，如果上面不执行就拿不到）
    this.subscription && this.subscription.unsubscribe()  //上传取消
  }
  onRemove = () =>{
    this.props.onChange('')
    this.setState({
      isUpload:true
    })
  }
  render() {
    return (
      <Upload 
      beforeUpload={this.beforeUpload} 
      customRequest={this.handleCustomRequest}
      onRemove={this.onRemove}
      accept="video/*">
        {this.state.isUpload&&<Button>
          <UploadOutlined /> 上传视频
        </Button>}
      </Upload>
    );
  }
}