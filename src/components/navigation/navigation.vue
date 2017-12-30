<template>
  <header>
    <el-row>
      <el-col :span="10" :offset="2">
        <img src="../../common/image/logo.png" alt="" class="logo"/>
        <nav>
          <ul>
            <li>
              <a href="javascript:;" @click="toIndex">{{navName}}</a>
            </li>
            <li><a href="javascript:;" @click='toWenba'>问吧</a></li>

            <li>
              <el-switch
                v-model="this.indexModule"
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
          <!--搜索框 开始-->
          <search></search>
          <!--搜索框 结束-->
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
                  创建企业信息
                </el-dropdown-item>

                <el-dropdown-item @click.native='toCompanyInfo'
                                  v-if='loginUserInfo.type == COMPANY && loginUserInfo.companyDataSign == ALREADY'>企业信息
                </el-dropdown-item>
                <el-dropdown-item>信息</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <!--<i class="el-icon-menu"></i>-->
            <li class='userName'>{{ loginUserInfo.name }}</li><el-button type="text" @click.native="Tocancellation">[注销]</el-button>
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
  import {cancellation} from '../../api/cancellation'
  import {emptyObject} from '../../common/js/tool'
  import _ from 'lodash'
  import Search from './search.vue'
  export default {
    components: {
      LogregDialog,
      Search
    },
    data() {
      return {
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

    },
    computed: {
      navName() {
        return this.indexModule == 1 ? '个人版首页' : '企业版首页';
      },
      ...mapGetters([
        'indexModule',
        'loginUserInfo'
      ])
    },
    methods: {
      /**
       * [function 注销确认] [确认发送消息]
       * */
      Tocancellation() {
        this.$confirm('确认将退出登录').then(()=>{
          cancellation().then((res)=>{
            if(res.result == 1) {
              let emptyUserInfo = emptyObject(_.cloneDeep(this.loginUserInfo));
              this.setUserInfo(emptyUserInfo);
              console.log(this.loginUserInfo);
            }else{
              this.$message(res.message)
            }
          });
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
            this.$router.push('/workerindex')
            this.setIndexModule(true);
          }
        } else {
          this.$router.push('/workerindex');
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

      //切换首页模式 (个人/企业)
      indexModuleToggle(Boolean) {
        this.setIndexModule(!this.indexModule);
        this.$router.push(this.indexModule ? '/workerindex' : '/company.list')
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
        setIndexModule: types.SET_INDEX_MODULE,
        setUserInfo: types.SET_LOGIN_USER_INFO,
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
    /*overflow: hidden;*/
    .header-right {
      float: right;
    }
    .userInfoWrap {
      display: inline-block;
    }
    .reglog-btn {
      margin-top: 12px;
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
    .icon-menu:hover {
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
