import {vue} from '../main'
import {url_companyFormSubmit} from './config'

export function companyFormSubmit(payload) {
  return vue.$http.post(url_companyFormSubmit, payload).then((res) => {
    return Promise.resolve(res.data)
  }).catch((e) => {
    return Promise.reject(e)
  })
}
