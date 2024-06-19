import {
    getChatRequest,
    getChatFailure,
    getChatSuccess,
    createChatRequest,
    createChatFailure,
    createChatSuccess,
    getChatByIdRequest,
    getChatByIdFailure,
    getChatByIdSuccess,
    createGroupRequest,
    createGroupFailure,
    createGroupSuccess,
    renameChatRequest,
    renameChatFailure,
    renameChatSuccess,
    addMembersRequest,
    addMembersSuccess,
    addMembersFailure,
    leaveGroupFailure,
    leaveGroupSuccess,
    leaveGroupRequest,
    deleteGroupFailure,
    deleteGroupSuccess,
    deleteGroupRequest,
}   from "@/redux/chat/action";
import {call, ForkEffect, put, takeLatest} from 'redux-saga/effects';
import {addMember, createChat, createGroup, deleteGroup, getChat, getChatById, leaveGroup, renameGroup} from './api';
import { IChatDeletePayload, IChatSuccessPayload } from "@/interface/chat"; 
import { toast } from "react-toastify";
    
    function* getChatByIdUserWorker(action: ReturnType<typeof getChatRequest>) {
      try {
        const response: IChatSuccessPayload = yield call(getChat, action.payload.id);
        if (response) {
          yield put(getChatSuccess(response));
        } else {
          yield put(getChatFailure());
        }
      } catch (error) {
        yield put(getChatFailure());
      }
    }

    function* createChatWorker(action: ReturnType<typeof createChatRequest>) {
      try {
        const response: IChatSuccessPayload = yield call(createChat, action.payload.ida, action.payload.idb);
        if (response) {
          yield put(createChatSuccess(response));
        } else {
          yield put(createChatFailure());
        }
      } catch (error) {
        yield put(createChatFailure());
        console.log(error);
      }
    }

    function* getChatByIdChatWorker(action: ReturnType<typeof getChatByIdRequest>) {
      try {
        const response: IChatSuccessPayload = yield call(getChatById, action.payload.id);
        if (response) {
          yield put(getChatByIdSuccess(response));
        } else {
          yield put(getChatByIdFailure());
        }
      } catch (error) {
        yield put(getChatByIdFailure());
        console.log(error);
      }
    }
      
    function* createGroupWorker(action: ReturnType<typeof createGroupRequest>) {
      try {
        const response: IChatSuccessPayload = yield call(createGroup, action.payload.id, action.payload.image, action.payload.chatName);
        if (response) {
          yield put(createGroupSuccess(response));
        } else {
          yield put(createGroupFailure());
        }
      } catch (error : any) {
        yield put(createGroupFailure());
        console.log(error);
        toast.error(error.response.data.message);
      }
    }


    function* renameGroupWorker(action: ReturnType<typeof renameChatRequest>) {
      try {
        const response: IChatSuccessPayload = yield call(renameGroup, action.payload.chatId, action.payload.chatName, action.payload.image);
        if (response) {
          yield put(renameChatSuccess(response));
        } else {
          yield put(renameChatFailure());
        }
      } catch (error : any) {
        yield put(renameChatFailure());
        console.log(error);
        toast.error(error.response.data.message);
      }
    }

    function* addMembersGroupWorker(action: ReturnType<typeof addMembersRequest>) {
      try {
        const response: IChatSuccessPayload = yield call(addMember, action.payload.chatId, action.payload.userId);
        if (response) {
          yield put(addMembersSuccess(response));
        } else {
          yield put(addMembersFailure());
        }
      } catch (error : any) {
        yield put(addMembersFailure());
        console.log(error);
        toast.error(error.response.data.message);
      }
    }

    function* leaveGroupWorker(action: ReturnType<typeof leaveGroupRequest>) {
      try {
        const response: IChatSuccessPayload = yield call(leaveGroup, action.payload.chatId);
        if (response) {
          yield put(leaveGroupSuccess(response));
        } else {
          yield put(leaveGroupFailure());
        }
      } catch (error : any) {
        yield put(leaveGroupFailure());
        console.log(error);
        toast.error(error.response.data.message);
      }
    }

    function* deleteGroupWorker(action: ReturnType<typeof deleteGroupRequest>) {
      try {
        const response: IChatSuccessPayload = yield call(deleteGroup, action.payload.chatId);
        if (response) {
          yield put(deleteGroupSuccess(response));
        } else {
          yield put(deleteGroupFailure());
        }
      } catch (error : any) {
        yield put(deleteGroupFailure());
        console.log(error);
        toast.error(error.response.data.message);
      }
    }


    function* postSagas(): Generator<ForkEffect<never>, void> {
      yield takeLatest(getChatRequest.type, getChatByIdUserWorker);
      yield takeLatest(createChatRequest.type, createChatWorker);
      yield takeLatest(getChatByIdRequest.type, getChatByIdChatWorker);
      yield takeLatest(createGroupRequest.type, createGroupWorker);
      yield takeLatest(renameChatRequest.type, renameGroupWorker);
      yield takeLatest(addMembersRequest.type, addMembersGroupWorker);
      yield takeLatest(leaveGroupRequest.type, leaveGroupWorker);
      yield takeLatest(deleteGroupRequest.type, deleteGroupWorker);
    }
    export default postSagas;
    