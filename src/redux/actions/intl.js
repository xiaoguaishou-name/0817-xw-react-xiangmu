import {SET_INTL} from '../constants/intl'

//实现国际化的actions
export function setIntl(data){
  return {
    type:SET_INTL,
    data
  }
}