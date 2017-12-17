<template>
  <div class="page-container">
    <div class="header"></div>

    <div class="c-mainbody">
      <div class="sider">
        <div class="headImg" @click='onImgLoad(true)'>
          <img :src='formData.headImg' alt=""/>
          <span>

					</span>
        </div>
        <div class="input-area">
          <el-form label-width='70px' :model='formData'>
            <el-form-item label='公司名称'>
              <el-input v-model='formData.name'></el-input>
            </el-form-item>
            <el-form-item label='注册时间'>
              <div class="block">
                <el-date-picker
                  v-model="formData.foundTime"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions">
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label='注册资金(￥万)'>
              <el-input-number v-model="formData.foundFund" :min="1" :step="10"></el-input-number>
            </el-form-item>
            <el-form-item label='员工规模'>
              <el-select v-model="formData.peopleNumber" placeholder="请选择">
                <el-option
                  v-for="item in peopleArr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label='融资阶段'>
              <el-select v-model="formData.financingStage" placeholder="请选择">
                <el-option
                  v-for="item in financingStageArr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label='是否上市'>
              <el-radio class="radio" v-model="formData.isListed" label="是">已上市</el-radio>
              <el-radio class="radio" v-model="formData.isListed" label="否">未上市</el-radio>
            </el-form-item>
            <el-form-item label="选择地区">
              <el-select size="small" style="width: 100px"
                         v-model="formData.siteProv"
                         placeholder="请选择省份"
                         v-on:change="getProv($event)">
                <el-option
                  v-for="item in provs"
                  :label="item.label"
                  :value="item.value"
                  :key='item.value'>
                </el-option>
              </el-select>
              <el-select size="small" style="width: 100px"
                         v-if="formData.siteProv!=''"
                         v-model="formData.siteCity"
                         placeholder="请选择城市"
                         v-on:change="getCity($event)">
                <el-option
                  v-for="item in citys"
                  :label="item.label"
                  :value="item.value"
                  :key='item.value'>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label='企业口号'>
              <el-input
                type="textarea"
                :rows="2"
                placeholder="企业口号或者理念文化"
                v-model="formData.culture">
              </el-input>
            </el-form-item>
            <el-form-item label='企业介绍'>
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="formData.intro">
              </el-input>
            </el-form-item>
          </el-form>
          <div @click="submit" class="submit">提交</div>
        </div>
      </div>
      <div class="right">

        <division>视频上传</division>
        <el-upload
          class="upload-video"
          :action=url_videoload
          :on-success="videoloadSuccess"
          :data='params'>
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <division>详细地址</division>
        <el-input v-model='formData.address' @change='InputAddress'>
          <template slot="prepend">地址</template>
        </el-input>
        <hr/>
        <p></p>
        <div class="map-wrap">
          <label>地区：<input v-model="location"></label>
          <label>关键词：<input v-model="keyword"></label>
          <baidu-map class="bm-view" center="formData.point" :zoom="15">
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
      </div>
    </div>
    <head-img-load target="company" v-if='loadVis' @offLoadImg="onImgLoad"></head-img-load>
  </div>
</template>

