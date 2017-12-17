<template>
  <div class="page-container">

    <div class="job-container">
      <my-title>
        <p>求职者</p>
      </my-title>
      <template v-for='(item, index) in jobHunterData'>
        <div class="leftpage" v-if='judge(index) == 1'>
          <div class="img-wrap inline-block" v-bind:style="{backgroundImage: 'url(' + item.img + ')'}">
          </div>
          <!--<lazyBackground
                      :image-source='item.img'
                      image-class='img-wrap inline-block'
                      background-size='cover'
                      >
                      </lazyBackground>-->

          <div class="inline-block">
            <div class="info-detail">
              <div class="name">{{item.name}}</div>
              <div>{{item.job}}</div>
              <div>{{item.school}}</div>
              <div>{{item.degree}}</div>
              <div>{{item.experienceYear}}</div>
            </div>
            <div class="info-video" @click='onlive(index)'>
              <i class="iconfont icon-shipin icon-class"></i>
              <!--<icon name="video2" scale="8" class='icon-class'></icon>-->
            </div>
          </div>
        </div>
        <div class="rightpage" v-if='judge(index) == 2'>
          <div class="inline-block">
            <div class="info-detail">
              <div class="name">{{item.name}}</div>
              <div>{{item.job}}</div>
              <div>{{item.school}}</div>
              <div>{{item.degree}}</div>
              <div>{{item.experienceYear}}</div>
            </div>
            <div class="info-video" @click='onlive(index)'>
              <i class="iconfont icon-shipin icon-class"></i>
              <!--<icon name="video2" scale="8" class='icon-class'></icon>-->
            </div>
          </div>
          <div class="img-wrap inline-block" v-bind:style="{backgroundImage: 'url(' + item.img + ')'}">
          </div>
        </div>
      </template>

      <el-dialog
        :title="liveTitle"
        :visible="ckVisible"
        size="small"
        :before-close="handleClose"
        ref="ckDia"
        custom-class="live-class"
        top='12%'>
        <!--引入播放器-->
        <ckplayer :rtmp='rtmpUrl' ref='ck' :width='screenWdith' :height='screenHeight'></ckplayer>
        <span slot="footer" class="dialog-footer">
		    <el-button @click="handleClose">取 消</el-button>
		    <el-button type="primary" @click="handleClose">确 定</el-button>
		  </span>
      </el-dialog>
    </div>
  </div>


</template>

<script>
  import {getJobhunterData} from '../../api/getJobhunterData';
  import MyTitle from '../../base/myTitle/myTitle.vue'
  import ckplayer from '../../base/ckplayer/ckplayer.vue';
  //import VueLazyBackgroundImage from 'vue-lazy-background-images';
  //Vue.component('lazy-background', VueLazyBackgroundImage)
  export default {
    components: {
      MyTitle,
      ckplayer

    },
    data() {
      return {
        leftCount: 1,
        rightCount: 3,
        leftFlagArr: [1],
        rightFlagArr: [3],
        FlagMaximun: 100,
        ckVisible: false,
        rtmpUrl: '',
        liveTitle: '',
        jobHunterData: {},
        screenWdith: window.innerWidth * 0.5,
        screenHeight: window.innerHeight * 0.5
      }
    },
    computed: {},
    methods: {
      createFlagArr() {
        for (let i = 0; i < this.FlagMaximun; i++) {
          this.leftCount += 1;
          this.leftFlagArr.push(this.leftCount);
          this.leftCount += 3;
          this.leftFlagArr.push(this.leftCount);

          this.rightCount += 1;
          this.rightFlagArr.push(this.rightCount);
          this.rightCount += 3;
          this.rightFlagArr.push(this.rightCount);
        }
      },
      judge(index) {
        if (this.leftFlagArr.indexOf(index) > -1) {
          return 1;
        } else if (this.rightFlagArr.indexOf(index) > -1) {
          return 2;
        }
      },

      onlive(index) {
        this.ckVisible = true;
        this.rtmpUrl = this.jobHunterData[index - 1].rtmp;
        console.log(this.rtmpUrl)
        this.$nextTick(() => {
          console.log(this.$refs.ck)
          this.$refs.ck.play();
        })

        //打开直播对话框
//				this.$store.store.commit('toggleLiveDia',true);
        //配置播放器
//				this.$store.store.commit('initCK',payload);

      },
      handleClose() {
        this.ckVisible = false
      },

      //获得数据。
      _getData() {
        getJobhunterData().then((res) => {
          this.jobHunterData = res;
          console.log(res)
        })
      }
    },
    created() {
      this.$nextTick(() => {
        this._getData()
      })

    },
    mounted() {
      this.createFlagArr();
    }
  }
