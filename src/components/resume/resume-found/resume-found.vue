<template>
  <div class="page-container">
    <div class="resume-body">
      <div class="sider">
        <div class="headImg" @click='onImgLoad(true)'>
          <img :src='formData.headImg' alt="" />
          <span>
						<!--<icon name='upload' scale='7' class='icon'></icon>-->
					</span>
        </div>
        <div class="input-area">
          <el-form label-width='70px' :model='formData'>
            <el-form-item label='姓名'>
              <el-input v-model='formData.name'></el-input>
            </el-form-item>
            <el-form-item label='年龄'>
              <el-input v-model='formData.age'>
                <template slot="append">岁</template>
              </el-input>
            </el-form-item>
            <el-form-item label='学历'>
              <el-select v-model="formData.degree" placeholder="请选择" class='selectWidth'>
                <el-option
                  v-for="item in degreeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label='毕业学校'>
              <el-input  v-model='formData.school'></el-input>
            </el-form-item>
            <el-form-item label='工作意向'>
              <el-input placeholder='例如：安卓开发工程师'  v-model='formData.job'></el-input>
            </el-form-item>
            <el-form-item label='期望薪酬'>
              <el-input placeholder='例如： 8~12k'  v-model='formData.wantSaraly'>
                <template slot='append'>元</template>
              </el-input>
            </el-form-item>
            <el-form-item label='工作年限'>
              <el-input  v-model='formData.experienceYear'>
                <template slot='append'>年</template>
              </el-input>
            </el-form-item>

          </el-form>
          <div @click="submit" class="submit">提交</div>
        </div>
      </div>
      <div class="ex">
        <!--<h3>视频上传</h3>-->
        <!--<el-upload-->
          <!--class="upload-video"-->
          <!--action="./php/videoLoad.php"-->
          <!--:on-preview="handlePreview"-->
          <!--:on-remove="handleRemove"-->
          <!--:data='videoParam'>-->
          <!--<el-button size="small" type="primary">点击上传</el-button>-->
          <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
        <!--</el-upload>-->
        <div class="wrap">
          <el-form :model='formData' label-width='70px'>
            <h3 class='inline'>项目经历</h3>
            <vue-star animate='animated tada' color='#008b8b' @click.native='addEx' class='addIcon'>
              <i slot='icon' class="iconfont icon-zengjia"></i>
            </vue-star>

            <div class="panel" v-for='(item, index) in formData.projectEx'>
              <el-form-item label="活动时间">
                <el-col :span="11">
                  <el-date-picker type="date" placeholder="开始时间" v-model="item.timeStart"
                                  style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-date-picker type="date" placeholder="结束时间" v-model="item.timeEnd"
                                  style="width: 100%;"></el-date-picker>
                </el-col>
              </el-form-item>
              <el-form-item label='项目名称'>
                <el-input v-model='item.name'></el-input>
              </el-form-item>
              <el-form-item label='项目描述'>
                <el-input type=textarea  v-model='item.descride'></el-input>
              </el-form-item>

              <!--<span class=" iconfont icon-shanchu cutIcon" @click='cutEx(index)'></span>-->
              <!--<span class='cutIcon'>-->
              <vue-star animate='animated swing' color='#008B8B' class='cutIcon' @click.native='cutEx(index)' :key='index'>
                <i slot='icon' class="iconfont icon-shanchu"></i>
              </vue-star>
              <!--</span>-->

            </div>
          </el-form>
        </div>
      </div>
      <div v-if="ComFormData"></div>
    </div>

    <head-img-load
      v-if="loadVis"
      @offLoadImg="onImgLoad"
      target="personal">
    </head-img-load>
  </div>

</template>

