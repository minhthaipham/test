import {createSelector} from '@reduxjs/toolkit';
import type {RootState} from '../reducers';
const selectChat = (state: RootState) => state.chat;
export const listChatByIdUser = createSelector(
    selectChat,
    (chat) => chat.listChat,
);

export const checkChat = createSelector(
    selectChat,
    (chat) => chat.check,
);  

export const idChat = createSelector(
    selectChat,
    (chat) => chat.idChat,
);

export const inforChat = createSelector(
    selectChat,
    (chat) => chat.getChatById,
);

export const inforUserAdded = createSelector(
    selectChat,
    (chat) => chat.inforUserAdd,
);