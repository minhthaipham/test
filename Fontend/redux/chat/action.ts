import {createAction} from '@reduxjs/toolkit';
import { IChat, IChatDeletePayload, IChatSuccessPayload } from '@/interface/chat'; 

export const getChatRequest = createAction<{
    id : string,
}>(
    'ACTION/GET_POST_BY_ID_USER_REQUEST',
);

export const getChatSuccess = createAction<IChatSuccessPayload>(
    'ACTION/GET_POST_BY_ID_USER_SUCCESS',
);

export const getChatFailure = createAction(
    'ACTION/GET_POST_BY_ID_USER_FAILURE',
);

export const createChatRequest = createAction<{
    ida : string,
    idb : string,
}>(
    'ACTION/CREATE_CHAT_REQUEST',
);

export const createChatSuccess = createAction<IChatSuccessPayload>(
    'ACTION/CREATE_CHAT_SUCCESS',
);

export const createChatFailure = createAction(
    'ACTION/CREATE_CHAT_FAILURE',
);

export const getChatByIdRequest = createAction<{
    id : string,
}>(
    'ACTION/GET_CHAT_BY_ID_REQUEST',
);

export const getChatByIdSuccess = createAction<IChatSuccessPayload>(
    'ACTION/GET_CHAT_BY_ID_SUCCESS',
);

export const getChatByIdFailure = createAction(
    'ACTION/GET_CHAT_BY_ID_FAILURE',
);

export const createGroupRequest = createAction<{
    id : string[],
    image : any,
    chatName : string,
}>(
    'ACTION/CREATE_GROUP_REQUEST',
);

export const createGroupSuccess = createAction<IChatSuccessPayload>(
    'ACTION/CREATE_GROUP_SUCCESS',
);

export const createGroupFailure = createAction(
    'ACTION/CREATE_GROUP_FAILURE',
);

export const backChat = createAction(
    'ACTION/BACK_CHAT',
);

export const renameChatRequest = createAction<{
    chatId : string,
    chatName : string,
    image : any ,
}>(
    'ACTION/RENAME_CHAT_REQUEST',
);

export const renameChatSuccess = createAction<IChatSuccessPayload>(
    'ACTION/RENAME_CHAT_SUCCESS',
);

export const renameChatFailure = createAction(
    'ACTION/RENAME_CHAT_FAILURE',
);

export const addMembersRequest = createAction<{
    chatId : string,
    userId : string[],
}>(
    'ACTION/ADD_MEMBERS_REQUEST',
);

export const addMembersSuccess = createAction<IChatSuccessPayload>(
    'ACTION/ADD_MEMBERS_SUCCESS',
);

export const addMembersFailure = createAction(
    'ACTION/ADD_MEMBERS_FAILURE',
);

export const leaveGroupRequest = createAction<{
    chatId : string,
}>(
    'ACTION/LEAVE_GROUP_REQUEST',
);

export const leaveGroupSuccess = createAction<IChatSuccessPayload>(
    'ACTION/LEAVE_GROUP_SUCCESS',
);

export const leaveGroupFailure = createAction(
    'ACTION/LEAVE_GROUP_FAILURE',
);

export const changeStatusCheck = createAction(
    'ACTION/CHANGE_STATUS_CHECK',
);

export const deleteGroupRequest = createAction<{
    chatId : string,
}>(
    'ACTION/DELETE_GROUP_REQUEST',
);

export const deleteGroupSuccess = createAction<IChatSuccessPayload>(
    'ACTION/DELETE_GROUP_SUCCESS',
);

export const deleteGroupFailure = createAction(
    'ACTION/DELETE_GROUP_FAILURE',
);


export const saveNotification = createAction<{
    chatId : string,
    data : string,
}>(
    'ACTION/SAVE_NOTIFICATION',
);