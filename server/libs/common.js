const crypto = require('crypto');

module.exports = {
  compare: function (str1, str2) {
    return str1.localeCompare(str2) == 0;
  },
  /**
   * [string MD5随机秘钥，内容禁止修改]
   * */
  MD5_SUFFIX: "FSDW#SFSFQE4549)^&^45阿达啊失.去qdfd人dd品牌受pimrt到。阿萨",

  /**
   * [function md5加密程序]
   * @param [string] str [对字符串进行MD5加密]
   * @return [string] [返回的加密后的字符串]
   * */
  md5: function (str) {
    var obj = crypto.createHash('md5');
    obj.update(str + this.MD5_SUFFIX);
    return obj.digest('hex');
  },

  /**
   * [function 时间戳生成随机的UUID字符串]
   * @return [string] [生成是随机字符串]
   * */
  uuid: function () {
    var mydate = new Date();
    var uuid = mydate.getTime()+""+Math.round(Math.random() * 10000)
    return parseInt(uuid);
  },

  /**
   * [function 生成时间字符串]
   * @return [string] [时间字符串]
   * */

  getTimeString: function () {
    let now = new Date();
    return `${now.getFullYear()}-${this._padding(now.getMonth() + 1)}-${this._padding(now.getDate())} ${this._padding(now.getHours())}:${this._padding(now.getMinutes())}`;
  },

  /**
   * [function 数字补零] [0-9的数字前面补0]
   *
   * @param [string] numStr [需要判断并补零的字符串]
   * @return [string] [补零后的数字字符串]
   * */
  _padding: function (numStr) {
    return numStr < 10 ? `0${numStr}`: numStr;
  },

  before: function (fn, beforefn) {
    return function () {
      console.log(this)
      beforefn.apply(this, arguments);
      return fn.apply(this, arguments);
    }
  }
}

