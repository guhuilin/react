//
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import allReducer from './store.reducer'


let bigStore = combineReducers({
  allReducer
})

export default createStore(bigStore,applyMiddleware(thunk))