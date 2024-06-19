import {
    getPostRequest,
    getPostSuccess,
    getPostFailure,
    getPostByIdUserRequest,
    getPostByIdUserSuccess,
    getPostByIdUserFailure,
} from './actions';
import {call, ForkEffect, put, takeLatest} from 'redux-saga/effects';
import {getPost, getPostByIdUser} from './api';
import { IPostSuccessPayload } from '@/interface/post';
    
    function* getPostRoomWorker() {
      try {
        const response: IPostSuccessPayload = yield call(getPost);
        if (response !== null) {
          yield put(getPostSuccess(response));
        } else {
          yield put(getPostFailure());
        }
      } catch (e) {
        yield put(getPostFailure());
        console.log(e);
      }
    }
    
    function* getPostByIdUserWorker(action: ReturnType<typeof getPostByIdUserRequest>) {
      try {
        const response: IPostSuccessPayload = yield call(getPostByIdUser, action.payload.id);
        if (response) {
          yield put(getPostByIdUserSuccess(response));
        } else {
          yield put(getPostByIdUserFailure());
        }
      } catch (error) {
        yield put(getPostByIdUserFailure());
        console.log(error);
      }
    }

    function* postSagas(): Generator<ForkEffect<never>, void> {
      yield takeLatest(getPostRequest.type, getPostRoomWorker);
      yield takeLatest(getPostByIdUserRequest.type, getPostByIdUserWorker);
    }
    export default postSagas;
    