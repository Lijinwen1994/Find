import {vue} from '../main'
import {url_jobhunterData} from './config'

export function getJobhunterData() {
  return vue.$http.get(url_jobhunterData).then((res) => {
    return Promise.resolve(res.data)
  }).catch((e) => {
    return Promise.reject(e)
  })

}
