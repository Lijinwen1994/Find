<template>
  <header>
    <el-row>
      <el-col :span="10" :offset="2">
        <img src="../../common/image/logo.png" alt="" class="logo"/>
        <nav>
          <ul>
            <li>
              <a href="javascript:;" @click="toIndex">首页</a>
            </li>
            <li><a href="javascript:;" @click='toWenba'>问吧</a></li>
            <li><a href="javascript:;">面试直播间</a></li>
            <li>
              <el-switch
                v-model="indexModule"
                on-color="#13ce66"
                off-color="#87CEEB"
                on-text='进入企业版'
                off-text='进入个人版'
                :width=w
                @change='indexModuleToggle'>
              </el-switch>
            </li>
          </ul>
        </nav>
      </el-col>
      <el-col :span="10">
        <div class="header-right">
          <el-input
            placeholder="搜索"
            icon="search"
            v-model="search"
            :on-icon-click="handleIconClick"
            class='searchInput'
          >
          </el-input>

          <ul class="userInfoWrap" v-if='!loginUserInfo.name==""'>
            <el-dropdown>
						  <span class="el-dropdown-link">
						    <!--下拉菜单<i class="el-icon-caret-bottom el-icon--right"></i>-->
						    <i class='icon-menu iconfont icon-caidan'
                   @mouseover.native.stop="menuIconHover('menuhover')"
                   @mouseout.native.stop='menuIconHover("menu")'></i>
						  </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native='toMyResume' v-if='loginUserInfo.type == PRESONAL'>我的简历
                </el-dropdown-item>
                <!--companyDataSign 是2 没有上传， 1是已经上传-->

                <el-dropdown-item @click.native='toCompanycreate'
                                  v-if='loginUserInfo.type == COMPANY && loginUserInfo.companyDataSign == NOT_ALREADY'>
                  创建信息
                </el-dropdown-item>

                <el-dropdown-item @click.native='toCompanyInfo'
                                  v-if='loginUserInfo.type == COMPANY && loginUserInfo.companyDataSign == ALREADY'>企业信息
                </el-dropdown-item>
                <el-dropdown-item>信息</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <!--<i class="el-icon-menu"></i>-->
            <li class='userName'>{{ loginUserInfo.name }}</li><el-button type="text" @click.native="cancellation">[注销]</el-button>
          </ul>
          <el-button type="primary" class='reglog-btn' v-if='loginUserInfo.name==""' @click='reglogVis'>登录 | 注册
          </el-button>
        </div>
      </el-col>
    </el-row>
    <logreg-dialog v-if="logregDialogVis" @close="reglogVis"></logreg-dialog>
  </header>

</template>

<script>
  import LogregDialog from "../logregdialog/logregdialog.vue"
  import {bus} from '../../common/js/bus'
  import {mapGetters, mapMutations} from "vuex"
  import * as types from '../../store/mutations-types'
  import {NOT_ALREADY,ALREADY} from "../../common/js/config";


  export default {
    components: {
      LogregDialog
    },
    data() {
      return {
        search: " ",
        //切换开关的宽度
        w: 100,
        //菜单icon名字
        menuIconName: 'menu',
        logregDialogVis: false,
        ALREADY,
        NOT_ALREADY,
        PRESONAL: 1,
        COMPANY: 2
      }
    },
    created() {

    },
    mounted() {
      bus.$on('closeDialog', () => {
        this.logregDialogVis = false;
      })
//      let data = this.$store.store.state.company-list.companyData;
//      this.$store.store.commit("showCompanyData",data);
    },
    computed: {
      routePath() {
//			console.log(this.$route.path)
      },
//      companyDataSign() {
//        let sign = this.$store.store.state.baseModule.companyDataSign;
//        return sign == "true" ? 1 : 2
//      },
      ...mapGetters([
        'indexModule',
        'loginUserInfo'
      ])
    },
    methods: {
      cancellation() {
        this.$confirm('确认将退出登录').then(()=>{
          alert('asad')
        })
      },
      toIndex() {
        let type = this.loginUserInfo.type;
        if (type) {
          if (type == this.PRESONAL) {
            this.$router.push('/company.list')
            this.setIndexModule(false);
          }
          else {
            this.$router.push('/jobhunter')
            this.setIndexModule(true);
          }
        } else {
          this.$router.push('/jobhunter');
          this.setIndexModule(true);
        }
      },
      toWenba() {
        let mode = 'all'
        this.$router.push({path: `/wenba/questonlist/${mode}`})
      },
      //控制登录对话框关闭打开
      reglogVis() {
        this.logregDialogVis = !this.logregDialogVis;
      },
      handleIconClick() {

      },
      //切换首页模式 (个人/企业)
      indexModuleToggle(Boolean) {
        this.setIndexModule(!this.indexModule)
        this.$router.push(this.indexModule ? '/jobhunter' : '/company.list')
      },
      menuIconHover(name) {
        this.menuIconName = name;
      },
      //转跳我的简历页面
      toMyResume() {

        this.$router.push('/resume')
      },
      //转跳企业信息发布页面
      toCompanycreate() {
        this.$router.replace('/company.found')
      },
      toCompanyInfo() {
        this.$router.replace("/companydetail")
      },
      ...mapMutations({
        setIndexModule: types.SET_INDEX_MODULE
      })
    },
  }
</script>

<style rel='stylesheet/scss' lang='scss'>
  @import '../../common/scss/variable.scss';

  header {
    padding: 0;
    height: 60px;
    background-color: $color-theme;
    overflow: hidden;
    .header-right {
      float: right;
    }
    .userInfoWrap {
      display: inline-block;
    }
    .reglog-btn {
      margin-top: 12px;
    }
    .searchInput {
      @extend .reglog-btn;
      width: auto;
      margin-right: 10px;
      & input {
        width: 100px;
        transition: all .5s;
      }
      & input:focus {
        width: 200px;
      }
    }
    .userInfoWrap {
      color: #E5E9F2;
      .userName {
        margin: 0px 5px;
      }
      & > li {
        display: inline-block;
      }
    }
    .icon-menu {
      cursor: pointer;
      font-size: 30px;
    }
    icon-menu:hover {
      color: $color-grey;
    }
    .el-dropdown-link {
      display: inline-block;
      vertical-align: middle
    }
    .logo {
      width: 55px;
      height: 55px;
      vertical-align: top;
    }
    nav {
      display: inline-block;
      vertical-align: middle;
      padding: 0;
      a {
        display: inline-block;
        color: #F9FAFC;
        text-decoration: none;
        height: 100%;
        width: 100%;

        padding: 0 10px;
      }
      ul {
        margin: 0;
        padding: 0;
      }
      li {
        line-height: 60px;
        height: 60px;
        vertical-align: top;
        transition: all .3s;
        cursor: pointer;
        display: inline-block;
      }
      li:not(:last-of-type):hover {
        background-color: #41A7AE;
      }
      a:active {
        color: #20a0ff;
      }
      a:hover {
        color: #DFEBEC;
      }
    }
  }
</style>
