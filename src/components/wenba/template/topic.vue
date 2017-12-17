<template>
  <section class="topic_profile">
    <div class="topic_detail_box">
      <div class="question_tags">
        <span class="f_right">{{data.views}}</span>
        <div class="question_tags">
          <template v-for="tag in data.tags">
            <el-button size="mini" round :data-tagValue="tag.tag_value" @click.native="onClickTag(tag)">{{tag.tag_name}}</el-button>
          </template>
        </div>
      </div>
    </div>
    <p class="question_title">{{data.title}}</p>
    <p class="question_desc">
     {{data.content}}
    </p>
    <div class="extra">
      <el-button type="success" plain>我要回答</el-button>
    </div>
  </section>
</template>

<script>
  export default {
    props: {
      data: {
        required: true
      }
    },
    data() {
      return {

      }
    },
    methods:{
      onClickTag(tag) {
        let {tag_value} = tag
        this.$router.push({path: `/wenba/questonlist/${tag_value}`})
      }
    }


  }
</script>

<style rel='stylesheet/scss' lang='scss'>
  @import "../../../common/scss/common";
  @import "../../../common/scss/ui";
  @import "../../../common/scss/variable";
  .topic_profile{
    padding: 30px;
    .topic_detail_box{
      .question_tags{
        &>span{
         color:$color-text-d;
        }
      }

    }
    .question_title{
      font-size: $font-large-xxxx;
    }
    .question_desc{
      font-size: $font-normal;
    }
    .extra{

    }
  }
</style>
