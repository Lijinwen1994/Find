<template>
  <div>
    <div class="resume-body">
      <i class="bg-left bg"></i>
      <i class="bg-right bg"></i>
      <div class="headImg">
        <img :src='resumeData.headImg' alt=""/>
      </div>
      <div class="name">{{resumeData.name}}</div>
      <division>个人资料</division>
      <div class="line">
        <span><i class="iconfont icon-xuexiao-copy"></i>{{resumeData.school}}</span>·
        <span><i class="iconfont icon-xueli"></i>{{resumeData.degree}}</span>·
        <span><i class="iconfont icon-nianling"></i>{{resumeData.age}}</span>
      </div>
      <div class="line">
        <span> <i class="iconfont icon-zhiye"></i>{{resumeData.job}}</span>·
        <span><i class="iconfont icon-gongzuojingyan">{{resumeData.experienceYear}}</i></span>
      </div>
      <div class="line">
        <span><i class="iconfont icon-gongzi"></i>{{resumeData.wantSaraly}}</span>
      </div>
      <division>视频</division>
      <resume-video ref='ck' :rtmp='resumeData.videoUrl' width='700' height='400'></resume-video>
      <division>项目经历</division>
      <template v-for='item in resumeData.projectEx'>
        <div class="proEx">
					<span>
						<div class="proName">{{item.name}}</div>
						<time>{{item.timeStart}} —— {{item.timeEnd}}</time>
					</span>
          <div class="intro">{{item.descride}} </div>
        </div>
      </template>
    </div>

  </div>
</template>

<script>
  import division from '../../../base/division/division.vue'
  import resumeVideo from "../../../base/ckplayer/ckplayer.vue"
  import {mapGetters} from 'vuex'
  import {getResumeData} from '../../../api/getResume'

  export default {
    components: {
      division,
      resumeVideo
    },
    created() {
      getResumeData(this.loginUserInfo).then((data)=>{
        this.resumeData = data
      })
    },
    data() {
      return {
        resumeData: {}
      }
    },

    computed: {
      headImgUrl() {
//        return this.$store.store.state.resume.resumeData.headImg;
      },
      rtmp() {
//        return this.$store.store.state.ck.rtmp;
      },
      ...mapGetters([
        'loginUserInfo'
      ])
    },
    methods: {
      paly() {

      }

    },
    mounted() {
//      let {videoUrl} = this.resumeData;
//      this.$store.store.commit('initCK',{'rtmp': videoUrl});
      this.$refs.ck.play()
    }
  }
</script>

<style lang="scss" rel='stylesheet' scoped>
  @import '../../../common/scss/variable';
  @import "../../../common/scss/common";

  .resume-body {

    position: relative;
    text-align: center;
    width: 95%;
    background-color: rgb(250, 250, 250);
    margin: 0 auto;
    padding: 0 30px;
    @extend .fix;
    .bg {
      width: 12px;
      height: 34px;
      position: absolute;

      top: 80px;
    }
    .bg-left {
      background-image: url(../../../common/image/top_bg.png);
      left: 0;
    }
    .bg-right {
      background-image: url(../../../common/image/top_bg.png);
      right: 0;
      background-position: 12px 0px;
    }
    .headImg {
      height: 120px;
      width: 120px;
      margin: 0 0 0 calc((100% - 120px) / 2);
      & img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        box-shadow: 0 0 0 8px rgba(245, 245, 245, .6);
        position: absolute;
        top: -60px;
        margin-left: -60px;
      }
    }
    .name {
      color: #333;
      font-size: 30px;
      padding: 20px;
      margin-top: -60px;
    }
    .line {
      margin: 10px 0 20px;
    }
    span {
      display: inline-block;
      margin: 0px 20px;
      font-size: 18px;
      & i {
        margin: 0 5px;
        display: inline-block;
      }
    }
  }

  .proEx {
    span {
      margin: 0;
      border-bottom: 1px solid #DCDCDC;
    }
    .proName {
      display: inline-block;
      font-size: 20px;
      padding: 0 5px;
      vertical-align: bottom
    }
    .intro {
      margin: 10px;
    }
    time {
      font-size: 14px;
    }
    padding: 0 30px;
    text-align: left;
    margin: 20px 0;
    & + .proEx {
      border-top: 1px dashed #CFE9EB;
    }
  }
</style>
