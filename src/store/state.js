const state = {
  //注册时的校验数据。
  ruleForm: {
    name: '',
    pass: '',
    checkPass: '',
    type:1
  },

  //用户信息
  loginUserInfo: {
    name: '',
    uid: "",
    //用户类型 1，个人，2企业
    type: 1,
    //是否记录过简历标志位
    resumeSign: true,
    //是否上传过公司信息标志位
    companyDataSign: false,
    headImg: 'https://img.kanzhun.com/images/activity/20170502/d7a2917a29514e85e2a14b721f2b11d3.png'
  },
  resumeData: {
    name: '',
    degree: '',
    school: '',
    job: '',
    age:"",
    projectEx: [
      {
        timeStart: '',
        timeEnd: '',
        name: '',
        descride: ''
      }
    ],
    experienceYear: '',
    wantSaraly: '',
    // videoUrl:'rtmp://live.hkstv.hk.lxdns.com/live/hks',
    videourl: '',
    headImg :  ''
  },
  companyData: {
    name:"",
    tag_value: '',
    tag_name: '',
    foundTime: '',
    foundFund: '',
    financingStage: '',
    isListed: "",
    peopleNumber: '',
    siteProv:"",
    siteCity:"",
    point: {
      lat: "39.914850",
      lng:"116.403765"
    },
    address: "北京路十里长街XX号",
    videoUrl: "rtmp://live.hkstv.hk.lxdns.com/live/hks",
    intro: "",
    culture: "",
    headImg: "https://img.kanzhun.com/images/logo/20150418/0d2dbe2a1fb130c913c9a3d6e72296ef.jpg"
  },
  //首页切换 个人/企业
  indexModule: true,
  showCompanyData: {},
  clickCommentIndex: -1,
  clickCommentDetailIndex: -1,
  //回复评论后，将评论返回给上层组件。
  replyDataAddList: {}
}

export default state;
