<template>
  <div id="app">
    <headertop></headertop>
    <tap></tap>
   <router-view></router-view>
  </div>
</template>

<script>
import tap from './components/tap/tap'
import headertop from './components/header/headertop'
export default {
  name: "App",
  components: {tap,headertop}
};
</script>

<style lang="less" scoped>


</style>
