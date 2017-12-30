import {vue} from '../main'
import {url_searchTag,
  url_askQuestionSubmit,
  url_questionListForWenba,
  url_commentOnZan,
  url_getSecondaryReply,
  url_sendSecondaryReply,
  url_questionDetail,
  url_sendTopicReply,
  url_getTagMsg
} from './config'

/**
 * [function 搜索标签]
 * @param [string] tagStr [输入的标签字符串]
 * @return [Promise object] data [result: 1,  q]
 * */
export function getSearchTag(tagStr) {
  tagStr = encodeURIComponent(tagStr);
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

/**
 * 请求放在了我的滚动加载插件中
 * */
// export function getQuestionList(getIndex) {
//   return vue.$http.get(url_questionListForWenba).then(function (res) {
//     return Promise.resolve(res.data)
//   }).catch(function (err) {
//     return Promise.reject(err)
//   })
// }

export function sendOnZan(params) {
  return vue.$http.get(url_commentOnZan,{
    params
  }).then(function (res) {
    return Promise.resolve(res)
  }).catch(function (err) {
    return Promise.reject(err)
  })
}


//获取二级评论
export function getSecondaryReply(params) {
  return vue.$http.get(url_getSecondaryReply,{
    params
  }).then(function (res) {
    return Promise.resolve(res.data)
  }).catch(function (err) {
    return Promise.reject(err)
  })
}

/** 发送评论（二级评论)
 * 数据： RID, UIDOfReply, operaUID, content
 * **/
export function sendSecondaryReply(params) {
  return vue.$http.get(url_sendSecondaryReply,{
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

/** 发送话题的评论(一级评论)
 *  数据： TID, operaUID, content
 * */
export function sendTopicReply(params) {
  return vue.$http.post(url_sendTopicReply,{
    params
  }).then(function (res) {
    return Promise.resolve(res.data)
  }).catch(function (err) {
    return Promise.reject(err)
  })
}

/**
 * [获取标签的信息]
 * @param tag_value
 */
export function getTagMsg(tag_value) {
  return vue.$http.get(url_getTagMsg,{
    params:{tag_value:tag_value}
  }).then(function (res) {
    return Promise.resolve(res.data)
  }).catch(function (err) {
    return Promise.reject(err)
  })
}
