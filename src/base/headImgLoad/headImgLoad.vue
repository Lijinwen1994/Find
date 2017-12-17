<template>
  <my-upload field="headImg"
             @crop-success="cropSuccess"
             @crop-upload-success="cropUploadSuccess"
             @crop-upload-fail="cropUploadFail"
             :value=true
             :width="300"
             :height="300"
             :url=url
             :params="params"
             img-format="png"
             @input='offLoadImg'></my-upload>
</template>

<script>
  import {url_headload} from "../../api/config"
  import myUpload from 'vue-image-crop-upload/upload-2.vue';
  import {mapGetters} from 'vuex'
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
//      loadVis() {
//        if(this.target == "personal"){
////          return this.$store.store.state.resume.loadVisible
//        }else{
////          return this.$store.store.state.company.loadVisible
//        }
//      },
      ...mapGetters([
        'loginUserInfo'
      ])
    },
    methods: {
      cropSuccess(imgDataUrl,field) {

      },
      cropUploadSuccess(headImgUrl, field) {
        if(this.target == "personal"){
          this.$store.store.commit("setHeadImg", headImgUrl)
        }else{
          this.$store.store.commit("setHeadImgCom", headImgUrl)
        }

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
