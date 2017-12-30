<template>
  <div class="page-container">
    <my-title>
      <p>企业列表</p>
    </my-title>
    <my-lazy-load-info
      :backendAddress="url"
      :loadNumber="load_number"
      @getDataSuccess="addData"
      ref="lazy"
    >
    <template v-for='item in data'>
      <section @click="toDetail(item)">
        <img :src="item.headImg" alt="头像"/>
        <div class="content">
          <div class="companyName">{{item.name}}</div>
          <div class="profile">{{item.siteCity}} | {{item.peopleNumber}}</div>
          <p>{{item.intro | omit}}</p>
        </div>
      </section>
    </template>
    </my-lazy-load-info>
  </div>

</template>

<script>
  import myTitle from 'base/myTitle/myTitle'
  import {getCompanyListData} from '../../../api/companyList'
  import {mapGetters, mapMutations} from 'vuex'
  import * as types from '../../../store/mutations-types'
  import myLazyLoadInfo from '../../../base/myDataLazyLoading/myDataLazyLoading.vue';
  import {url_companyList} from '../../../api/config';
  import {EVERY_LOAD_NUMBER} from "../../../common/js/config";
  import {thinArr} from '../../../common/js/tool';

  export default {
    components: {
      myTitle,
      myLazyLoadInfo
    },
    computed: {
      ...mapGetters([
        'showCompanyData'
      ])
    },
    filters: {
      omit(value) {
        if(value.length < 200) {
          return value;
        }else{

          return value.substring(0, 200) + '...';
        }
      }
    },
    data() {
      return {
        data: [],
        url: url_companyList,
        load_number: EVERY_LOAD_NUMBER
      }
    },
    methods: {
      addData(data) {
        console.log(data);
        this.data.unshift(data);
        //扁平化二维数组
        this.data = thinArr(this.data);
      },
      toDetail(data) {
        localStorage.setItem('companyShowData', JSON.stringify(data))
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
//      this.$nextTick(() => {
//        this.getData()
//      })
    },

    beforeDestroy() {
      //clear scroll事件
      this.$refs.lazy.remove();
    }

  }
</script>

<style rel='stylesheet/scss' lang="scss" scoped>
  @import '../../../common/scss/variable';
  @import "../../../common/scss/common";

  section {
    padding: 10px;
    border-top: 1px dashed $color-theme;
    cursor: pointer;
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
