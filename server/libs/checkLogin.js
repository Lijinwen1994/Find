const libs = require('./common');

module.exports = function (req) {
  if(req.session['avoidLoginKey']) {
    let {loginName, loginPass, type, url} =  req.session['avoidLoginKey'];
    console.log('AOP函数触发');
    console.log('用户名:'+ loginName)
  }
}
