/*统一管理请求地址*/
/**
 * 后台服务器地址
 * */
const server = 'http://localhost:4000';

/**
 * [string 登录]
 * */
export const url_login = server + '/login';

/**
 * [string 注册]
 * */
export const url_register = server + '/register';

/**
 * [String 注销登录]
 * */
export const url_cancellation = server + '/cancellation'

/**
 * [string  百度地图密匙]
 * */
export const baiduMapKeyAK = 'hCBcm8H8opRLdC0f6OibbGavC0pne1uc';

/**
 * [string  百度地图请求地址]
 * */
export const url_baiduMap = 'http://api.map.baidu.com/geocoder/v2/';

/**
 * [function 获取经纬度]
 * @param {object} point [内部有经纬度对象]
 * */
export function getSiteParams(point) {
  let _location = `${point.lat}, ${point.lng}`;
  return {
    ak: baiduMapKeyAK,
    callback: 'renderReverse',
    location: _location,
    pois: 1,
    output: "json"
  };
}

/**
 *  [string 头像上传地址]
 * */
export const url_headload = server + '/headLoad';

/**
 * [string 简历表提交地址]
 * */
export const url_reusmeSubmit = server + '/resumeSubmit';

/**
 * [string 获取简历信息]
 * */
export const url_getResumeData = server + '/getResumeData';

export const url_videoload = './php/videoLoad.php';

/**
 * [string 发送公司表单信息]
 * */
export const url_companyFormSubmit = server + '/companySubmit';

/**
 * [string 获取标签URL]
 * */
export const url_searchTag = server + '/getTag';

/**
 * [string 提交问题URL]
 * */
export const url_askQuestionSubmit = server + '/saveTopic';

/**
 * [点赞的地址] [一级评论和二级评论的点赞，用c_type区分， 一级 first 二级 second]
 * @type {string}
 */
export const url_commentOnZan = server + '/zan';


//**********************本地测试时使用************************/
export const url_companyList = server + '/companyListData';
// export const url_companyList = '../api/companyListData';

/**
 * [简历首页数据获取]
 * @type {string}
 */
export const url_jobhunterData = server + '/workerInfo';
// export const url_jobhunterData = '../api/workerInfo';

/**
 * [问吧首页数据加载]
 * */
export const url_questionListForWenba = server + '/topicList_all';

/**
 * [根据标签，获取对应话题的地址]
 * */
export const url_questionListForTag = server + '/topicList_tag';
// export const url_questionListForTag = '../api/topicList_tag';

// export const url_questionListForWenba = '../api/topicList_all';

/**
 * [获取二级评论]
 * @type {string}
 */
export const url_getSecondaryReply = server + '/getSecondaryReply';


/***
 * [发送二级评论]
 * @type {string}
 */
export const url_sendSecondaryReply = server + '/sendSecondaryReply';


/**
 *[string 话题详细页数据请求]
 */
export const url_questionDetail = server + '/topicDetail';

/***
 * [回复话题的评论，一级评论]
 * @type {string}
 */
export const url_sendTopicReply = server + '/sendTopicReply';

/**
 * [获取标签信息] [查看标签专属页面时，显示当前标签信息]
 *
 */
export const url_getTagMsg = server + '/getTagMsg';

// export const url_getResume = '../api/resumeData';
/*************************分割线结束*********************************/


// //**********************切换线上**********************//
// export const url_companyList = './php/requestListData.php?request=company'
//
// export const url_jobhunterData = './php/requestListData.php?request=personal'
//
// export const url_searchTag = './php/searchTag.php'
//
// export const url_questionListForWenba = './php/questionListForWenba.php'
//
// export const url_replyComment = './php/replyComment.php'
//
// //回复评论
// export const url_sendReplyComment = './php/sendReplyComment.php'
//
// export const url_questionDetail = './php/questionDetail.php';
//
//export const url_topicReply = './php/topicReply.php'

//export const url_questionListForTag = './php/questionListForWenba.php'

//export const url_getResume = server+'/getResume';
//**********************分割线结束**********************//
