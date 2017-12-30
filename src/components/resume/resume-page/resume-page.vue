<template>

    <div class="resume-body">
      <i class="bg-left bg"></i>
      <i class="bg-right bg"></i>
      <div class="headImg">
        <img :src='resumeData.headImg' alt=""/>
      </div>
      <section v-if="resumeData.name">
        <div class="name">{{resumeData.name}}</div>
        <division>个人资料</division>
        <div class="line">
          <span><i class="iconfont icon-xuexiao-copy"></i>{{resumeData.school}}</span>·
          <span><i class="iconfont icon-xueli"></i>{{resumeData.degree | toStringDegree}}</span>·
          <span><i class="iconfont icon-nianling"></i>{{resumeData.age}}</span>
        </div>
        <div class="line">
          <span> <i class="iconfont icon-zhiye"></i>{{resumeData.job}}</span>·
          <span><i class="iconfont icon-gongzuojingyan">{{resumeData.experienceYear}}</i></span>
        </div>
        <div class="line">
          <span><i class="iconfont icon-gongzi"></i>{{resumeData.wantSaraly}}</span>
        </div>
        <!--<division>视频</division>-->
        <!--<resume-video ref='ck' :rtmp='resumeData.videoUrl' width='700' height='400'></resume-video>-->
        <division>项目经历</division>
        <template v-for='item in resumeData.projectEx'>
          <div class="proEx">
					<span>
						<div class="proName">{{item.name}}</div>
						<time>{{item.timeStart | timeString}} —— {{item.timeEnd|timeString}}</time>
					</span>
            <div class="intro">{{item.descride}} </div>
          </div>
        </template>
      </section>
      <section v-else>
        没有数据，请点击右上角[编辑]按钮增加信息
      </section>

    </div>

</template>

<script>
  import division from '../../../base/division/division.vue'
  import resumeVideo from "../../../base/ckplayer/ckplayer.vue"
  import {mapGetters,mapMutations} from 'vuex'
  import {getResumeData} from '../../../api/getResume'
  import {SET_RESUME_DATA} from '../../../store/mutations-types';

  export default {
    components: {
      division,
      resumeVideo
    },
    filters:{
      toStringDegree(value) {
        let degreeArr = [0,'初中','高中','大专','本科','研究生','博士'];
        return  value = degreeArr[Number(value)]
      },
      timeString(value ) {
        let i = value.indexOf('T');
        return value.substring(0,i);
      }
    },
    created() {
      this._getResumeData();
    },
    data() {
      return {
      }
    },

    computed: {
//      timeString(value ) {
//        let i = value.indexOf('T');
//        return value.substring(0,i);
//      },
      ...mapGetters([
        'loginUserInfo',
        'resumeData'
      ])
    },
    methods: {
      _getResumeData() {
        this.$nextTick(()=> {
          getResumeData(this.loginUserInfo).then((sourceData)=>{
            console.log(sourceData);
            let data = sourceData[0];
            let {projectEx} = data;
            if(!Array.isArray(projectEx)) {
              projectEx = JSON.parse(projectEx);
            }

            data.projectEx = projectEx;
            this.setResumeData(data);
          })
        })
      },

      ...mapMutations({
        'setResumeData':SET_RESUME_DATA
      })
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
