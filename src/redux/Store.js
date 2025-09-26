import { configureStore,combineReducers } from '@reduxjs/toolkit'
import counterReducer from './CounterSlice'
import moviesReducer from './MovieSlice'
import questionsReducer from './QuestionSlice'

const rootReducer = combineReducers({
  movies:moviesReducer,
  counter:counterReducer,
  questions:questionsReducer,
  
}) 

const store = configureStore({
  reducer: rootReducer
})

export default store;


