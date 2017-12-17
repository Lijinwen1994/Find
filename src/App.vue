<template>
  <div id="app">
    <div id="container" ref="container">
      <navigation></navigation>
      <router-view></router-view>
      <my-footer></my-footer>
    </div>
    <put-question ></put-question>
  </div>
</template>

<script>
  import Navigation from "components/navigation/navigation"
  import MyFooter from "components/footer/footer.vue"
  import putQuestion from "components/wenba/dialog/dialog.vue"
  import {login} from 'api/login'
  import {mapMutations} from 'Vuex'
  import *as types from "store/mutations-types"

  export default {
    components: {
      Navigation,
      MyFooter,
      putQuestion
    },
    created() {
      this.$nextTick(()=>{
        this.autoLogin();
      })
    },
    computed: {
    },
    methods:{
      autoLogin() {
        login().then((res)=>{
          let {userName,UID,type,resumeSign,companyDataSign} = res;
          //储存用户信息
          this.setUserInfo({
            name: userName,
            uid: UID,
            type: type,
            resumeSign: resumeSign,
            companyDataSign: companyDataSign
          })

        }).catch((err)=>{
          console.log(err)
        });
      },
      ...mapMutations({
        setUserInfo: types.SET_LOGIN_USER_INFO
      })
    },
    name: 'app'
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #container {
    min-width: 1200px;
    height: 100%;
  }

</style>
