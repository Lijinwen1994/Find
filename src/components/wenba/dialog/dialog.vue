
<template>
  <!--由于父组件宽度被限制，这个模块放到了App.vue下引用-->
  <div class="container" v-if="dialogVis">
    <section id="question-layer">
      <form class="question_layer_dialog">
        <div class="question_layer_cons_top fix">
          <h2 class="f_left">话题</h2>
        </div>
        <div class="question_title">
          <input type="text" placeholder="对自己感兴趣的职位和公司发起提问" v-model="title" :maxlength="title_max_number">
          <div class="question_title_count">
            <span >{{titleLength}} / {{title_max_number}}</span>
          </div>

        </div>
        <div class="question_content">
            <textarea rows="8" class="question_text_input" placeholder="输入内容（选填）" v-model="contentValue"
                      :maxlength='title_max_number'>
            </textarea>
          <div class="question_content_count">
            <span>{{contentValueLength}}</span> / {{topicMax_length}}
          </div>
        </div>
        <div class="tag_container">
          <div class="tag_show_container">
            <div class="tags_show">
              <ul class="tags">
                <template v-for="(item, index) in selectedTags">
                  <li :value="item.tag_value">
                    {{item.tag_name}}
                    <i class="iconfont icon-guanbi" title="删除标签" @click="deleteTag(item, index)"></i>
                  </li>
                </template>
              </ul>
              <input class="tag_input" type="text"
                     placeholder="添加话题或所属公司"
                     v-model="tagInputValue"
                     @keyup.up="moveSugtag('up')"
                     @keyup.down="moveSugtag('down')"
                     @keyup.enter="onEnterInput"
              >
              <div class="tag_count f_right">
                <span>{{tagCounter}}</span> / {{tag_max_number}}
              </div>
            </div>

          </div>
          <div class="hot_tags">
            <span>热门话题</span>
            <ul ref="hotTag">
              <template v-for="(tag, index) in hotTags">
                <li class="f_left" :value="tag.tag_value" @click="clickHotTag(tag, index)" :key="tag.tag_value">
                  {{tag.tag_name}}
                </li>
              </template>
            </ul>
          </div>
          <div class="tag_suggestions" v-if="candidateTags.length">
            <ul>
              <template v-for="item in candidateTags">
                <li @click="onChoiseSugTag(item)">{{item.tag_name}}</li>
              </template>

            </ul>
          </div>
        </div>
        <div class="submit_container fix">
          <span class="error_msg f_left animated shake" v-if="VisErrorMsg">
             <el-alert
               title="标签最少为一个"
               type="error"
             >
          </el-alert>
          </span>

          <span>
            <el-button type="primary" class="f_right" :disabled="sumbitDisableFlag" @click="onsumbit"
                       :loading="submitLoading">提交</el-button>
          </span>
        </div>
      </form>

      <div class="dialog_close" @click="dialog_close"><i class="iconfont icon-guanbi"></i></div>
    </section>
  </div>
</template>

