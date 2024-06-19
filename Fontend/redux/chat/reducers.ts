import { createReducer } from "@reduxjs/toolkit";
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
    backChat,
    renameChatRequest,
    renameChatSuccess,
    renameChatFailure,
    addMembersRequest,
    addMembersSuccess,
    addMembersFailure,
    leaveGroupRequest,
    leaveGroupSuccess,
    leaveGroupFailure,
    changeStatusCheck,
    deleteGroupFailure,
    deleteGroupSuccess,
    deleteGroupRequest,
    saveNotification,
} from  "@/redux/chat/action";
import { IChat } from "@/interface/chat";
import { IUser } from "@/model/user";
interface IinitialState {
  loading: boolean;
  check: boolean;
  idChat : string;
  listChat: IChat[];
  getChatById: IChat;
//   nameUserAdd: string;
   inforUserAdd: {
    fullName: string;
    avatar: string;
    }
    saveNotification: {
        idChat: string;
        data: string;
    }
}

const initialState: IinitialState = {
  loading: true,
    check: false,
    idChat: "",
    listChat: [],
    getChatById: {
        _id: "",
        users: [],
        __v: 0,
        chatName: "",
        groupAdmin: {
            _id: "",
            fullName: "",
            email: "",
            password: "",
            avatar: "",
            address: "",
            createdAt : "",
            updatedAt: "",
            followers : [],
            following : [],
            gender : "",
            mobile : "",
            saved : [],
            story : "",
            website : "",
        },
        image : "",
        createdAt : "",
        isGroupChat     : false,
        updatedAt: "",
        latestMessage : {
            _id: "",
            chat: "",
            content: "",
            createdAt: "",
            updatedAt: "",
            __v: 0,
            nameUser: "",
            users: "",
        },
    },
    inforUserAdd: {
        fullName: "",
        avatar: "",
    },
    saveNotification: {
        idChat: "",
        data: "",
    }
};
export const ChatReducer = createReducer(initialState, {
    [getChatRequest.type]: (state) => {
        state.loading = true;
    },
    [getChatSuccess.type]: (state, action) => {
        state.loading = false;
        state.listChat = action.payload.data;
    },
    [getChatFailure.type]: (state) => {
        state.loading = false;
    },
    [createChatRequest.type]: (state) => {
        state.loading = true;
    },
    [createChatSuccess.type]: (state, action) => {
        state.loading = false;
        state.check = true;
        state.idChat = action.payload.data._id;
        const index = state.listChat.findIndex((item) => item._id === action.payload.data._id);
        if (index === -1) {
            // state.listChat = [...state.listChat, action.payload.data];
            state.listChat = [action.payload.data, ...state.listChat];
        }
        state.getChatById = action.payload.data;
    },
    [createChatFailure.type]: (state) => {
        state.loading = false;
    },
    [getChatByIdRequest.type]: (state) => {
        state.loading = true;
    },
    [getChatByIdSuccess.type]: (state, action) => {
        state.loading = false;
        state.check = true;
        state.idChat = action.payload.data._id;
        state.getChatById = action.payload.data;
        state.inforUserAdd = {
            fullName: action.payload.data.users[action.payload.data.users.length - 1].fullName,
            avatar: action.payload.data.users[action.payload.data.users.length - 1].avatar,
        }
    },
    [getChatByIdFailure.type]: (state) => {
        state.loading = false;
    },
    [createGroupRequest.type]: (state) => {
        state.loading = true;
    },
    [createGroupSuccess.type]: (state, action) => {
        state.loading = false;
        state.check = true;
        state.idChat = action.payload.data._id;
        state.getChatById = action.payload.data;
        state.listChat = [action.payload.data, ...state.listChat];
    },
    [createGroupFailure.type]: (state) => {
        state.loading = false;
    },
    [backChat.type]: (state) => {
        state.check = false;
    },
    [renameChatRequest.type]: (state) => {
        state.loading = true;
    },
    [renameChatSuccess.type]: (state, action) => {
        state.loading = false;
        state.check = true;
        state.getChatById = action.payload.data;
        const index = state.listChat.findIndex((item) => item._id === action.payload.data._id);
        state.listChat[index] = action.payload.data;
    },
    [renameChatFailure.type]: (state) => {
        state.loading = false;
    },
    [addMembersRequest.type]: (state) => {
        state.loading = true;
    },
    [addMembersSuccess.type]: (state, action) => {
        state.loading = false;
        state.check = true;
        state.getChatById = action.payload.data;
        const index = state.listChat.findIndex((item) => item._id === action.payload.data._id);
        state.listChat[index] = action.payload.data;
        const data = {
            fullName: action.payload.data.users[action.payload.data.users.length - 1].fullName,
            avatar: action.payload.data.users[action.payload.data.users.length - 1].avatar,
        }
        state.inforUserAdd = data;
       
    },
    [addMembersFailure.type]: (state) => {
        state.loading = false;
    },
    [leaveGroupRequest.type]: (state) => {
        state.loading = true;
    },
    [leaveGroupSuccess.type]: (state, action) => {
        state.loading = false;
        state.check = false;
        state.listChat = state.listChat.filter((item) => item._id !== action.payload.data._id);
    },
    [leaveGroupFailure.type]: (state) => {
        state.loading = false;
    },
    [deleteGroupRequest.type]: (state) => {
        state.loading = true;
    },
    [deleteGroupSuccess.type]: (state, action) => {
        state.loading = false;
        state.check = false;
        state.listChat = state.listChat.filter((item) => item._id !== action.payload.data._id);
    },
    [deleteGroupFailure.type]: (state) => {
        state.loading = false;
    },
});