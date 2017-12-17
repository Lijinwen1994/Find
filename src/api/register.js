import {vue} from '../main'
import {url_register} from './config'

export function sendRegister(data) {

 return vue.$http.post(url_register ,data).then((res) => {
   return Promise.resolve(res.data)
  }).catch((e) => {
   return Promise.reject(e)

  })
}
