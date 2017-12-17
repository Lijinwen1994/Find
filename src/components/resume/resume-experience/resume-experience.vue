<template>
  <div>

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
</template>

<script>
  import vueStar from 'vue-star'

  export default {
    components: {
      vueStar
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
        }
      }
    },
    computed: {
      formData() {
//        return this.$store.store.state.resume.formData;
      }
    },
    methods: {
      addEx() {
//        this.$store.store.commit('addEx')
      },
      cutEx(index) {
        setTimeout(() => {
//          this.$store.store.commit('cutEx', index)
        }, 400)

      }
    }
  }
</script>

<style rel='stylesheet/scss' lang='scss' scoped="">
  @import "../../../common/scss/variable";

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
