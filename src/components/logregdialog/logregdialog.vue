<template>
  <el-dialog
    title="欢迎来到Find"
    :visible=true
    size="tiny"
    :before-close="handleClose"
    custom-class='dialog-Class'>
    <div slot='title' class="title">欢迎来到find</div>
    <span slot="footer" class="dialog-footer">
	  	切换：
			<el-switch
        v-model="toggleFlag"
        on-color="#13ce66"
        off-color="#58B7FF"
        on-text='登录'
        off-text='注册'>
			</el-switch>
	  </span>
    <logreg-form :toggleValue='toggleFlag' @registerSuccess="toLogin"></logreg-form>
  </el-dialog>
</template>

<script>
  import logregForm from "./logregFrom.vue";

  export default{
    components:{
      logregForm
    },
//	props:{
//		dialogVisible: {
//			type: Boolean,
//			default: false
//		}
//	},
    computed: {
      dialogVisible() {
        return this.$store.store.state.baseModule.dialogVisible
      }
    },
    data() {
      return {
        toggleFlag: true
      }
    },
    methods: {
      toLogin() {
        this.toggleFlag = !this.toggleFlag;
      },
      handleClose() {
        this.$emit('close')
      }
    }
  }
</script>

<style rel='stylesheet/scss' lang='scss' scoped>

  .title{
    height: 40px;
    width: 90%;
    text-align: center;
    position: absolute;
    z-index: -1;
  }
  .dialog-Class{
    width:500px;
    transition: all .5s;
  }
  .el-dialog__body{
    height: 380px;
  }
</style>
