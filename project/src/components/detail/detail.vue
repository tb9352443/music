<template>
  <div class="detail">
    <div class="singer">
      <div class="singername">
        <span class="back" @click="back()">返回</span>
        <span class="name">{{singername}}</span>
      </div>
      <div class="singerimg" :style="{'background-image':`url(${singerphoto})`}" ref="photo">
        <!-- <img src="" alt=""> -->
        <!-- <img :src="songlist.author" alt /> -->
      </div>
      <p class="player">
        <span>随机播放</span>
      </p>
    </div>
    <div class="wrapper" ref="wrapper">
      <ul class="content">
        <li v-for="(item,index) in songlist" :key="index" @click="goPlayer(index,true)">
          <p class="songname">{{item.songname}}</p>
          <p class="albumname">{{item.singer[0].name}}.{{item.albumname}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { getSingerDetail, getplayerurl } from "../../api/api";
import BS from "better-scroll";
import { mapMutations } from "vuex";
import { handleSongData } from "./handledata";
export default {
  data() {
    return {
      songlist: [],
      singername: "",
      singerphoto: ""
    };
  },

  methods: {
    ...mapMutations(["openPlayer", "currentindex", "scalePlayer"]),
    // 播放器是否显示
    goPlayer(index, isshow) {
      this.openPlayer(this.songlist);
      this.currentindex(index);
      this.scalePlayer(isshow);
      // console.log(this.songlist);
    },
    // 滚动
    bsInit() {
      this.bs = new BS(this.$refs.wrapper, { probeType: 3, click: true });
      // 获得歌手头像标签
      let img = this.$refs.photo;
      // 获得歌手头像标签的高度
      let imgH = this.$refs.photo.clientHeight;
      this.bs.on("scroll", ({ y }) => {
        console.log(y);

        // 如果大于等于零，向下滚动则歌手头像放大
        if (y >= 0) {
          let percent = 1 + y / imgH;
          img.style.transform = `scale(${percent})`;
        } else {
          // 小于零向上滚动，滚动到离顶部一段高度固定
          if (Math.abs(y) > imgH - 30) {
            this.$refs.photo.style.paddingTop = "10%";
            this.$refs.photo.style.zIndex = 1;
          } else {
            this.$refs.photo.style.paddingTop = "70%";
            this.$refs.photo.style.zIndex = -1;
          }
        }
      });
    },
    // 返回
    back() {
      this.$router.back();
    }
  },
  async created() {
    let { Fsinger_mid } = this.$route.params;
    let res = await getSingerDetail(Fsinger_mid);
    let { list, singer_mid, singer_name } = res.data;
    let author = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${Fsinger_mid}.jpg?max_age=2592000`;
    this.singername = singer_name;
    this.singerphoto = author;
    let { mids, arr } = handleSongData(list);
    let data = await getplayerurl(mids);
    let { urls } = data.data;
    let finalData = [];
    for (let index = 0; index < arr.length; index++) {
      arr[index].playerUrl = urls[index];
      if (urls[index]) {
        finalData.push(arr[index]);
      }
    }
    this.songlist = finalData;
    console.log(this.songlist);
    this.$nextTick(() => {
      this.bsInit();
    });
  }
};
</script>
<style lang="less" scoped>
@import "../../style/index.less";
.detail {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: @backcolor;
  .singer {
    height: 226px;
    position: relative;

    .singername {
      .w(375);
      color: @colorW;
      position: absolute;
      top: 0;
      height: 30px;
      z-index: 2;
      .back {
        color: @colorW;
        margin-left: 30px;
      }
      .name {
        margin-left: 100px;
      }
    }
    .singerimg {
      .w(375);
      position: absolute;
      top: 0;
      padding-top: 70%;
      background-size: cover;
      z-index: -1;
    }
    .player {
      position: absolute;
      width: 130px;
      height: 32px;
      bottom: 20px;
      border: 1px solid @colorA;
      text-align: center;
      line-height: 32px;
      border-radius: 30px;
      left: 35%;
      margin: 0 auto;
      color: @colorW;
    }
  }
  .wrapper {
    .w(375);
    height: 100%;
    .content {
      padding: 0 30px;
      background: @backcolor;
      li {
        margin: 8px 0;
        p {
          .line-h(22);
        }
        .songname {
          color: @colorW;
        }
        .albumname {
          color: @colorB;
        }
      }
    }
  }
}
</style>