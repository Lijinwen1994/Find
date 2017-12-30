import {vue} from '../main'
import {url_getResumeData} from './config'

export function getResumeData(data) {
  let {uid, type} = data;
  if (type != 1) {
    new Error('用户不是个人类型')
  }
  return vue.$http.get(url_getResumeData,{params:{uid,type}}).then((res) => {

    return Promise.resolve(res.data)
  })
  .catch((err) => {
    return Promise.reject(err)
  })


}
