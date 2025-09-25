import { configureStore,combineReducers } from '@reduxjs/toolkit'
import counterReducer from './CounterSlice'
import moviesReducer from './MovieSlice'

const rootReducer = combineReducers({
  movies:moviesReducer,
  counter:counterReducer,
  
}) 

const store = configureStore({
  reducer: rootReducer
})

export default store;


