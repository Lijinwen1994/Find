<template>
    <div id="show" ref='show'>
  </div>

</template>

<script>

  //引入ckplayer.js文件
  import {CKobject} from '../../../static/ckplayer/ckplayer';
  export default{
    data() {
      return {
        //ckplayer参数配置
        params:{
          bgcolor:'red',
          allowFullScreen:true,
          allowScriptAccess:'always',
          wmode:'transparent'
        }
      }
    },
    computed: {
      flashvars() {
        //绑定地址，
        return {
          f:this.rtmp,
          c:0
        }
      }
    },
    props: {
      rtmp: {
        required: true
      },
      width: {
        default: "800"
      },
      height: {
        default: "800"
      }
    },
    methods: {
      handleClose() {
        this.$store.store.commit('toggleLiveDia', false)
      },
      play() {
        //传参并调用
        this.$nextTick(function() {
          CKobject.embedSWF(
            '../../../static/ckplayer/ckplayer.swf',
            this.$refs.show,
            'ckplayer_a1',
            this.width,
            this.height,
            this.flashvars,
            this.params
          )
        })
      }
    },
    mounted() {

      this.$nextTick(()=>{


      })

    }
  }
</script>

<style scoped>
  #show{
    display: flex;
    justify-content: center;

    margin: 0 auto;
  }
</style>
