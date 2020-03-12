import vue from 'vue'
import vuex from 'vuex'
vue.use(vuex)
const store = new vuex.Store({
    state: {
        songList: [],
        fullScreen: true,
        songindex: -1,
        loop: 1,//1 顺序播放 2 单曲循环 3 随机播放
    },
    mutations: {
        // 播放器是否显示
        openPlayer(state, isShow) {
            state.songList = isShow
        },
        //播放器显示大小屏
        scalePlayer(state,screen){
            state.fullScreen = screen
        },
        //  当前播放歌曲下标
        currentindex(state, index) {
            state.songindex = index;
        },
        // 上一曲
        currentPrev(state) {
            if (state.songindex > 0) {
                state.songindex--
            } else {
                state.songindex = state.songList.length - 1;
            }
        },
        // 下一曲
        currentNext(state) {
            if (state.songindex < state.songList.length - 1) {
                state.songindex++
            } else {
                state.songindex = 0;
            }
        },
        //随机播放
        randomPlay(state) {
            state.songindex = parseInt((state.songList.length) * Math.random())
        },
        //循环模式切换
        loopSwitch(state){
            if(state.loop < 3){
                state.loop++
            }else{
                state.loop = 1
            }
            
        }

    },
    getters: {
        currentSong(state) {
            return state.songList[state.songindex] || null
        }

    }

})
export default store