import {vue} from '../main'
import {url_reusmeSubmit} from './config'

export function resumeSubmit(payload) {
  return vue.$http.post(url_reusmeSubmit,{params: payload}).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((e) => {
    return Promise.reject(e)
  })
}
