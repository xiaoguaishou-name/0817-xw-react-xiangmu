import request from "@utils/request";

const BASE_URL = "/admin/edu/lesson";

// 获取所有课程列表数据
export function reqGetLessonList(chapterId) {
  return request({
    url: `${BASE_URL}/get/${chapterId}`,
    method: "GET",
  });
} 