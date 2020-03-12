<template>
  <div class="player" v-if="songList.length">
    <div class="big" v-if="fullScreen">
      <div class="bg">
        <img :src="currentSong.singerimgurl" alt />
      </div>
      <div class="songname">
        <span @click="showSmall(false)">隐藏</span>
        <span>{{currentSong.songname}}</span>
      </div>
      <p class="singer">{{currentSong.singer[0].name}}</p>
      <div class="img">
        <img :class="cd" :src="currentSong.singerimgurl" alt />
      </div>
     
      <myprogress 
      :starttime="starttime"
      :endtime='endtime'
      @seekFa='seek'>
      </myprogress>
      <div @click="loopplay()">循环模式</div>
      <button @click="prev">上一曲</button>
      <button @click="songPlayer()">播放</button>
      <button @click="next">下一曲</button>
      <div class="audio">
        <audio
          ref="audio"
          @canplay="canplay"
          @ended="ended"
          @timeupdate="timeupdate"
          controls
          :src="currentSong.playerUrl"
        ></audio>
      </div>
    </div>
    <div class="small" v-else></div>
  </div>
</template>
<script>
import myprogress from "../progress/progress";
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      play: false,
      starttime: 0, //歌曲开始时间
      endtime: 0 //歌曲总时长
    };
  },
  components: {myprogress},
  computed: {
    ...mapState(["songList", "fullScreen", "songindex", "loop"]),
    ...mapGetters(["currentSong"]),
    cd() {
      return this.play == true ? "cd" : "cd pasud";
    }
  },
  methods: {
    ...mapMutations([
      "scalePlayer",
      "currentindex",
      "currentPrev",
      "currentNext",
      "randomPlay",
      "loopSwitch"
    ]),
    // 播放器变小
    showSmall(isScale) {
      console.log(isScale);
      this.scalePlayer(isScale);
    },
    //
    //点击播放按钮控制图片转动
    songPlayer() {
      this.play = !this.play;
    },
    canplay() {
      this.audio = this.$refs.audio;
      // console.log(this.audio.__proto__);
      this.audio.play();
      this.play = true;
      this.endtime = this.audio.duration;
      // this.seek()
    },
    timeupdate(e) {
      // console.log(e);
      this.starttime = e.target.currentTime;
    },
    seek(s){
      // 修改歌曲播放的时间
      this.audio.currentTime = s
    },
    ended() {
      // this.paly = false;
      switch (this.loop) {
        case 1: //顺序循环
          this.currentNext();
          break;
        case 2: //单曲循环
          this.audio.play();
          break;
        case 3: //随机循环
          this.randomPlay();
          break;
        default:
          break;
      }
      // this.audio = this.$refs.audio;
      // this.audio.pause();
      // console.log("播放停止");
    },
    // 循环播放状态值改变
    loopplay() {
      this.loopSwitch();
    },
    prev() {
      console.log("上一首");

      this.currentPrev();
    },
    next() {
      console.log("下一首");

      this.currentNext();
    }
  },
  watch: {
    // 监听播放值得改变，控制播放暂停
    play(newValue, oldValue) {
      if (!this.audio) return false;
      if (newValue) {
        this.audio.play();
      } else {
        this.audio.pause();
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../style/index.less";
.big {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  color: @colorW;
  // position: relative;
  background: @backcolor2;
  .bg {
    .w(375);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    filter: blur(15px);
    z-index: -1;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .songname {
    .w(375);
    height: 30px;
  }
  .singer {
    text-align: center;
    margin: 10px 0;
  }
  .img {
    text-align: center;
    img {
      .w(290);
      .h(290);
      border: 3px solid @colorB;
      border-radius: 50%;
    }
    & .cd {
      animation: rotate 10s linear infinite;
    }

    & .pasud {
      animation-play-state: paused;
    }
  }
  
}
.small {
  position: fixed;
  height: 40px;
  left: 0;
  right: 0;
  bottom: 0;
  background: greenyellow;
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>