</script>


<style rel='stylesheet/scss' lang="scss" scoped>
  $detailBGC: #BCD2EE;

  @import "../../common/scss/variable.scss";
  $item-w: 250px;
  .job-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .img-wrap {
    width: $item-w;
    height: 300px;
    display: inline-block;
    background-size: cover;
    background-position: center;
    box-shadow: 0 0 25px 0px rgba(0, 0, 0, 0.22) inset;
  }

  .info-detail,
  .info-video {
    text-align: center;
    height: 145px;
    width: $item-w
  }

  .info-detail {

    position: relative;
    .leftpage & {
      text-align: left;
    }
    .rightpage & {
      text-align: left
    }
    div {
      padding: 3px;
      margin: 0 20px;
    }
    box-shadow: 0 0 25px 0px rgba(0, 0, 0, 0.22) inset;

  }

  .info-video {
    background-color: $color-theme;
    margin-top: 10px;
    cursor: pointer;
    /*纸张曲边效果*/
    border-bottom-left-radius: 20px 500px;
    border-bottom-right-radius: 600px 30px;
    border-top-right-radius: 5px 100px;
    text-align: center;
    line-height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    & .icon-class {
      font-size: 60px;
      color: $color-green;
    }
    &:hover .icon-class:before {
      box-shadow: 0 0 25px 0px rgba(0, 0, 0, 0.22);
      background-color: #0F838B;
      border-radius: 50%;
    }
  }

  .inline-block {
    display: inline-block;
    vertical-align: text-bottom;
    margin: 6px;

  }

  /*纸张*/
  .leftpage,
  .rightpage {
    margin: 6px;
    @extend .inline-block;
    box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.16);
    position: relative;
    background-color: rgb(233, 233, 233);
    transition: all .5s;
  }

  @mixin imgShadow {
    content: "";
    position: absolute;
    z-index: -2;
    transform: rotate(-2deg);
    bottom: 15px;
    box-shadow: 0 15px 10px rgba(0, 0, 0, 0.7);
    height: 50%;
    left: 10px;
    max-height: 100px;
    max-width: 300px;
    width: 50%;
  }

  @mixin pageShadow {
    transform: rotate(1deg);
    left: auto;
    right: 10px;
  }

  .leftpage:after,
  .leftpage:before {
    @include imgShadow
  }

  .leftpage:before {
    @include pageShadow
  }

  .rightpage:after,
  .rightpage:before {
    @include imgShadow
  }

  .rightpage:before {
    @include pageShadow
  }

  .rightpage:hover,
  .leftpage:hover {

    & .name {
      color: #5F9EA0;
    }
  }

  /*钢圈效果*/
  .ring {
    position: absolute;
    bottom: 5px;
    left: 200px;
    display: none;
  }

  .ring li {
    list-style: none;
    width: 40px;
    height: 20px;
    border: 4px solid rgba(0, 13, 1, .8);
    border-radius: 200px 200px 0 0;
    border-bottom: none;
    transform: rotateX(60deg);
    /*position: relative;*/
    display: block;
    margin: 20px 0;
  }

  /*钢圈的洞*/
  .hole {
    content: "";
    position: absolute;
    width: 5px;
    height: 13px;
    background-color: rgba(0, 13, 1, .8);
    border: 1px solid #363636;
    box-shadow: 1px 2px 3px #363636;
    border-radius: 50%;
    z-index: -10;
  }

  .ring li:after {
    @extend .hole;
    margin: {
      top: 10px;
      left: -6px;
    }
  }

  .ring li:before {
    @extend .hole;
    margin: {
      top: 10px;
      left: 40px;
    }
  }

  .name {
    color: #42B983;
    font: {
      size: 20px;
      weight: bold;
      transition: all 5s;
    }
  }

  .live-class {
    width: 700px;
    & .el-dialog__body {
      padding: 30px 0;
    }
  }

  #ckplayer_a1 {
    display: table;
    margin: 0 auto;
  }
</style>

