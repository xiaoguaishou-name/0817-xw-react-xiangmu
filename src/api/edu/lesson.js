import request from "@utils/request";

const BASE_URL = "/admin/edu/lesson";

// 获取所有课程列表数据
export function reqGetLessonList(chapterId) {
  return request({
    url: `${BASE_URL}/get/${chapterId}`,
    method: "GET",
  });
} 

//获取token
export function reqUploadToken() {
  return request({
    url: '/uploadtoken',
    method: "GET",
  });
} 

//新增课时
export function addLesson({chapterId,title,free,video}) {
  return request({
    url: `${BASE_URL}/save`,
    method: "POST",
    data:{
      chapterId,
      title,
      free,
      video
    }
  });
} 