import originJSONP from 'jsonp'

export default function jsonp(url, data, option) {
  //拼接url, 如果url没有“？” 号， 就添加“？”号。否则添加 &
  url +=(url.indexOf("?") < 0 ? "?" : "&") + param(data);

  return new Promise((resolve, reject) => {
    originJSONP(url, option, (err, data) =>{
      if(!err) {
        resolve(data)
      }else{
        reject(err)
      }
    })
  })
}

//遍历传入的data，并将其拼接到url中
function param(data) {
  let url = ''
  for(var k in data) {
    let value = data[k] !==undefined ? data[k] : ''
    url += `&${k}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : ''
}
