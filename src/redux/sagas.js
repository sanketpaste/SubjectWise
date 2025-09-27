import { all, call, put, takeLatest, delay } from 'redux-saga/effects'
import { fetchMoviesRequest, fetchMoviesSuccess, fetchMoviesFailure } from './MovieSlice'
import {
  addQuestionRequest,
  addQuestionSuccess,
  addQuestionFailure,
  updateQuestionRequest,
  updateQuestionSuccess,
  updateQuestionFailure,
  deleteQuestionRequest,
  deleteQuestionSuccess,
  deleteQuestionFailure,
} from './QuestionSlice'

const API_URL = 'https://www.omdbapi.com/?s=batman&apikey=564727fa'

function* fetchMoviesWorker() {
  try {
    const res = yield call(fetch, API_URL)
    const data = yield call([res, 'json'])
    const list = data && data.Search ? data.Search : []
    yield put(fetchMoviesSuccess(list))
  } catch (e) {
    yield put(fetchMoviesFailure())
  }
}

function* addQuestionWorker(action) {
  try {
    yield delay(200) // Simulate API call
    yield put(addQuestionSuccess(action.payload))
  } catch (e) {
    yield put(addQuestionFailure())
  }
}

function* updateQuestionWorker(action) {
  try {
    yield delay(200) // Simulate API call
    yield put(updateQuestionSuccess(action.payload))
  } catch (e) {
    yield put(updateQuestionFailure())
  }
}

function* deleteQuestionWorker(action) {
  try {
    yield delay(150) // Simulate API call
    yield put(deleteQuestionSuccess(action.payload))
  } catch (e) {
    yield put(deleteQuestionFailure())
  }
}

function* watchMovies() {
  yield takeLatest(fetchMoviesRequest.type, fetchMoviesWorker)
}

function* watchQuestions() {
  yield takeLatest(addQuestionRequest.type, addQuestionWorker)
  yield takeLatest(updateQuestionRequest.type, updateQuestionWorker)
  yield takeLatest(deleteQuestionRequest.type, deleteQuestionWorker)
}

export default function* rootSaga() {
  yield all([
    watchMovies(),
    watchQuestions(),
  ])
}


