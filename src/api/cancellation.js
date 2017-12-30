//退出登录
import {vue} from '../main'
import {url_cancellation} from './config'

/**
 * [function 注销账号]
 * [desc 只需要携带cookie发过去，在服务器删除对应的session即可]
 * @param {type} data [loginName, type]
 * @return {promise} Promise [description]
 **/
export function cancellation(){
  return vue.$http({
    method:'POST',
    url:url_cancellation,
    //允许跨域cookie
    withCredentials: true
  }).then((res) => {
    return Promise.resolve(res.data);
  }).catch((e) => {
    return Promise.reject(e)
  })
}
