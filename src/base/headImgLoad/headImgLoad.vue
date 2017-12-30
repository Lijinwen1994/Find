<template>
  <my-upload field="headImg"
             @crop-upload-success="uploadSuccess"
             @crop-upload-fail="cropUploadFail"

             :width="100"
             :height="100"
             :url=url
             :params="params"
             @input='offLoadImg'></my-upload>
</template>

<script>
  import {url_headload} from "../../api/config"
  import myUpload from 'vue-image-crop-upload/upload-2.vue';
  import {mapGetters} from 'vuex'
  import {bus} from '../../common/js/bus'

  export default {
    data() {
      return {
        url: url_headload
      }
    },
    props: {
      //服务的组件，personal是个人简历，company是公司简历
      target: {
        type: String,
        required: true
      }
    },
    computed: {
      //上传图片时的参数
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
      uploadSuccess(res) {
//        if(this.target == "personal"){
//
//        }else{
//          this.$store.store.commit("setHeadImgCom", headImgUrl)
//        }
        bus.$emit('uploadSuccess', res)
        console.log('上传成功')
        console.log(res)

      },
      cropUploadFail(status, field) {
        if(this.target == "personal") {

        }else{

        }
        this.$notify.error({
          title: '上传失败',
          message: `上传失败,失败信息:${status}:${field}`
        });
      },
      offLoadImg() {
        this.$emit('offLoadImg', false)
//        if(this.target == "personal") {
//          this.$store.store.commit("loadVis",false)
//        }else{
//          this.$store.store.commit("loadVisCom",false)
//        }

      }
    },
    watch: {
      vis:function (news) {
        console.log(news)
      }
    },
    components: {
      myUpload
    }

  }
</script>

<style>
</style>
