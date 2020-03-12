<template>
  <div class="headertop">
    <span>Gsan Music</span>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
@import "../../style/index.less";
.headertop {
  height: 44px;
  text-align: center;
  background: @backcolor;
  span {
    display: inline-block;
    vertical-align: top;
    line-height: 44px;
    color: @colorA;
    font-size: @fs-m;
  }
}
</style>