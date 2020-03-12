<template>
  <div class="progress">
    <div class="playerStrip">
      <span class="start">{{starttime|handletime}}</span>
      <!-- <div class="wrapper"></div> -->
      <div class="strip" ref="strip" @click="clickprogress">
        <span class="stripmove" ref="stripmove"></span>
        <p ref="move" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd"></p>
      </div>
      <span class="end">{{endtime|handletime}}</span>
    </div>
  </div>
</template>
<script>
export default {
  //

  props: {
    starttime: { type: Number, default: 0 },
    endtime: { type: Number, default: 0 }
  },
  filters: {
    handletime(data) {
      let time = parseInt(data);
      let m = parseInt(time / 60);
      let s = time % 60;
      s = s <= 9 ? `0${s}` : s;
      return m + ":" + s;
    }
  },
  methods: {
    jump(precent) {
      let time = (precent * this.endtime) / 100;
      this.$emit("seekFa", time);
    },
    clickprogress(e) {
      let x = e.pageX;
      let left = this.$refs.strip.getBoundingClientRect().left;
      let precent = ((x - left) / this.$refs.strip.clientWidth) * 100;
      // this.$refs.stripmove.style.width = precent + "%";
      // this.$refs.move.style.left = precent + "%";
      this.stylestrip(precent);
      this.jump(precent);
    },
    touchStart(e) {
      let tx = e.targetTouches[0].pageX;
    },
    // 封装进度条样式
    stylestrip(precent) {
      this.$refs.stripmove.style.width = precent + "%";
      this.$refs.move.style.left = precent + "%";
    },
    touchMove(e) {
      let movex = e.targetTouches[0].pageX;
      let left = this.$refs.strip.getBoundingClientRect().left;
      // let tleft = this.$refs.move.getBoundingClientRect().left;
      let distance = movex - left;
      let precent = (distance / this.$refs.strip.clientWidth) * 100;
      this.stylestrip(precent);
      // this.$refs.stripmove.style.width = precent + "%";
      // this.$refs.move.style.left = precent + "%";
      this.jump(precent);
    },
    touchEnd(movex) {}
  },
  watch: {
    starttime(newValue, oldValue) {
      let precent = (newValue / this.endtime) * 100;
      this.stylestrip(precent);
      // this.$refs.stripmove.style.width = precent + "%";
      // this.$refs.move.style.left = precent + "%";
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../style/index.less";
.playerStrip {
  display: flex;
  background: chocolate;
  margin: 150px 15px 10px 15px;
  height: 20px;
  align-items: center;
  // line-height: 20px;
  .strip {
    .w(200);
    height: 3px;
    margin: 0 4px;
    background: @backcolor2;
    position: relative;
    .stripmove {
      display: inline-block;
      .w(30);
      height: 100%;
      background: @colorA;
      position: absolute;
      top: 0;
      left: 0;
    }
    p {
      width: 10px;
      height: 10px;
      background: @colorA;
      border: 1px solid @colorW;
      border-radius: 50%;
      position: absolute;
      top: -5px;
      right: -5px;
    }
  }
}
</style>