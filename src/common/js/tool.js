//多维数组扁平化
export function thinArr(arr) {
  return arr.reduce((a,b)=> {
    return a.concat(Array.isArray(b) ? thinArr(b) : b)
  },[])
  return arr;
}

export function  fn(m,n) {
  let str = ''
  console.log(str.padStart(m, n))
}

/**
 * [function 清空对象的数据] [for in遍历对象，每项设置为空]
 * @param [{obejct}] target [需要清空的对象]
 * @return [{object}] target [已清空的对象]
 * */
export function emptyObject(target) {
  if(target.constructor = Object){
    for( let item in target) {
      switch (item.constructor) {
        case 'Object':
          target[item] = null;
          break;
        case 'Array':
          target[item] = [];
          break;
        case 'String':
          target[item] = '';
          break;
        default :
          target[item] = '';
      }
    }
  }else {
    new Error('no is object')
  }
  return target
}
