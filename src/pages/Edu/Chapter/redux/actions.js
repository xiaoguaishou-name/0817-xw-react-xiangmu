import {reqGetAllCourse} from '@api/edu/course'
import {reqGetChapterList} from '@api/edu/chapter'
import {reqGetLessonList} from '@api/edu/lesson'
import {GET_COURSE_LIST,GET_CHAPTER_LIST,GET_LESSON_LIST} from './constants'
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