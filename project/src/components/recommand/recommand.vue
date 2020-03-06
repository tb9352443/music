<template>
  <div class="recommand">
    <div class="hotsong">热门歌单</div>
    <div class="wrapper" ref="wrapper">
      <div class="content">
        <p class="ranktitle">歌单推荐</p>
        <ul class="listsinger">
          <li v-for="(item,index) of list" :key="index">
            <div class="singerpic">
              <img v-lazy="item.imgurl" alt />
            </div>
            <div>
              <p>{{item.author}}</p>
              <p>{{item.dissname}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import BS from "better-scroll";
import jsonp from "jsonp";
import { getrecomandlist } from "../../api/api";
export default {
  data() {
    return {
      list: ""
    };
  },
  methods: {
    // 页面滚动
    initbs(){
      const wrapper = this.$refs.wrapper;
      new BS(wrapper,{})
    }
  },
  mounted() {
    // console.log("==");
    getrecomandlist().then(res => {
      // console.log(res);
      this.list = res.data.hotdiss.list;
    });
    this.initbs()
  }
};
</script>
<style lang="less" scoped>
@import "../../style/index.less";
.recommand {
  .hotsong {
    height: 30px;
    text-align: center;
    line-height: 30px;
  }
  .wrapper {
    position: fixed;
    top: 88px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    .content{
      .ranktitle {
      height: 20px;
      text-align: center;
      line-height: 30px;
    }
    .listsinger {
      // background: red;
      margin: 0 20px;
      li {
        display: flex;
        .singerpic {
          img {
            width: 60px;
            height: 60px;
          }
        }
      }
    }
    }
    
  }
}
</style>