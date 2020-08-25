import {GET_ALL_COURSE} from './constants'
import {reqGetAllCourse} from '@api/edu/course'

//获取所有课程列表数据
function getAllCourseListSync(data){
  return{
    type:GET_ALL_COURSE,
    data
  }
}
export function getAllCourseList(){
  return(dispatch)=>{
    return reqGetAllCourse().then((res)=>{
      dispatch(getAllCourseListSync(res))
    })
  }
}