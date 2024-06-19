import {createAction} from '@reduxjs/toolkit';
import { IPostSuccessPayload } from '../../interface/post';

export const getPostRequest = createAction(
    'ACTION/GET_POST_REQUEST',
);
export const getPostSuccess = createAction<IPostSuccessPayload>(
    'ACTION/GET_POST_SUCCESS',
);
export const getPostFailure = createAction(
    'ACTION/GET_POST_FAILURE',
);

export const getPostByIdUserRequest = createAction<{
    id : string,
}>(
    'ACTION/GET_POST_BY_ID_USER_REQUEST',
);

export const getPostByIdUserSuccess = createAction<IPostSuccessPayload>(
    'ACTION/GET_POST_BY_ID_USER',
);

export const getPostByIdUserFailure = createAction(
    'ACTION/GET_POST_BY_ID_USER_FAILURE',
);


export const getIdPost = createAction<string>(
    'ACTION/GET_ID_POST',
);

export const getPost = createAction<{
    content : string,
    image : string,
    idPost : string,
}>(
    'ACTION/GET_POST',
)
