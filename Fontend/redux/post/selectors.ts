import {createSelector} from '@reduxjs/toolkit';
import type {RootState} from '../reducers';

const selectPost = (state: RootState) => state.post;


export const listPost = createSelector(
    selectPost,
    (post) => post.listPost,
);

export const loadingListPost = createSelector(
    selectPost,
    (post) => post.loading,
);

export const listPostByIdUser = createSelector(
    selectPost,
    (post) => post.listPostByIdUser,
);
export const getPostByIDSel = createSelector(
    selectPost,
    (post) => post.idPost,
);

export const choosePost = createSelector(
    selectPost,
    (post) => post.choosePost,
);

export const loadingPost = createSelector(
    selectPost,
    (post) => post.loading,
);