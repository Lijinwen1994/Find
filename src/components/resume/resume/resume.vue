<template>
  <div class="page-container">
    <div class="header">
      <div>
        <el-button  @click='toggle(false)' v-if='loginUserInfo.resumeSign == ALREADY'>编辑</el-button>
        <el-button @click='toggle(true)' v-if='loginUserInfo.resumeSign == NOT_ALREADY'>返回</el-button>
      </div>
    </div>
    <resume-page v-if='loginUserInfo.resumeSign == ALREADY'></resume-page>
    <resume-found v-if='loginUserInfo.resumeSign == NOT_ALREADY'></resume-found>
  </div>

</template>

<script>
  import resumeFound from '../resume-found/resume-found.vue'
  import resumePage from '../resume-page/resume-page'
  import {mapGetters,mapMutations} from 'vuex'
  import *as types from "../../../store/mutations-types"
  export default {
    components: {
      resumeFound,
      resumePage
    },
    data() {
      return {
        ALREADY: true,
        NOT_ALREADY: false
      }
    },
    computed: {
//      toggleFlag() {
//        return this.loginUserInfo.resumeSign;
//      },
      ...mapGetters([
        'loginUserInfo'
      ])
    },
    watch: {
        //监听计算函数resumeSign的变化，在并修改toggleSign的值。实现提交成功后，跳转到展示页面的效果
        resumeSign: function() {
          this.toggleSign = this.$store.store.state.baseModule.resumeSign;
        }
    },
    methods: {
      toggle(flag) {
        this.setResumeSign(flag)
      },
      ...mapMutations({
        setResumeSign: types.SET_RESUME_SIGN
      })
    }

  }
</script>

<style lang="scss" rel='stylesheel' scoped>
  .header{
    height: 100px;
    background: url(../../../common/image/bg.jpg) no-repeat;
    -webkit-background-size: cover;
    background-size: cover;
    position: relative;
    &>div{
      position: absolute;
      right: 30px;
      top: 35px;
    }
  }
</style>
