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
    name:"华为",
    tag_value: '10010',
    tag_name: '华为',
    foundTime: '',
    foundFund: '1亿元',
    financingStage: '不需要融资',
    isListed: 2,
    peopleNumber: '10000人以上',
    siteProv:"广东",
    siteCity:"广州",
    point: {
      lat: "39.914850",
      lng:"116.403765"
    },
    address: "北京路十里长街XX号",
    videoUrl: "rtmp://live.hkstv.hk.lxdns.com/live/hks",
    intro: "华为是全球领先的信息与通信解决方案供应商。我们围绕客户的需求持续创新，与合作伙伴开放合作，在电信网络、企业网络、消费者和云计算等领域构筑了端到端的解决方案优势。我们致力于为电信运营商、企业和消费者等提供有竞争力的 ICT 解决方案和服务，持续提升客户体验，为客户创造最大价值。目前，华为的产品和解决方案已经应用于 140 多个国家，服务全球 1/3的人口。",
    culture: "企业文化/口号，",
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
