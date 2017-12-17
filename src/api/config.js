/*统一管理请求地址*/
const server = 'http://localhost:4000';

export const url_login = server + '/login';

export const url_register = server + '/register';

//百度地图密匙
export const baiduMapKeyAK = 'hCBcm8H8opRLdC0f6OibbGavC0pne1uc';

//百度地图请求地址
export const url_baiduMap = 'http://api.map.baidu.com/geocoder/v2/';

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


export const url_companyFormSubmit = './php/companySubmit.php'

export const url_headload = './php/headLoad.php'

export const url_videoload = './php/videoLoad.php'

export const url_reusmeSubmit = './php/resumeSubmit.php';

export const url_askQuestionSubmit = './php/askQuestion.php';

export const url_commentOnZan = './php/commentOnZan.php';



//**********************本地测试时使用************************/
export const url_companyList = '../api/companyListData';

export const url_jobhunterData = '../api/workerInfo';

export const url_searchTag = '../api/searchTag';

export const url_questionListForWenba = '../api/topicList_all';

export const url_replyComment = '../api/replyComment';

export const url_sendReplyComment = '../api/replySuccess';

export const url_questionDetail = '../api/topicDetail';

export const url_topicReply = '../api/topicReply'

export const url_questionListForTag = '../api/topicList_tag'

export const url_getResume = '../api/resumeData';
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
