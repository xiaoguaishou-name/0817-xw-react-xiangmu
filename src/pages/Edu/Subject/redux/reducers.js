import {
  GET_SUBJECT_LIST,
  UPDATE_SUBJECT_LIST,
  GET_SEC_SUBJECT_LIST,
  DEL_SUBJECT_LIST
} from './constants'
const initSubjectList = {
  total: 0,
  items:[]
}
export default function subjectList(prevState = initSubjectList, action) {
  switch (action.type) {
    case GET_SUBJECT_LIST:
      action.data.items.forEach(item => {
        item.children = []
      })
      return action.data
    case GET_SEC_SUBJECT_LIST:
      const SecItems = action.data.items
      const FisItems = prevState.items
      SecItems.length && FisItems.forEach(item => {
        if (item._id === SecItems[0].parentId) {
          item.children = SecItems
        }
      })
      return {
        ...prevState,
        items:FisItems
      }
    case UPDATE_SUBJECT_LIST:
      prevState.items.forEach(item => {
        if (item._id === action.data.id) {
          item.title = action.data.title
        }
        item.children.forEach(secItem => {
          if (secItem._id === action.data.id) {
            secItem.title = action.data.title
            return
          }
        })
      })
      return {
        ...prevState
      }
    case DEL_SUBJECT_LIST:
      const FirstSubject = [...prevState.items]
      FirstSubject.forEach((item, index) => {
        if (item._id === action.data) {
          FirstSubject.splice(index, 1)
          return
        }
        item.children.forEach((secItem, index) => {
          if (secItem._id === action.data) {
            item.children.splice(index, 1)
            return
          }
        })
      })
      return {
        ...prevState,
        items:FirstSubject
      }
    default:
      return prevState
  }
}