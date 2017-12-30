<template>
  <div>
    <label>地区：<input v-model="location"></label>
    <label>关键词：<input v-model="keyword"></label>
    <baidu-map class="bm-view" center="formData.point" :zoom="15" ak="hCBcm8H8opRLdC0f6OibbGavC0pne1uc">
      <bm-view class="bm-view"></bm-view>
      <bm-local-search :keyword="keyword" :auto-viewport="true" :location="location" @infohtmlset='searchSite'
                       :selectFirstResult="true"></bm-local-search>
      <bm-marker :position="{lng: formData.point.lng, lat: formData.point.lat}" :dragging="true"
                 animation="BMAP_ANIMATION_BOUNCE" @dragend="dragMark">
      </bm-marker>
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"
                      @locationSuccess='getSite'></bm-geolocation>
    </baidu-map>
  </div>
</template>

<script>
  import BaiduMap from 'vue-baidu-map';
  export default {
    components: {
      BaiduMap
    },
    data() {
      return {
        formData:{
          name:"aa",
          foundTime: '',
          foundFund: '',
          financingStage: '',
          isListed: 2,
          peopleNumber: '',
          siteProv:"",
          siteCity:"",
          point: {
            lat: "39.914850",
            lng:"116.403765"
          },
          address: "",
          videoUrl: "rtmp://live.hkstv.hk.lxdns.com/live/hks",
          intro: "",
          culture: "",
          headImg: "http://scimg.jb51.net/allimg/150811/14-150Q1142KAF.jpg"
        },
        location: "北京",
        keyword: "天安门",
        address: "",
      }
    },
    methods: {
      //geolocaltion自动定位
      getSite(point) {
        this.formData.address = "";
        let obj = point.addressComponent
        for (let n in obj) {
          this.formData.address += obj[n]
        }
        this.location = point.addressComponent.city;
        this.keyword = point.addressComponent.street;
        this.formData.point = point.point;
      },
      dragMark(option) {
//        this.$store.store.commit("setPoint", option.point)
      },
      //手动输入文字搜索
      searchSite(option) {
        this.formData.address = option.address;
        this.formData.point = option.point;
      }
    }
  }
</script>

<style>
</style>