<script>
  //	import {BaiduMap,BmMarker,BmView,BmLocalSearch,BmAutoComplete } from 'vue-baidu-map'
  //	import BaiduMap from 'vue-baidu-map'


  import division from "../../../base/division/division.vue";
  import headImgLoad from '../../../base/headImgLoad/headImgLoad';
  import {mapGetters} from 'vuex';
  import {allCity} from '../../../common/params/allCity';
  import {provs} from '../../../common/params/provs';
  import {companyFormSubmit} from '../../../api/companyFormSubmit';
  import {url_videoload} from "../../../api/config"
  import {throttle} from '../../../common/js/throttle'
  export default {
    components: {
      headImgLoad,
      division
    },

    data() {
      return {
        url_videoload: url_videoload,
        provs: provs,
        formData:{
          name:"",
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
        pickerOptions: {
          shortcuts: [{
            text: '一年前',
            onClick(picker) {
              picker.$emit('pick', new Date() - 3600 * 1000 * 24 * 365);
            }
          }, {
            text: '两年前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 365 * 2);
              picker.$emit('pick', date);
            }
          }, {
            text: '五年前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 365 * 5);
              picker.$emit('pick', date);
            }
          }]
        },
        financingStageArr: [{
          value: '不需要融资',
          label: "不需要融资"
        }, {
          value: '种子轮',
          label: "种子轮"
        }, {
          value: '天使轮',
          label: "天使轮"
        }, {
          value: 'A轮',
          label: "A轮"
        }, {
          value: 'B轮',
          label: "B轮"
        },
          {
            value: 'C轮',
            label: "C轮"
          },
          {
            value: 'D轮',
            label: "D轮"
          }
        ],
        peopleArr: [{
          value: '50人以下',
          label: "50人以下"
        }, {
          value: '50人-200人',
          label: "50人-200人"
        }, {
          value: '200人-1000人',
          label: "200人-1000人"
        }, {
          value: '1000人-5000人',
          label: "1000人-5000人"
        }, {
          value: '5000-10000人',
          label: "5000-10000人"
        },
          {
            value: '10000人以上',
            label: "10000人以上"
          }
        ],
        citys: [],
        selectProv: "",
        loadVis: false,
        funcInput: null
      }
    },
    computed: {
      params() {
        return {
          uid: this.loginUserInfo.uid,
          type: this.loginUserInfo.type
        }
      },
      ...mapGetters([
        'loginUserInfo'
      ])
    },
    methods: {
      videoloadSuccess(response, file, fileList) {
        console.log(res)
        console.log(file)
        console.log(fileList)
      },
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

      //手动输入文字搜索
      searchSite(option) {
        this.formData.address = option.address;
        this.formData.point = option.point;
      }
      ,
      dragMark(option) {
//        this.$store.store.commit("setPoint", option.point)
      }
      ,
      submit() {
        let payload = {
          data: this.formData,
          uid: this.loginUserInfo.uid,
          type: this.loginUserInfo.type
        };
        companyFormSubmit(payload).then((res) => {
          if (res.result == OK) {
            this.$notify.success({
              title: '恭喜',
              message: "公司资料上传成功"
            })
          }
        })
      },
      //显示关闭图片上传模块
      onImgLoad(flag) {
          this.loadVis = flag;
      }
      ,
      //手动修改地址
      InputAddress(value) {
        //调用节流函数
        this.formData.address = value
//        if(this.funcInput) {
//          this.funcInput()
//        }else{
//          this.funcInput = throttle(function () {
//            this.formData.address = value;
//            console.log(this.formData.address)
//          }.bind(this))
//          this.funcInput()
//        }
      }
      ,
      /*二级联动选择地区*/
      getProv: function (prov) {
        let tempCity = [];
        this.citys = [];
        this.selectCity = '';

        for (let val of allCity) {
          if (prov == val.prov) {
            console.log(val);
            tempCity.push({label: val.label, value: val.label})
          }
        }
        this.citys = tempCity;
      }
      ,
      getCity: function (city) {
        console.log(city);
        console.log(this.selectCity)
      }
    }
  }
</script>

<style lang="scss" rel='stylesheet/scss' scoped>
  .tangram-suggestion-main {
    z-index: 100;
  }

  $siderWidth: 500px;
  .header {
    height: 100px;
    background: url(../../../common/image/bg.jpg) no-repeat;
    -webkit-background-size: cover;
    background-size: cover;
  }

  .c-mainbody {
    position: relative;
    padding-top: 1px;
    .sider {
      width: $siderWidth;
      height: 800px;
      /*background: url(../../static/img/bgshu3.jpg) no-repeat;*/
      padding-top: 1px;
      float: left;
      & .headImg {
        width: 120px;
        height: 120px;
        position: absolute;
        margin: -60px 0 0 calc((500px - 120px) / 2);
        span {
          text-align: center;
          position: absolute;
          width: 120px;
          height: 120px;
          left: 0;
          top: 0;
          border-radius: 50%;
          background-color: rgba(222, 222, 222, .7);
          opacity: 0;
          cursor: pointer;
          transition: all .3s;
          .icon {
            margin: calc((120px - 58px) / 2);
            display: inline-block;
            vertical-align: text-bottom
          }

        }
        span:hover {
          opacity: 1;
        }
        span:after{
          text-align: center;
          line-height: 110px;
          content: '上传头像';
        }
      }
      & img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        box-shadow: 0 0 0 8px rgba(245, 245, 245, .6);
      }
      .input-area {
        padding-left: 5%;
        width: 85%;
        margin-top: 100px;
      }

    }
  }

  .right {
    overflow: hidden;
    margin-right: 30px;
  }

  .map-wrap {
    position: relative;
  }

  .bm-view {
    width: 100%;
    height: 300px;
    display: inline-block;
  }

  .submit {
    width: 100%;
    height: 50px;
    text-align: center;
    background-color: #0F838B;
    border-radius: 1000px;
    color: #fff;
    line-height: 50px;
    cursor: pointer;
    transition: all .5s;
    margin-top: 130px;
    &:hover {
      background-color: #01939D;
    }
  }
</style>
