import {GET_USER_INFO,GET_USER_MENU} from './constants'
const initUser = {
  permissionList:[],//路由权限列表
  name:'',//当前用户名
  avatar:'',//当前用户头像
  permissionValueList:[]//按钮权限列表
}
export default function user(preState=initUser,action){
  switch(action.type){
    case GET_USER_INFO:
      return{
        ...preState,
        ...action.data
      }
    case GET_USER_MENU:
      return {
        ...preState,
        ...action.data
      }
    default:
      return preState
  }
}