import axios from 'axios'
import jsonp from 'jsonp'
/*****************推荐页**************************/ 
//对网络请求进行封装
let getrecomandlist = ()=>{
    let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_first_yqq.fcg?g_tk=5381&inCharset=utf-8&outCharset=utf-8&notice=0&platform=yqq&format=jsonp&loginUin=0&hostUin=0&cid=205360410&reqtype=1&from=2&ct=24&qq=0&tpl=v12&page=other';
   return new Promise((resolve,reject)=>{
       jsonp(url,{param:'jsonpCallback'},(err,data)=>{
           if(err){
               reject(err)
           }else{
               resolve(data)
           }
       })
   })
}
/*****************歌手页**************************/ 
let getsingerdata = ()=>{
    let url ='https://c.y.qq.com/v8/fcg-bin/v8.fcg?g_tk=5381&inCharset=utf-8&outCharset=utf-8&notice=0&platform=yqq&format=jsonp&channel=singer&page=list&key=all_all_all&pagesize=100&pagenum=1&loginUin=0&hostUin=0&needNewCode=0'
    return new Promise((resolve,reject)=>{  
        jsonp(url,{param:'jsonpCallback',},(err,data)=>{
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}
/*****************歌手详情页**************************/ 
let getSingerDetail = (Fsinger_mid)=>{
    let url = `https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?g_tk=5381&inCharset=utf-8&outCharset=utf-8&notice=0&platform=yqq&format=jsonp&loginUin=0&hostUin=0&needNewCode=0&singermid=${Fsinger_mid}&order=listen&begin=0&num=100&songstatus=1`
    // 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?g_tk=5381&inCharset=utf-8&outCharset=utf-8&notice=0&platform=yqq&format=jsonp&loginUin=0&hostUin=0&needNewCode=0&singermid=002J4UUk29y8BY&order=listen&begin=0&num=100&songstatus=1&jsonpCallback=__jp2'
    return new Promise((resolve,reject)=>{
       jsonp(url,{param:'jsonpCallback',},(err,data)=>{
           if(err){
               reject(err)
           }else{
               resolve(data)
           }
       })
    })
}
/*****************播放器地址**************************/ 
let getplayerurl = (mids)=>{
    let url = '/player/fcj/music/songurl'
    return axios.post(url,{mids})
}
/*****************推荐页**************************/ 
export {getrecomandlist,getsingerdata,getSingerDetail,getplayerurl}