import {reqGetAllCourse} from '@api/edu/course'
import {reqGetChapterList,reqRemoveChapterList} from '@api/edu/chapter'
import {reqGetLessonList,reqRemoveLessonList} from '@api/edu/lesson'
import {GET_COURSE_LIST,GET_CHAPTER_LIST,GET_LESSON_LIST,DEL_CHAPTER_LIST,DEL_LESSON_LIST} from './constants'
//获取所有课程列表数据
function getCourseListSync(data){
    return{
        type:GET_COURSE_LIST,
        data
    }
}
export function getCourseList(){
    return dispatch =>{
        reqGetAllCourse().then((res)=>{
            dispatch(getCourseListSync(res))
        })
    }
}

//获取章节分页数据
function getChapterListSync(data){
    return{
        type:GET_CHAPTER_LIST,
        data
    }
}
export function getChapterList(courseId){
    return dispatch =>{
        reqGetChapterList(courseId).then((res)=>{
            dispatch(getChapterListSync(res))
        })
    }
}

//获取课时数据
function getLessonListSync(data){
    return{
        type:GET_LESSON_LIST,
        data
    }
}
export function getLessonList(chapterId){
    return dispatch =>{
        reqGetLessonList(chapterId).then((res)=>{
            dispatch(getLessonListSync({res,chapterId}))
        })
    }
}

//批量删除多个章节
function delChapterListSync(data) {
    return {
      type: DEL_CHAPTER_LIST,
      data
    }
  }
  export function delChapterList(chapterIdList) {
    return dispatch => {
      reqRemoveChapterList(chapterIdList).then((res) => {
        dispatch(delChapterListSync(chapterIdList))
      })
    }
  }
  
  //批量删除多个课时
  function delLessonListSync(data) {
    return {
      type: DEL_LESSON_LIST,
      data
    }
  }
  export function delLessonList(lessonIdList) {
    return dispatch => {
      reqRemoveLessonList(lessonIdList).then((res) => {
        dispatch(delLessonListSync(lessonIdList))
      })
    }
  }