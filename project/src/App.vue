<template>
  <div id="app">
    <headertop></headertop>
    <tap></tap>
   <router-view></router-view>
   <!-- 播放器组件 -->
   <player></player>
  </div>
</template>

<script>
import player from './components/player/player'
import tap from './components/tap/tap'
import headertop from './components/header/headertop'
export default {
  name: "App",
  components: {tap,headertop,player}
};
</script>

<style lang="less" scoped>

</style>
