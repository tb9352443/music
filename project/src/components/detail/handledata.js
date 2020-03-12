/**************歌曲列表页数据处理**************************/ 
function handleSongData(data){
    let arr = [];
    let mids = []
    data.map((item)=>{
      let {albummid,albumname,singer,songmid,songname} = item.musicData
      let singerimgurl = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${albummid}.jpg?max_age=2592000`
      mids.push(songmid)
      arr.push({singerimgurl,albummid,albumname,singer,songmid,songname})
    })
    // console.log(arr);
    // this.songlist = arr
    return {mids,arr}
    // this.songlist = arr
}
export {handleSongData}