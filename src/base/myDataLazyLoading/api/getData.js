import {vue} from '../../../main';

export function getData(url, params) {
  return vue.$http.get(url, {
    params
  })
    .then(function (res) {
        return Promise.resolve(res)
  })
    .catch(function (err) {
    return Promise.reject(err)
  })
}
