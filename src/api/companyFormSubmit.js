import {vue} from '../main'
import {url_companyFormSubmit} from './config'

/**
 * [function 发送公司表单数据]
 * */
export function companyFormSubmit(params) {


  return vue.$http.post(url_companyFormSubmit, {params:params}).then((res) => {
    return Promise.resolve(res.data)
  }).catch((e) => {
    return Promise.reject(e)
  })
}
