//多维数组扁平化
export function thinArr(arr, result) {
  result = result ? result : [];
  for(var i = 0,len = arr.length; i < len; i++) {
    if(arr[i].constructor !== Array) {
      result.push(arr[i])
    }else{
      thinArr(arr[i], result);
    }
  }
  if(i == len) {
    return result;
  }
}

export function  fn(m,n) {
  let str = ''
  console.log(str.padStart(m, n))
}

export function emptyObject(target) {
  if(target.constructor = Object){
    for( let item in target) {
      target[item] = null
    }
  }else {
    new Error('no is object')
  }
  return target
}
