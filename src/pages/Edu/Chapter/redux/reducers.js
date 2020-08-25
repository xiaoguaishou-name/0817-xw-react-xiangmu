import {
  GET_COURSE_LIST,
  GET_CHAPTER_LIST,
  GET_LESSON_LIST,
  DEL_CHAPTER_LIST,
  DEL_LESSON_LIST,
} from "./constants";
const initChapter = {
  allCourseList: [], //存储所有课程列表
  chapterList: [],
};
export default function chapterList(prevState = initChapter, action) {
  switch (action.type) {
    case GET_COURSE_LIST:
      return {
        ...prevState,
        allCourseList: action.data,
      };
    case GET_CHAPTER_LIST:
      action.data.items.forEach((item) => {
        item.children = [];
      });
      return {
        ...prevState,
        chapterList: action.data.items,
      };
    case GET_LESSON_LIST:
      const newChapterList = [...prevState.chapterList];
      newChapterList.forEach((item) => {
        if (item._id === action.data.chapterId) {
          item.children = action.data.res;
        }
      });
      return {
        ...prevState,
        chapterList: newChapterList,
      };
    case DEL_CHAPTER_LIST:
      const chapterList = [...prevState.chapterList];
      const delChapterIds = action.data;
      const newChapterList2 = chapterList.filter((item) => {
        if (delChapterIds.indexOf(item._id) > -1) {
          return false;
        }
        return true;
      });
      return {
        ...prevState,
        chapterList: newChapterList2,
      };
    case DEL_LESSON_LIST:
      const chapterList2 = [...prevState.chapterList];
      const delLessonIds = action.data;
      chapterList2.forEach((item) => {
        item.children = item.children.filter((lessonItem) => {
          if (delLessonIds.indexOf(lessonItem._id) > -1) {
            return false;
          }
          return true;
        });
      });
      return {
        ...prevState,
        chapterList: chapterList2,
      };
    default:
      return prevState;
  }
}
