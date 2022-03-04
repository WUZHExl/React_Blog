import axios from "axios"


export const setListsdata =data=> ({type:'setLists',data})

// dispatch为自动接收的store.dispatch函数 
export const getLists = (data) => (dispatch) => {
  const {url}=data
  axios.get('/api/'+url)
  .then(function(res){
      let newArr=[]
      newArr.splice(0,newArr.length,...res.data)
      newArr=newArr.reverse()
      dispatch(setListsdata({...data,newArr}))
  })
}

