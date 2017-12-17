const crypto = require('crypto');

module.exports = {
  compare: function (str1, str2) {
    return str1.localeCompare(str2) == 0;
  },
  MD5_SUFFIX: "FSDW#SFSFQE4549)^&^45阿达啊失.去qdfd人dd品牌受pimrt到。阿萨",
  md5: function (str) {
    var obj = crypto.createHash('md5');
    obj.update(str + this.MD5_SUFFIX);
    return obj.digest('hex');
  },
  uuid: function () {
    var mydate = new Date();
    var uuid = mydate.getTime()+""+Math.round(Math.random() * 10000)
    return parseInt(uuid);
  }
}
