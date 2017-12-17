import {vue} from '../main'
import {url_login} from './config'


// export function login(data) {
//   let {loginName, loginPass, type} = data;
//   return vue.$http.post(url_login, {
//     loginName,
//     loginPass,
//     type
//   },
//
//   ).then((res) => {
//     return Promise.resolve(res.data);
//   }).catch((e) => {
//     return Promise.reject(e)
//   })
// }

export function login(data) {
  if(data){
    var  {loginName, loginPass, type, saveFlag} = data;
  }else{
    var [loginName, loginPass, type,saveFlag] = [null,null,null,null];
  }

  return vue.$http({
    method:'POST',
    url:url_login,
    data: {
      loginName,
      loginPass,
      type,
      saveFlag
    },
    //允许跨域cookie
    withCredentials: true
  }).then((res) => {
    return Promise.resolve(res.data);
  }).catch((e) => {
    return Promise.reject(e)
  })
}

