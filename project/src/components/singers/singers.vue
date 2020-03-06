<template>
<!-- <div>fdfd</div> -->
  <div class="singers">
    <div class="wrapper" ref="wrapper">
      <div class="content">
        <div class="singer-list" v-for="(item,index) in singers" :key="index" :ref="item.Findex">
          <p>{{item.Findex}}</p>
          <ul>
            <li v-for="(item,index) in item.list" :key="index"
            @click='godetail()'
            >
              <span>
                <img :src="item.author" alt />
              </span>
              <span>{{item.Fsinger_name}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="singer-right">
      <ul @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
        <li
          v-for="(item,index) in quicklist"
          :key="index"
          :class="{'active':activeIndex==item}"
          @click="changeactive(item)"
        >{{item}}</li>
      </ul>
    </div>
    <transition
    center-active-class='animated slideInLeft'
    leave-active-class='animated slideOutLeft'
    >
    <router-view></router-view>
    </transition>>
  </div>
</template>
<script>
// import jsonp from 'jsonp'
import { getsingerdata } from "../../api/api";
import { dealdata } from "./singer.js";
import BS from "better-scroll";
export default {
  data() {
    return {
      singers: "",
      activeIndex: "hot"
    };
  },
  computed: {
    quicklist() {
       let result = this.singers.map((item)=>{
        return item.Findex
      })
      return result  
    }
  },
  methods: {
    //  跳到详情页
    godetail(){
      console.log('跳到详情页')  
      this.$router.push('singers/detail')
      console.log(this.$route);
      
    },
    //页面滚动
    initbs() {
      this.Bs = new BS(this.$refs.wrapper, { probeType: 3 ,click:true});
      // console.log(this.$refs);
      // 获取距离数组
      let distance = [];
      for (const key in this.$refs) {
        if (key !== "wrapper") {
          let { offsetTop } = this.$refs[key][0];
          distance.push(offsetTop);
        }
      }
      //  console.log(distance);
      // 监听滚动,根据字母高度距离下标和字母下标一致来得到滚动到哪个字母
      this.Bs.on("scroll", pos => {
        let y = Math.abs(pos.y);
        // console.log(y);
        for (let i = 0; i < distance.length; i++) {
          if (y >= distance[i] && y < distance[i + 1]) {
            this.activeIndex = this.quicklist[i];
          } else if (y >= distance[distance.length - 1]) {
            this.activeIndex = this.quicklist[distance.length - 1];
          }
        }
      });
    },
    changeactive(item) {
      // console.log(index);
      let dom = this.$refs[item][0];
      // console.log(dom);
      this.Bs.scrollToElement(dom);
    },
    //按下
    touchstart(e) {
      let y = e.targetTouches[0].pageY;
      this.touch.y = y;
    },
    // 滑动
    touchmove(e) {
      let y = e.targetTouches[0].pageY;
      // console.log(y);
      // 滑动的距离
      let movey = y - this.touch.y;
      // 按下字母下标
      let starcount = parseInt((this.touch.y - 160) / 17);
      // 滑动了几个字母距离
      let count = starcount + parseInt(movey / 17);
      // console.log(count);
      let item = this.quicklist[count];
      this.changeactive(item);
    },
    // 抬起
    touchend(e) {},
    // 跳到详情页
    
  },
  created() { 
    this.touch = { y: 0 };
    getsingerdata().then(res => {
      let data = res.data.list;
     
      this.singers = dealdata(data);
       console.log(this.singers)
      this.$nextTick(() => {
        // console.log("滚动");
        this.initbs();
      });
    });
  }
};
</script>
<style lang="less" scoped>
@import "../../style/index.less";
.wrapper {
  position: fixed;
  top: 88px;
  left: 0;
  right: 0;
  bottom: 0;
  // z-index: 2;
  overflow: hidden;
  .content {
    
    .singer-list {
      p {
        background: rgba(0, 0, 0, 0.2);
      }
      ul {
        padding: 0 30px;
        li {
          padding: 10px 0;
          span:nth-of-type(1) {
            padding-right: 10px;
            img {
              border-radius: 50%;
              .w(60);
              .h(60);
            }
          }
        }
      }
    }
  }
}
.singer-right {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 160px;
  right: 0;
  // z-index: 2;
  ul {
    li {
      text-align: center;
      padding: 1px 0;
      height: 15px;
      font-size: @fs-xs;
    }
    .active {
      color: @colorA;
    }
  }
}
</style>