<script>
  import {addClass, removeClass} from '../../../common/js/dom';
  import {EQUAL, TOPIC_MAX_LENGTH, TAG_MAX_NUMBER, TOPIC_MIN_LENGTH, OK,NO_FINDED,TOPIC_TITLE_MAX_LENGTH} from '../../../common/js/config';
  import {getSearchTag, sendQuestion} from '../../../api/question';
  import "../../../common/assets/animate.css"
  import {mapGetters} from 'Vuex'
  import {bus} from '../../../common/js/bus';
	import _ from 'lodash';

  export default {
    created() {
      this.hasSeleTagIndex = [];
      this.topicMax_length = TOPIC_MAX_LENGTH;
      this.tag_max_number = TAG_MAX_NUMBER;
      this.title_max_number = TOPIC_TITLE_MAX_LENGTH;
      this.inputIndexMoveFlag = false;
      bus.$on('topicDialogVis',order =>  {
        if(order == 'OPEN' ){
          this.dialogVis = true;
        }else if(order == 'CLOSE') {
          this.dialogVis = false;
        }
      })
    },
    data() {
      return {
        dialogVis: false,
        //已选中
        selectedTags: [],
        tagCounter: 0,
        title: '',
        titleLength: 0,
        contentValue: '',
        contentValueLength: 0,
        sumbitDisableFlag: true,
        hotTags: [
          {
            tag_name: '薪水福利',
            tag_value: '1'
          },
          {
            tag_name: '面试笔试',
            tag_value: '2'
          },
          {
            tag_name: '环境氛围',
            tag_value: '3'
          },
          {
            tag_name: '工作压力',
            tag_value: '4'
          },
          {
            tag_name: '求职招聘',
            tag_value: '5'
          },
          {
            tag_name: '其他',
            tag_value: '6'
          }
        ],
        tagInputValue: '',
        candidateTags: [],
        nowTagIndex: 0,
        VisErrorMsg: false,
        submitLoading: false

      }
    },
    watch: {
      title(newTitle) {
        this.titleLength = newTitle.length;
        this.sumbitDisableFlag = this.titleLength >= 1 ? false : true;
      },
      //监听内容变量，用于监听输入字数。并且解禁提交按钮
      contentValue(newValue) {
        this.contentValueLength = newValue.length;

      },
      //用于用户搜索标签时，请求标签。
      tagInputValue(newValue) {
        if (newValue == '') return;
        if (this.inputIndexMoveFlag) return;
        this.getTags();
      },
    },
    computed: {
      ...mapGetters([
        'loginUserInfo'
      ])
    },
    methods: {
      //loadsh的函数防抖，
      getTags:_.debounce(
        function () {
          getSearchTag(encodeURI(this.tagInputValue)).then((res) => {
            if (res.result == OK) {
              this.candidateTags = res.data;
            } else if(res.result == NO_FINDED) {
              return;
            }
          })
        },500
      ),
      //点击提交，用户向后台提交数据。
      onsumbit() {
        if (this.selectedTags.length == 0) {
          this.VisErrorMsg = true;
          retrun;
        } else {
          this.VisErrorMsg = false;
        }

        let tagValues = [];
        this.selectedTags.forEach(function (tagItem) {
          tagValues.push(tagItem.tag_value);
        })
        let params = {
          userUid: this.loginUserInfo.uid,
          tagValues: tagValues,
          title: this.title,
          content: this.contentValue
        }
        this.submitLoading = true;
        sendQuestion(params).then((res) => {
          this.submitLoading = false;
          if(res.result == OK) {
            this.$message({
              message: '发送成功',
              type: 'success'
            })
          }
        }).catch((err)=> {
          this.$message({
            message: err,
            type: 'error'
          })
        })

      },
      dialog_close() {
        this.dialogVis = false;
      },


      moveSugtag(direction) {
        if (!this.candidateTags.length) return;
        let len = this.candidateTags.length;
        this.inputIndexMoveFlag = true;
        //按上方向键，索引减
        if (direction == 'up') {
          if (this.nowTagIndex < 1) return;
          this.nowTagIndex--;
          this.tagInputValue = this.candidateTags[this.nowTagIndex].tag_name;
        }
        //按下方向键，索引增加
        else if (direction == 'down') {
          if (this.nowTagIndex > len - 2) return;
          this.nowTagIndex++;
          this.tagInputValue = this.candidateTags[this.nowTagIndex].tag_name;
        }
      },
      //按下tag输入input回车的逻辑处理
      onEnterInput() {
        if (!this.candidateTags.length) return;
        //判断用户是否上下选择过候选词，如没有移动过，则结束。
        if (!this.inputIndexMoveFlag) return;
        if (this.selectedTags.length == TAG_MAX_NUMBER){
          this.$message('最多选择3个标签');
          this.recover();
          return;
        };
        for (let i = 0, len = this.candidateTags.length; i < len; i++) {
          if (this.candidateTags[i].tag_name.localeCompare(this.tagInputValue) == EQUAL) {
            this.addTag(this.candidateTags[i]);
            this.recover();
            break;
          }
        }
      },
      //点击建议标签列表
      onChoiseSugTag(sugTag) {
        if (this.selectedTags.length == TAG_MAX_NUMBER){
          this.$message('最多选择3个标签');
          this.recover();
          return;
        };
        this.addTag(sugTag);
        this.tagInputValue = '';
        this.$nextTick(() => {
          this.candidateTags.splice(0, this.candidateTags.length);
        })
      },
      recover() {
      	//清空候选标签
        this.candidateTags = {};
        //清空当前input的值
        this.tagInputValue = '';

        this.inputIndexMoveFlag = false;
        //重置索引
        this.nowTagIndex = 0;
      },
      //点击热门标签
      clickHotTag(tag, index) {
        if (this._validation(tag, index + 1)) {
          return;
        }
        ;
        this.addTag(tag);
        let tagsEle = this.$refs.hotTag;
        addClass(tagsEle.getElementsByTagName('li')[index], 'disable')
      },
      addTag(tag) {
        this.selectedTags.push(tag);
        this.tagCounter++;
        this.recover();
      },
      //校验
      _validation(tag, index) {
        if (this.checkHotTagIsSelected(index)) {
          return true;
        }
        if (this.selectedTags.length == TAG_MAX_NUMBER) {
          return true;
        }
      },
      //检查热门话题是否被选中，否则添加进hasSeleTagIndex数组中
      checkHotTagIsSelected(index) {
        if (this.hasSeleTagIndex.includes(index)) {
          return true
        } else {
          this.hasSeleTagIndex.push(index)
        }
      },
      //检查删除的标签是否是热门标签
      checkDeleteISHotTag(deleteTag) {
        //返回Promise，resolve结果
        return new Promise((resolve) => {
          this.hotTags.forEach((item, index) => {
            if (item.tag_value === deleteTag.tag_value && deleteTag.tag_name.localeCompare(item.tag_name) === EQUAL) {
              //返回是对应的index
              return resolve(index);
            }
          })
        });
      },
      deleteTag(tag, index) {
        this.checkDeleteISHotTag(tag).then(index => {
          removeClass(this.$refs.hotTag.getElementsByTagName('li')[index], 'disable');
          let deleteIndex = this.hasSeleTagIndex.findIndex(function (value) {
            //符合条件时，会返回对应的index
            return value == tag.tag_value;
          })
          this.hasSeleTagIndex.splice(deleteIndex, 1);
        });

        this.selectedTags.splice(index, 1);
        this.tagCounter--;
      },
    }
  }
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
  @import "../../../common/scss/variable";
  @import "../../../common/scss/common";
  @import "../../../common/scss/ui";


  .container {
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba(10, 10, 10, 0.4);

    #question-layer {
      width: 760px;
      background-color: #fff;
      margin: auto;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -60%);
      .question_layer_dialog {
        & > div:not(:last-child) {
          margin: 20px 0;
        }
        padding: 30px 40px 30px;
        .question_layer_cons_top {
          h2 {
            padding: 0;
            margin: 0;
            font-size: $font-large;
            font-weight: normal;
          }
        }
        .question_title{
          position: relative;
          input{
            border: none;
            @include inputStyle;
            height:40px;
            text-indent: 5px;
          }
          .question_title_count{
            color: $color-text-d;
            position: absolute;
            right:10px;
            top:15px;
            user-select: none;
          }
        }
        .question_content {
          position: relative;

          .question_text_input {
            padding: 5px;
            box-sizing: border-box;
            @include inputStyle;
            &:focus {
              outline: 1px solid $color-theme;
            }
          }
          .question_content_count {
            position: absolute;
            bottom: 10px;
            right: 10px;
            color: $color-text-d;
            user-select: none;
          }
        }
        .tag_container {
          position: relative;
          .tag_show_container {

            .tags_show {
              width: 100%;
              border: 1px solid $color-grey-d;
              height: 35px;
              .tags {
                margin: 0px;
                display: inline-block;
                li {
                  display: inline-block;
                  margin: 5px;
                  padding: 3px 10px 3px 5px;
                  background-color: $color-grey-d;
                  i {
                    cursor: pointer;
                  }
                }
              }
              .tag_input {
                border: none;
                outline: none;
                margin: {
                  top: 12px;
                  left: 10px;
                }

              }
              .tag_count {
                display: inline-block;
                line-height: 35px;
                color: $color-text-black;
                padding: {
                  right: 10px;
                }
                span {
                  color: $color-green;
                }
              }
            }
          }
          .hot_tags {
            ul {
              display: inline-block;
              vertical-align: middle;
              li {
                margin-left: 30px;
                cursor: pointer;
                color: $color-green;
              }
              .disable {
                color: #cccccc;
              }
            }
          }
          .tag_suggestions {
            width: 100%;
            max-height: 300px;
            overflow: auto;
            position: absolute;
            background-color: #fff;
            border: 1px solid $color-grey-d;
            top: 30px;
            z-index: 10;
            ul {
              li {
                padding: 10px;
                &:hover {
                  cursor: pointer;
                  background-color: $color-grey-d;
                }
              }
            }
          }
        }

        .submit_container {
          .error_msg {
            display: inline-block;
            width: 200px;
          }
        }
      }
      .dialog_close {
        position: absolute;
        right: 0;
        top: 0;
        width: 40px;
        height: 40px;
        cursor: pointer;
        text-align: center;
        i {
          display: inline-block;
          font-size: 25px;
          width: 26px;
          height: 26px;
          padding: 0;
          margin: 0 auto;
          position: relative;
          top: 50%;
          transform: translateY(-50%);
        }
        &:hover {
          animation: iconRotate 0.5s;
        }
      }
    }

  }

  @keyframes iconRotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(90deg);
      transform-origin: 50% 50%;
    }
  }
</style>
