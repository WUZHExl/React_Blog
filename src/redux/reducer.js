/* 
	1.该文件是用于创建一个为reducer，reducer的本质就是一个函数
	2.reducer函数会接到两个参数，分别为：之前的状态(preState)，动作对象(action)
*/
const initState={
    articleList:[],
    cateList:[],
    cate:null,
    id:''
}

export default function Reducer(preState=initState, action) {

  const {type,data} = action;
  switch (type) {
      case 'setLists':{
        let {url,newArr} = data
        if(url==='article'){
          newArr.map(item=>{
            return item.createdAt=new Date(item.createdAt).toLocaleString()
          })
          return{
            ...preState,
            articleList:newArr
          }
        }
        else if(url==='cate'){
          return{
            ...preState,
            cateList:newArr
          }
        }
      }
      break;
      default:
        return preState
  }
}