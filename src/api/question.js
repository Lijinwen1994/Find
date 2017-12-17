import {vue} from '../main'
import {url_searchTag,
  url_askQuestionSubmit,
  url_questionListForWenba,
  url_commentOnZan,
  url_replyComment,
  url_sendReplyComment,
  url_questionDetail,
  url_topicReply
} from './config'


export function getSearchTag(tagStr) {
  tagStr = encodeURIComponent(encodeURIComponent(tagStr));
  return vue.$http.get(`${url_searchTag}?TagStr=${tagStr}`)
    .then(function (res) {
      return Promise.resolve(res.data)
    }).catch(function (err) {
      return Promise.reject(err)
    })
}

export function sendQuestion(params) {
  return vue.$http.post(url_askQuestionSubmit, params).then(function (res) {
    return Promise.resolve(res.data)
  }).catch(function (err) {
    return Promise.reject(err)
  })
}

export function getQuestionList(getIndex) {
  return vue.$http.get(url_questionListForWenba).then(function (res) {
    return Promise.resolve(res.data)
  }).catch(function (err) {
    return Promise.reject(err)
  })
}

export function sendOnZan(params) {
  return vue.$http.get(url_commentOnZan,{
    params
  }).then(function (res) {
    return Promise.resolve(res)
  }).catch(function (err) {
    return Promise.reject(err)
  })
}


//获取回复下的评论
export function getReplyComment(params) {
  return vue.$http.get(url_replyComment,{
    params
  }).then(function (res) {
    return Promise.resolve(res.data)
  }).catch(function (err) {
    return Promise.reject(err)
  })
}

/** 发送评论
 * 数据： RID, UIDOfReply, operaUID, content
 * **/
export function sendReplyComment(params) {
  return vue.$http.get(url_sendReplyComment,{
    params
  }).then(function (res) {
    return Promise.resolve(res.data)
  }).catch(function (err) {
    return Promise.reject(err)
  })
}

/** 获取问题详细，
 *  数据： TID
 * */
export function getQuestionDetail(params) {
  return vue.$http.get(url_questionDetail,{
    params
  }).then(function (res) {
    return Promise.resolve(res.data)
  }).catch(function (err) {
    return Promise.reject(err)
  })
}

/** 发送话题的评论
 *  数据： TID, operaUID, content
 * */
export function sendTopicReply(params) {
  return vue.$http.get(url_topicReply,{
    params
  }).then(function (res) {
    return Promise.resolve(res.data)
  }).catch(function (err) {
    return Promise.reject(err)
  })
}
