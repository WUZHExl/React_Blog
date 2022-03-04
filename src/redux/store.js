/* 
	该文件专门用于暴露一个store对象，整个应用只有一个store对象
*/
import {createStore,applyMiddleware} from 'redux'
import reducer from './reducer'
import thunk from 'redux-thunk'


const store=createStore(reducer,applyMiddleware(thunk))

export default store