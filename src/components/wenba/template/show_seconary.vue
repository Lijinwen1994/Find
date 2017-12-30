<template>
  <ul>
    <!--显示二级评论的组件-->
    <li class="fix" v-for="(item, index) in data">
      <div>
        <span class="avatar f_left">
          <img :src="item.userAvatar" alt="头像">
        </span>
        <div class="user_comment f_left">
          <p class="userinfo">{{item.userName}}  <time>{{item.time}}</time></p>
          <p class="user_c_content">{{item.c_content}}</p>
        </div>
        <aside class="f_right">
          <i>{{index + 1}}楼</i>
          <a href="javascript:;" class="reply" @click="onClickReply(item, index)">回复</a>
          <em class="line"></em>
          <zan-icon :number="item.c_zanNum" @onclick="onClickZan(item, index)"></zan-icon>
        </aside>
      </div>
      <input-reply
        :hasImg="false"
        v-if="inputVisIndex == index"
        ref="inputReply"
        @onSubmit="setReceiceInputValue"
        @standbySubmit="onSubmit(item)"
        :loadingFlag="loadingFlag"
      >
      </input-reply>
    </li>
  </ul>
</template>

<script>
  import ZanIcon from '../common/zanIcon.vue'
  import InputReply from '../common/inputMin.vue'
  import {addClass} from '../../../common/js/dom'
  import {sendSecondaryReply, sendOnZan} from "../../../api/question"
  import {mapGetters, mapMutations} from 'vuex';
  import {SET_REPLY_DATA} from "../../../store/mutations-types"
  export default {
    components: {
      ZanIcon,
      InputReply
    },
    props: {
      data: {}
    },
    mounted() {
      this.$on('onSubmit',function (e) {
        console.log(e)
      })
    },
    data() {
      return {
        inputVisIndex: -1,
        receiceInputValue: '',
        loadingFlag: false,
        zanClickFlag: false,
      }
    },
    computed: {
      ...mapGetters([
        'loginUserInfo'
      ])
    },
    methods: {
      //用于设置replyInput 组件回传的input值，
      setReceiceInputValue(inputValue) {
        this.receiceInputValue = inputValue;
      },
      //监听replyInput 组件的按钮点击事件，用户发送http请求到后台。 [根据二级评论回复二级评论]
      onSubmit(data) {
        console.log(data)
        this.loadingFlag = true;
        let {RID,UID,RIDForeignKey} = data;
        console.log(RID)
        let params = {
          RID:RIDForeignKey,
          'UIDOfReply': UID,
          operaUID: this.loginUserInfo.uid,
          content: this.receiceInputValue
        }
        sendSecondaryReply(params).then((res)=>{
          this.setReplyData(res.data)
          this.loadingFlag = false;
          this.inputVisIndex = -1;
          this.$message({
            type: 'success',
            message: '发送成功'
          })
        })
      },

      //点击赞图标，用于更新赞数量以及显示动画
      onClickZan(params) {
        if (this.zanClickFlag) {
          return
        }
        let {c_zanNum, RID, TID, UIDOfReply} = params;
        console.log(params)
        console.log(c_zanNum);
        c_zanNum = parseInt(c_zanNum);
        params.c_zanNum = c_zanNum + 1;
        this.zanClickFlag = true;

        let sendParams = {
          RID,
          TID,
          UIDOfReply,
          operaUID: this.loginUserInfo.uid,
          c_type: 'second'
        };
        sendOnZan(sendParams);
      },
      //点击 回复 按钮, 用于显示输入框组件，显示输入框回复xxx
      onClickReply(data, index) {
        this.inputVisIndex = index;
        let {userName} = data;
        this.$nextTick(() => {
          this.$refs.inputReply[0].$el.querySelector('input').value = `回复 ${index+1} 楼: `;
          this.$refs.inputReply[0].inputValue  = `回复 ${index+1} 楼: `;
        })
      },
      ...mapMutations({
        'setReplyData': SET_REPLY_DATA
      })
    }
  }
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
  @import "../../../common/scss/variable";
  @import "../../../common/scss/common";
  @import "../../../common/scss/ui";
  a {
    text-decoration: none;
  }

  ul {
    border-top: 1px solid $color-grey-d;

    li {
      .avatar {
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-top: 20px;
        }
      }
      .user_comment {
        margin-left: 30px;
        display: inline-block;
        vertical-align: middle;

        .userinfo{
          font-size: $font-normal;
          time{
            font-size: $font-mini;
            color: $color-text-d;
            margin-left: 30px;
          }
        }
      }
      aside {
        display: inline-block;
        .reply{
          color: $color-text-d;
          padding:0 10px;
          &:hover{
            color: $color-theme;
          }
        }
        i {
          text-align: right;
          font-size: $font-normal;
          color: $color-text-d;
          margin: 1em 0;
          display: block;
        }
        a{
          display: inline-block;
        }
      }
    }
  }
</style>
