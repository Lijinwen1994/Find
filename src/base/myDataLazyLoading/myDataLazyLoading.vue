<template>
  <div class="lazyContainer">
    <slot></slot>
    <div class="control">
      <div class="loading" v-if="!sw">
        <i class="el-icon-loading"></i><span>加载中..</span>
      </div>
      <div class="noDatas" v-if="noDatas">
        <i class="iconfont icon-meiyougengduo"></i>没有数据了
      </div>
      <div class="clickLoad" @click="_getData" v-if="loadIndex == loadNumber">
        <i class="iconfont icon-clickQuery"></i>点击加载更多内容
      </div>
    </div>
  </div>
</template>

<script>
  import {getData} from './api/getData'
  import {OK} from '../../common/js/config'

  export default {
    created() {
      this.$nextTick(() => {

        this._getData();
      })
    },
    mounted() {
      this.$nextTick(() => {
        this.onScroll();
      })

    },
    props: {
      //每次加载数量，默认为10
      loadNumber: {
        default: 10
      },
      //后台地址
      backendAddress: {
        required: true
      },
      dataMode: {
        default: 'all'
      }
    },

    data() {
      return {
        loadIndex: 0,
        //设置一个开关，避免重复加载
        sw: true,
        noDatas: false
      }
    },

    computed: {
      address() {
        return this.backendAddress
      }
    },
    methods: {
      //发送ajax请求的方法
      _getData() {
        this.sw = false;
        this.loadIndex += this.loadNumber;

        let param = {
          index: this.loadIndex,
          dataMode: this.dataMode
        }

        getData(this.address, param).then((res) => {
          this.sw = true;
          if (res.data.result == OK) {
            this.$emit("getDataSuccess", res.data.data)
          }
          else if (res.data.result == 2) {
            this.noDatas = true;
          }
        }).catch((err) => {
          this.$emit("getDataError", err)
        })
      },
      _calcHeight() {
        //可视区域高度+ 滚动高度 == 文档高度
        if (document.body.scrollTop + window.innerHeight >= document.body.offsetHeight - 20) {
          if (this.sw == true && !this.noDatas) {
            this._getData();

          }
        }
      },

      //给window绑定滚动事件。
      onScroll() {
        window.addEventListener('scroll', this._calcHeight, false)
      },

      //用于解绑window的滚动事件
      remove() {
        window.removeEventListener('scroll', this._calcHeight, false);
      }
    }
  }
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
  @import "../../common/scss/variable";

  div.lazyContainer {
    .control {
      text-align: center;
      & > div {
        cursor: pointer;
        height: 40px;
        line-height: 40px;
        background-color: $color-text;

      }
    }

  }
</style>
