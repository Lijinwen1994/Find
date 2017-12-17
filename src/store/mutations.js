import *as types from './mutations-types'

const matutations = {
  //用户登录信息
  [types.SET_LOGIN_USER_INFO](state, data) {
    state.loginUserInfo = data;
  },
  [types.SET_RESUME_DATA](state, data) {
    state.resumeData = data;
  },
  [types.SET_COMPANY_DATA](state, data) {
    state.SET_COMPANY_DATA = data;
  },

  //首页切换标志位
  [types.SET_INDEX_MODULE](state, flag) {
    state.indexModule = flag;
  },
  //设置展示页公司数据
  [types.SET_SHOW_COMPANY_DATA](state, data) {
    state.showCompanyData = data
  },
  [types.SET_RESUME_SIGN](state, flag) {
    state.loginUserInfo.resumeSign = flag;
  },
  //修改问题列表当前点击的index， 便于点击评论时隐藏其他评论列表
  [types.SET_CLICK_COMMENT_INDEX](state, flag) {
    state.clickCommentIndex = flag;
  },
  [types.SET_REPLY_DATA](state, commentData) {
    state.replyDataAddList = commentData;
  },
  [types.SET_CLICK_COMMENT_DETAIL_INDEX](state, flag) {
    state.clickCommentDetailIndex = flag;
  },
}

export default matutations
