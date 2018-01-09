<template>
  <!--问吧，首页话题以及一级，二级评论挂载模板-->

  <section class="question-container">
    <ul class="topic_from" v-if="showFrom">
      话题来自:
      <template v-for = 'item in datas.tags'>
        <li :data-tag_value="item.tag_value">[{{item.tag_name}}]</li>
      </template>
    </ul>
    <h2 class="topicTitle">
      <a href="javascript:;" @click="onClickTitle(datas.TID)">{{datas.title}}</a>
      <div class="reply_number f_right">
        <!--<a href="javascript:;">{{datas.replyNum}}个回复</a>-->
      </div>
    </h2>

    <!--有回复模块-->
    <div v-if="datas.replyData.RID">
      <div class="public_userInfo fix">
        <dl>
          <dt>
            <span>

              <img :src="datas.replyData.userAvatar" alt="avatar">
            </span>
          </dt>
          <dd>
            <p>{{datas.replyData.userNameOfReply}}</p>
          </dd>
        </dl>
      </div>
      <article>
        {{datas.replyData.replyContent}}
      </article>
      <div class="user_handle_con">
        <time>
          {{datas.replyData.time}}
        </time>
        <div class="f_right">
          <!--互动icon组件 开始-->
          <comment-icon :number="datas.replyData.commentNum" @onclick="onClickCommentIcon(index)"></comment-icon>
          <em class="line"></em>
          <zan-icon :number="datas.replyData.c_zanNum" @onclick="onClickZan(datas)"></zan-icon>
          <!--评论icon组件 结束-->
        </div>
      </div>
      <!--二级评论组件 开始-->
      <comment v-if="clickCommentIndex == index" ref="ref_reply_comment" :params="params"></comment>
      <!--二级评论组件 结束-->
    </div>

    <!--无回复模块-->
    <div v-else>
      <a href="javascript:;" @click="onClickTitle(datas.TID)"><el-button>暂无回复，等你来回答</el-button></a>

    </div>
  </section>
</template>

<script>
  import commentIcon from '../common/commentIcon.vue'
  import zanIcon from '../common/zanIcon.vue'
  import {sendOnZan} from '../../../api/question'
  import Comment from '../base/c_secondary.vue';
  import {addClass} from '../../../common/js/dom';
  import {mapGetters, mapMutations} from 'vuex'
  import {SET_CLICK_COMMENT_INDEX} from '../../../store/mutations-types';


  export default {
    components: {
      zanIcon,
      commentIcon,
      Comment

    },
    props: {
      datas: {
        type: Object,
        required: true
      },
      index: {
        required: true
      },
      /* *
       * 是否显示话题对应标签
       * */
      showFrom: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        clickFlag: false,
        replyVis: false
      }
    },
    computed: {
      //传给点击回复后，弹出评论列表的参数。
      params() {
        let {RID, UIDOfReply} = this.datas.replyData;
        let {uid} = this.loginUserInfo;

        return Object.assign({},
          {
            RID,
            UIDOfReply
          },
          {
            "operaUID": uid
          }
        )
      },
      ...mapGetters([
          'loginUserInfo',
          'clickCommentIndex'
        ]
      )
    },
    methods: {

      //点击评论图标
      onClickCommentIcon(index) {
        this.setNowIndex(index);
        this.$nextTick(() => {
          addClass(this.$refs.ref_reply_comment.$el, 'animated fadeIn');
        })


      },

      //点击赞图标，用于更新赞数量以及显示动画
      onClickZan(params) {
        if (this.clickFlag) {
          return
        }
        console.log(params)
        let {TID} = params;
        let {c_zanNum, RID, UIDOfReply} = params.replyData;
        c_zanNum = parseInt(c_zanNum);
        params.replyData.c_zanNum = c_zanNum + 1;
        this.clickFlag = true;

        let sendParams = {
          RID,
          TID,
          UIDOfReply,
          operaUID: this.loginUserInfo.uid,
          c_type: 'first'
        };
        sendOnZan(sendParams);
      },
      onClickTitle(TID) {
        this.$router.replace("/");
        this.$router.push({
          path: `/wenba/${TID}`
        });
        console.log(TID)
      },
      ...mapMutations({
        setNowIndex: SET_CLICK_COMMENT_INDEX
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

  .question-container {
    background-color: #fff;
    padding: 10px;
    margin: 20px 10px;
    border-radius: 5px;
    .topic_from {
      color: $color-text-d;
      & li{
        display: inline-block;
        margin-right: 20px;
      }
    }
    .topicTitle {
      font-weight: 500;

      width: 100%;
      & > a {
        font-size: $font-large-xxxx;
        color: $color-purple;
      }
      .reply_number {

        display: inline-block;
        a {
          color: $color-text-d;
          font-size: $font-large;
        }
      }
    }
    .public_userInfo {

      dl {
        dt {
          span {
            float: left;
            img {
              display: inline-block;
              border-radius: 50%;
              width: 50px;
              height: 50px;
            }
          }
        }
        dd {
          margin-left: 70px;
          p {
            padding: 0;
            margin: 0;
          }

        }
      }
    }
    article {

    }
    .user_handle_con {
      padding: 20px 0;
      time {
        color: $color-text-d;
      }
      div {
        display: inline-block;
      }
    }
  }
</style>
