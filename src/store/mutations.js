import *as types from './mutations-types'

const matutations = {
  /**
   * [function 设置用户登录信息]
   * */
  [types.SET_LOGIN_USER_INFO](state, data) {
    console.log(data)
    state.loginUserInfo = data;
  },

  /**
   * [function 设置个人简历]
   * */
  [types.SET_RESUME_DATA](state, data) {
    state.resumeData = data;
  },

  /**
   * [function 设置公司数据]
   * */
  [types.SET_COMPANY_DATA](state, data) {
    state.SET_COMPANY_DATA = data;
  },

  /**
   * [function 首页切换标志位]
   * */
  [types.SET_INDEX_MODULE](state, flag) {
    state.indexModule = flag;
  },

  /**
   * [function 设置展示页公司数据] [也就是用户点击公司详细页的数据]
   * */
  [types.SET_SHOW_COMPANY_DATA](state, data) {
    state.showCompanyData = data
  },

  /**
   * [function 设置简历标志位] [是否存储过简历]
   * */
  [types.SET_RESUME_SIGN](state, flag) {
    state.loginUserInfo.resumeSign = flag;
  },

  /**
   * [function 修改问题列表当前点击的index] [便于点击评论时隐藏其他评论列表]
   * */
  [types.SET_CLICK_COMMENT_INDEX](state, flag) {
    state.clickCommentIndex = flag;
  },

  /**
   * [function 设置回复数据]
   * */
  [types.SET_REPLY_DATA](state, commentData) {
    state.replyDataAddList = commentData;
  },

  /**
   * [function 当前点击的评论索引]
   * */
  [types.SET_CLICK_COMMENT_DETAIL_INDEX](state, flag) {
    state.clickCommentDetailIndex = flag;
  },
}

export default matutations
