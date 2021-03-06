import {
  reqGetSubject,
  reqUpdateSubject,
  reqGetSecSubject,
  reqDelSubject
} from '@api/edu/subject'
import {
  GET_SUBJECT_LIST,
  UPDATE_SUBJECT_LIST,
  GET_SEC_SUBJECT_LIST,
  DEL_SUBJECT_LIST 
} from './constants'
//获取一级课程分类
const getSubjectListSync = list => ({
  type: GET_SUBJECT_LIST,
  data:list
})
export const getSubjectList = (page, limit) => {
  return (dispatch) => {
    return reqGetSubject(page, limit).then((response) => {
      dispatch(getSubjectListSync(response))
      return response.total
    })
  }
}
//获取二级分类课程分类
const getSecSubjectListSync = (list) => ({
  type: GET_SEC_SUBJECT_LIST,
  data:list
})
export const getSecSubjectList = (parentId) => {
  return (dispatch) => {
    return reqGetSecSubject(parentId).then((response) => {
      dispatch(getSecSubjectListSync(response))
      return response.total
  })
  }
}




//更新课程分类数据
const updateSubjectListSync = (data) => ({
  type: UPDATE_SUBJECT_LIST,
  data
})
export const updateSubjectList = (id, title) => {
  return (dispatch)=>{
    return reqUpdateSubject(id, title).then((response) => {
      dispatch(updateSubjectListSync({ id, title }))
      return response.total
    })
  }
}

//删除课程分类数据
const delSubjectListSync = (data) => ({
  type: DEL_SUBJECT_LIST,
  data
})
export const delSubjectList = (id) => {
  return (dispatch) => {
    return reqDelSubject(id).then((response) => {
      dispatch(delSubjectListSync(
        id
      ))
      return response.total
    })
  }
}