import {vue} from '../main'
import {url_companyList} from './config'



export function getCompanyListData() {
  return vue.$http.get(url_companyList).then((result) => {
    return Promise.resolve(result.data)
  }).catch((e) => {
    return Promise.reject(e)
  })
}
