<template>
  <div id='form-wrap'>


    <div class="container">
      <transition name='form-log' mode='in-out'>
        <div class="login" v-if="!toggleValue">
          <div class='form-header'>登录</div>
          <el-form label-position='right' label-width='60px' :model="loginData"  >
            <el-form-item label='用户名' prop="name">
              <el-input v-model="loginData.loginName"></el-input>
            </el-form-item>
            <el-form-item label='密码' prop="pass">
              <el-input v-model="loginData.loginPass"></el-input>
            </el-form-item>

            <el-form-item label='类型' prop="type">
              <el-radio-group v-model="loginData.type">
                <el-radio :label="1">个人</el-radio>
                <el-radio :label="2">企业</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label='免登陆'>
              <el-tooltip content='开启下次免登陆'  placement="top">
                <el-switch
                  v-model="loginData.saveFlag"
                  on-text="开"
                  off-text="关"
                >
                </el-switch>
              </el-tooltip>
            </el-form-item>
            <div class="cursom-button-block" @click.stop=onLogin(loginData)>登录</div>
          </el-form>
        </div>
      </transition>
      <transition name='form-reg' mode='in-out' >
        <div class="register" v-if='toggleValue'>
          <div class='form-header'>注册</div>
          <el-form label-position='right' :model="registerData" label-width='80px' :rules='rules' ref='registerData'>
            <el-form-item label="用户名" prop="name">
              <el-input v-model="registerData.name" ></el-input>
            </el-form-item>
            <el-form-item label='密码' prop='pass'>
              <el-input v-model='registerData.pass' type='password' auto-complete='off'></el-input>
            </el-form-item>
            <el-form-item label='确认密码' prop='checkPass'>
              <el-input auto-complete='off' type='password' v-model='registerData.checkPass'></el-input >
            </el-form-item>
            <el-form-item label='用户类型' prop='checkPass'>
              <el-radio-group v-model="registerData.type">
                <el-radio :label="1">个人</el-radio>
                <el-radio :label="2">企业</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <div class="cursom-button-block" @click=onRegister(registerData)>注册</div>
        </div>
      </transition>

    </div>
  </div>
</template>


<script>
  import {mapMutations,mapGetters} from 'Vuex'
  import {sendRegister} from '../../api/register'
  import {login} from '../../api/login'
  import {OK, PASS_ERROR, USER_NOT_EXIST} from "../../common/js/config"
  import *as types from "../../store/mutations-types"
  import {bus} from '../../common/js/bus'
  import {emptyObject} from '../../common/js/tool'
  export default {
    data() {
      let validatecheckPass = (rule, value, callback) => {
        if(this.registerData.pass !== value){
          callback(new Error('两次密码输入不一致'))
        }else{
          callback()
        }
      };
      return {
        //注册校验规则
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur'},
            { min: 5, max: 18, message: '长度在 5 到18 个字符', trigger: 'blur' }
          ],
          pass: [
            { required: true, message: '请输入密码', trigger: 'blur'},
            { min:6, max: 18, message: '长度在6 到18个字符',trigger: 'blur' }
          ],
          checkPass: [
            {required: true, message: '请再次输入密码', trigger: 'blur'},
            {validator: validatecheckPass, trigger: 'blur'}
          ]
        },
        //免登陆标记

        registerData: {
          name: '',
          pass: '',
          checkPass: '',
          type:1
        },
        loginData: {
          loginName: '',
          loginPass: '',
          type: 1,
          saveFlag: true,
        }
      };
    },
    props:{
      toggleValue:{
        type: Boolean,
        default: true
      }
    },
    computed: {
      ...mapGetters(['loginUserInfo'])
    },
    methods: {
      clearInput() {
        emptyObject(this.registerData);
      },
      onRegister(data) {
        //表单验证，看是否已选
        this.$refs.registerData.validate((valid) => {
          if (valid) {
            sendRegister(data).then((res) => {
              console.log(res)
              if(res.result == OK) {
                //注册成功
                this.$message('注册成功,为你切换登录');
                setTimeout( ()=> {
                  this.$emit('registerSuccess')
                  this.clearInput();
                },2000)
              }else if(res.result == 2) {
                this.$message({
                  type: 'warning',
                  message: res.msg
                })
              }
            }).catch((e) => {
              this.$notify.error({
                title: `注册出问题`,
                message: `错误信息 ${e}`
              })
            })
          } else {
            this.$notify({
              title: '还有输入框没填写',
              message: '请检查',
              type: 'warning',
            });
            return false;
          }
        });
      },

      //登录
      onLogin() {
        //login方法返回promiss对象
          login(this.loginData)
          .then((res) =>{
            console.log(res)
            //登录成功
            if(res.result == OK){
              this.$notify.success({
                title: '恭喜',
                message: '登录成功'
              })

              let {userName,UID,type,resumeSign,companyDataSign} = res;
              //储存用户信息
              this.setUserInfo({
                name: userName,
                uid: UID,
                type: type,
                resumeSign: resumeSign,
                companyDataSign: companyDataSign,
              })


//              //如果有简历数据，储存
//              if(resumeData){
//                this.setResumeData(resumeData)
//              }

              //如果有公司数据， 储存
//              if(companyData) {
//                this.setCompanyData(companyData)
//              }
              //关闭弹窗，使用eventBus
              bus.$emit('closeDialog');
              history.go(0);
            }

            else if(res.result == 2) {
              this.$notify.warning({
                title: '提示',
                message: res.msg
              })
            }


          })
          .catch((e) =>{
            this.$notify.success({
              title: '登录错误',
              message: '错误信息：' + e
            })
          })
      },
      ...mapMutations({
        setUserInfo: types.SET_LOGIN_USER_INFO,
        setCompanyData: types.SET_COMPANY_DATA
      })
    }
  };
</script>

<style scoped rel='stylesheet/scss' lang="scss">
  @import "../../common/scss/variable";
  @import "../../common/scss/ui";
  #form-wrap{
    margin:0 auto;
    max-width: 450px;
    position: relative;
    overflow: hidden;
  }
  .form-header{
    border-top: 2px solid $color-theme;
    text-align: center;
    padding: 10px;
    border-radius: 3px;
  }
  .register,
  .login{
    float: left;
    margin: 20px 50px 0;
    width: 350px;
  }

  .container{
    width: 1000px;
    overflow: hidden;
  }

  .form-log-enter-active{
    transition: all .6s ease;
  }
  .form-log-enter{
    transform: translateX(-400px);
  }
  .form-log-leave-active{
    transform: translateX(-400px);

  }

  .form-reg-enter-active,.form-reg-leave-active{
    transition: all .3s ease;
  }
  .form-reg-enter{
    transform: translateX(400px);
  }
  .form-reg-leave-active{
    transform: translateX(400px);
  }

</style>
