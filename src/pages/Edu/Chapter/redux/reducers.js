import {GET_COURSE_LIST,GET_CHAPTER_LIST,GET_LESSON_LIST} from './constants'
const initChapter = {
    allCourseList:[] ,  //存储所有课程列表
    chapterList:[]
}
export default function chapterList(prevState=initChapter,action){
    switch(action.type){
        case GET_COURSE_LIST:
            return{
                ...prevState,
                allCourseList:action.data
            }
        case GET_CHAPTER_LIST:
            action.data.items.forEach(item=>{
                item.children = []
            })
            return{
                ...prevState,
                chapterList:action.data.items
            }
        case GET_LESSON_LIST:
            const newChapterList = [...prevState.chapterList]
            newChapterList.forEach(item=>{
                if(item._id === action.data.chapterId){
                    item.children = action.data.res
                }
            })
            return{
                ...prevState,

            }
        default:
            return prevState    
    }
}