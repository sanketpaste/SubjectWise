import { configureStore,combineReducers } from '@reduxjs/toolkit'
import counterReducer from './CounterSlice'
import moviesReducer from './MovieSlice'
import questionsReducer from './QuestionSlice'
import rootSaga from './sagas'
const createSagaMiddleware = require('redux-saga').default

const rootReducer = combineReducers({
  movies:moviesReducer,
  counter:counterReducer,
  questions:questionsReducer,
}) 

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

export default store;


