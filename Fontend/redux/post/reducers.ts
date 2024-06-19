import { createReducer } from "@reduxjs/toolkit";
import {
    getPostRequest,
    getPostSuccess,
    getPostFailure,
    getIdPost,
    getPost,
    getPostByIdUserRequest,
    getPostByIdUserSuccess,
    getPostByIdUserFailure,
} from "./actions";
import { IPost } from "@/interface/post";
interface IinitialState {
  loading: boolean;
    listPost: IPost[];
    listPostByIdUser : IPost[];
    idPost : string;
    choosePost : {
        content : string,
        image : string,
        idPost : string,
    }
}

const initialState: IinitialState = {
  loading: true,
    listPost: [],
    listPostByIdUser : [],
    idPost : '',
    choosePost : {
        content : '',
        image : '',
        idPost : '',
    },

};

export const PostReducer = createReducer(initialState, {
    [getPostRequest.type]: (state) => {
        state.loading = true;
    }
    ,
    [getPostSuccess.type]: (state, action) => {
        state.loading = false;
        state.listPost = action.payload.data;
    }
    ,
    [getPostFailure.type]: (state) => {
        state.loading = false;
    }
    ,
    [getIdPost.type]: (state, action) => {
        state.idPost = action.payload;
    }
    ,
    [getPost.type]: (state, action) => {
        state.choosePost = action.payload;
    }
    ,
    [getPostByIdUserRequest.type]: (state) => {
        state.loading = true;
    },
    [getPostByIdUserSuccess.type]: (state, action) => {
        state.loading = false;
        state.listPostByIdUser = action.payload.data;
    },
    [getPostByIdUserFailure.type]: (state) => {
        state.loading = false;
    }
});