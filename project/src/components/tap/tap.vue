<template>
  <div id="tap">
    <router-link to="/recommand" active-class="active" tag="div">
      <span>推荐</span>
    </router-link>
    <router-link to="/singers" active-class="active" tag="div">
      <span>歌手</span>
      </router-link>
     <router-link to="/rank" active-class="active" tag="div">
      <span>排行</span>
      </router-link>
      <router-link to="/search" active-class="active" tag="div">
      <span>搜索</span>
      </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@import "../../style/index.less";
#tap {
  height: 44px;
  display: flex;
  background: red;
  justify-content: space-around;
  div {
    text-align: center;
    line-height: 44px;
    font-size: @fs-s;
    span {
      vertical-align: top;
    }
  }
  .active {
    color: @colorA;
    span {
      border-bottom: 2px solid @colorA;
      padding-bottom: 3px;
    }
  }
}
</style>
