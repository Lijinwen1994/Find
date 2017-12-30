<template>
  <div>
    <division>公司信息</division>
    <div class="wrap">
      <div class="infoWrap">
        <ul>
          <li>成立时间： {{data.foundTime | timeString}}</li>
          <li>注册资金： {{data.foundFund}} 万元</li>
          <li>融资情况： {{data.financingStage}}</li>
          <li>是否上市：
            <span v-if='data.isListed == 1'>是</span>
            <span v-else>否</span>
          </li>
          <li>
            <p>企业文化:</p>
            <p>{{data.culture}} </p>
          </li>
        </ul>
      </div>
      <div class="videoWrap">
        <!--<ckplayer :rtmp='data.videoUrl' ref='ck' width='500' height='350'></ckplayer>-->
      </div>
    </div>
    <division>地址</division>
    <div class="address"><i class="iconfont icon-dingwei"></i> {{callbackAddress}}</div>
    <div class="mapContainer">
      <baidu-map class="map" :center="JSON.parse(data.point)" :zoom="15">
        <bm-marker :position="JSON.parse(data.point)" animation="BMAP_ANIMATION_BOUNCE">
        </bm-marker>
      </baidu-map>
    </div>


  </div>

</template>

<script>
  import division from 'base/division/division'
  import ckplayer from "base/ckplayer/ckplayer"
  import baidumap from "../company-map/company-map.vue"
  import jsonp from 'common/js/jsonp'
  import {getSiteParams, url_baiduMap} from '../../../api/config';
  export default {
    components: {
      division,
      ckplayer,
      baidumap
    },
    filters: {
      timeString(value ) {
        let i = value.indexOf('T');
        return value.substring(0,i);
      }
    },
    created() {
      this.getSite();
    },
    mounted() {

    },
    data() {
      return {
        callbackAddress: "",
        showCompanyData: {}
      }
    },
    props: {
      data: {
        required: true
      }
    },

    methods:{
      //向百度请求地址
      getSite() {
        this.showCompanyData = JSON.parse(localStorage.getItem('companyShowData'));
        let params = getSiteParams(JSON.parse(this.showCompanyData.point));
        jsonp(url_baiduMap, params).then((res) => {
          this.callbackAddress = res.result.formatted_address;
        })
      },
    },
    mounted() {
//      this.$nextTick(() => {
//        this.$refs.ck.play();
//      })
    }
  }
</script>

<style lang="scss" rel='stylesheet/scss' scoped>
  @import "../../../common/scss/variable";
  .address{
    padding: 0 0 20px 20px;
    color: $color-text-d;
    i{
      color: $color-theme;
      font-size:18px;
    }
  }
  .wrap {
    display: flex;
    .infoWrap {
      flex-grow: 1;

      & ul {
        border-left: 1px solid #01939D;
        margin: {
          left: 40px;
          top: -2px;
        }
      }
    }
    .videoWrap {
      flex-grow: 1;
    }
  }
  .mapContainer{
    padding: 0 20px 20px 20px;
    .map {
      border: 1px solid $color-grey;
      box-shadow: 1px 1px 1px  $color-grey;
      width: 100%;
      height: 250px;
    }
  }

</style>
