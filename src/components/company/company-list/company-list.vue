<template>
  <div class="page-container">
    <my-title>
      <p>企业列表</p>
    </my-title>
    <template v-for='item in data'>
      <section @click="toDetail(item)">
        <img :src="item.headImg" alt="头像"/>
        <div class="content">
          <div class="companyName">{{item.name}}</div>
          <div class="profile">{{item.siteCity}} | {{item.peopleNumber}}</div>
          <p>{{item.intro}}</p>
        </div>
      </section>
    </template>
  </div>

</template>

<script>
  import myTitle from 'base/myTitle/myTitle'
  import {getCompanyListData} from '../../../api/companyList'
  import {mapGetters, mapMutations} from 'vuex'
  import * as types from '../../../store/mutations-types'

  export default {
    components: {
      myTitle
    },
    computed: {
      ...mapGetters([
        'showCompanyData'
      ])
    },
    data() {
      return {
        data: ""
      }
    },
    methods: {
      toDetail(data) {
        console.log(data)
        this.setShowData(data);
        this.$router.replace('company.page');
      },
      getData() {
        //请求公司列表信息
        getCompanyListData().then((res) => {
          this.data = res
        })
      },
      ...mapMutations({
        setShowData: types.SET_SHOW_COMPANY_DATA
      })
    },
    created() {
      this.$nextTick(() => {
        this.getData()
      })
    }

  }
</script>

<style rel='stylesheet/scss' lang="scss" scoped>
  @import '../../../common/scss/variable';
  @import "../../../common/scss/common";

  section {
    padding: 10px;
    border-top: 1px dashed $color-theme;

    & img {
      float: left;
      width: 180px;
      height: 180px;
      cursor: pointer
    }
    & .content {
      display: table-cell;
      & .profile {
        background-color: rgb(244, 245, 247);
        padding: 5px 10px;
      }
    }
    @extend .fix;
    & .companyName {
      color: #42B983;
      padding: 5px 10px;
      font: {
        size: 20px;
        weight: bold;
        transition: all 5s;
      }
    }
  }
</style>
