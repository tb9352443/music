function dealdata(data){
    // console.log(data);
    let obj = {hot:[]};
    for(let i=0;i<data.length;i++){
      let {Findex,Fother_name,Fsinger_mid,Fsinger_name} = data[i];
      let author = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${Fsinger_mid}.jpg?max_age=2592000`;
      let singeritem = {Findex,Fother_name,Fsinger_mid,Fsinger_name,author}
      if(i<10){
        obj.hot.push(singeritem)
      }
    if(!obj[Findex]){
        // 新建的操作下标操作
        obj[Findex]=[singeritem]
      }else{
        // 向首字母里添加歌手
        obj[Findex].push(singeritem)
      }  
    }
// console.log(obj);
    let hot = []
    let other = []
    for(const key in obj){
      if(key=='hot'){
        hot.push({Findex:key,list:obj[key]})
      }else if(key!=9){
        other.push({Findex:key,list:obj[key]})
      }
    }
//   console.log(hot,other);
  other.sort((a,b)=>{return a.Findex.charCodeAt()-b.Findex.charCodeAt()})
  let result = hot.concat(other)
  return result 
}
export {dealdata}