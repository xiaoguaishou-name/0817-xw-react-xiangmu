import {getMenu,getInfo} from '@api/acl/login'
import {GET_USER_INFO,GET_USER_MENU} from './constants'
//获取用户信息
function getUserInfoSync(data){
  return{
    type:GET_USER_INFO,
    data
  }
}

export function getUserInfo(){
  return(dispatch)=>{
    return getInfo().then(res=>{
      dispatch(getUserInfoSync(res))
    })
  }
}


//获取用户menu信息
function getUserMenuSync(data){
  return{
    type:GET_USER_MENU,
    data
  }
}

export function getUserMenu(){
  return(dispatch)=>{
    return getMenu().then(res=>{
      dispatch(getUserMenuSync(res))
    })
  }
}