<script>
  import experience from '../resume-experience/resume-experience.vue'
  import headImgLoad from '../../../base/headImgLoad/headImgLoad.vue'
  import vueStar from 'vue-star'
  import {mapGetters, mapMutations} from 'vuex'
  import {resumeSubmit} from '../../../api/resumeSubmit'
  import {bus} from '../../../common/js/bus'
  import {SET_RESUME_DATA} from '../../../store/mutations-types';
  import _ from 'lodash';


  export default{
    components: {
//      experience,
      headImgLoad,
      vueStar
    },
    mounted() {
      bus.$on('uploadSuccess', (res) =>{
        res.headImgUrl = res.headImgUrl.replace(/\\/g, '/');
        this.formData.headImg = res.headImgUrl
      })
    },
    data() {
      return {
        timeStar: '',
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '半年前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 185);
              picker.$emit('pick', date);
            }
          }, {
            text: '一年前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 365);
              picker.$emit('pick', date);
            }
          }, {
            text: '两年前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 365 * 2);
              picker.$emit('pick', date);
            }
          }]
        },
        formData: {},
        degreeList: [
          {
            value: '1',
            label: '初中'
          }, {
            value: '2',
            label: '高中'
          }, {
            value: '3',
            label: '大专'
          }, {
            value: '4',
            label: '本科'
          }, {
            value: '5',
            label: '研究生'
          },{
            value:'6',
            label: '博士'
          }
        ],
        w: 400,
        h:400,
        maxSize: 100,
        loadVis: false
      }
    },
    computed: {

      ComFormData() {
        this.formData = _.cloneDeep(this.resumeData);
      },
      videoParam() {
        return {url: this.loginUserInfo.uid}
      },
      getuid() {
        return this.loginUserInfo.uid
      },
      ...mapGetters([
        'loginUserInfo',
        'resumeData'
      ])
    },

    methods: {
      submit() {
        resumeSubmit({
          data:this.formData,
          uid: this.loginUserInfo.uid,
          type: this.loginUserInfo.type
        }).then((res) => {
          this.$notify.success({
            title: '恭喜',
            message:"简历上传成功"
          }).catch((e) => {
            this.$notify.warning({
              title: '出错',
              message: `出错信息${e}`
            })
          })
        })
//        let uid = this.$store.store.state.baseModule.uid,
//          type = this.$store.store.state.baseModule.type;
//        this.$store.store.dispatch('resumeSubmit',{"uid":uid,"type":type})
      },
      onImgLoad(flag) {
        this.loadVis = flag;
      },
      handlePreview() {

      },
      handleRemove() {

      },
      addEx() {

        this.formData.projectEx.push({
          timeStart: '',
          timeEnd: '',
          name: '',
          descride: ''
        })
      },
      cutEx(index) {
        this.formData.projectEx.splice(index, 1)
      },
      ...mapMutations({
        'setResumeData':SET_RESUME_DATA
      })
    }
  }
</script>

<style lang="scss" rel='stylesheet/scss' scoped>
  @import "../../../common/scss/variable";
  $siderWidth: 500px;
  .selectWidth{
    width: 100%;
  }

  .resume-body{
    position: relative;
    padding-top: 1px;
    .sider{
      width: $siderWidth;
      height: 800px;
      /*background: url(../../../common/image/bgshu3.jpg) no-repeat;*/
      padding-top: 1px;
      overflow: hidden;
      float: left;
      & .headImg{
        width: 120px;
        height: 120px;
        position: absolute;
        margin: -60px 0 0 calc((500px - 120px) / 2);
        span{
          text-align: center;
          position: absolute;
          width: 120px;
          height: 120px;
          left: 0;
          top: 0;
          border-radius: 50%;
          background-color: rgba(222,222,222,.7);
          opacity:0;
          cursor: pointer;
          transition: all .3s;
          .icon{
            margin: calc((120px - 58px ) / 2);
            display: inline-block;
            vertical-align: text-bottom
          }
        }
        span:hover{
          opacity: 1;
        }
      }
      & img {
        width: 120px;
        height: 120px;
        border-radius:50%;
        box-shadow: 0 0 0 8px rgba(245, 245, 245,.6);
      }
      .input-area{
        padding-left: 5%;
        width: 85%;
        margin-top:100px ;
      }

    }
  }
  .ex{
    overflow: hidden;
  }
  .upload-video{
    padding: 10px;
    border:1px solid #D9D9D9;
  }
  .submit{
    width: 100%;
    height: 50px;
    text-align: center;
    background-color: #0F838B;
    border-radius: 1000px;
    color: #fff;
    line-height: 50px;
    cursor:pointer;
    transition: all .5s;
    margin-top: 130px;
    &:hover{
      background-color: #01939D;
    }
  }

  .wrap {
    margin-top: 40px;
    overflow: hidden;
  }

  .panel {
    position: relative;
    border: 1px dotted #D3D4D6;
    width: 90%;
    padding: 10px;
    padding-bottom: 30px;
    & .cutIcon {
      position: absolute;
      right: -10px;
      bottom: -25px;
      opacity: 0;
      cursor: pointer;
      transition: all .3s;
      & .iconfont {
        font-size: 28px;
        color: $color-theme;
        &:hover {
          color: #66CDAA;
        }
      }
    }
    &:hover > .cutIcon {
      opacity: 1;
    }
  }

  .panel + .panel {
    border-top: none;
  }

  .addIcon {
    cursor: pointer;
    margin: {
      top: -77px;
      left: 40px;
    }
    & .iconfont {
      font-size: 30px;
      color: $color-theme;
    }
    &:hover {

    }
  }

  .line {
    text-align: center;
  }

  .inline {
    display: inline-block;
  }
</style>
