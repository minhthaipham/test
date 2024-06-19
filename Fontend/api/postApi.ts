
import { apiRouter } from "@/config/apiRouter";
import { IDeletePostSuccessPayload, IPostSuccessPayload, IPostSuccessPayloadById } from "@/interface/post";
import axiosClient from "@/libs/api/axiosClient";

export const createPost = async (content : string,image : string,userId : string)  => {
    const data = {
        content,
        image,
        userId,
    }
    const response = await axiosClient.post<IPostSuccessPayload>(apiRouter.createPost , data);
    return response;
}


export const getPostByIdUser = async (id: string) => {
    const response = await axiosClient.get<IPostSuccessPayload>(`${apiRouter.getPostByIdUser}/${id}`);
    return response.data;
}

export const editPost = async (
    content : string,
    image : string,
    idPost : string,
    idUser : string
) => {
    const data = {
        content,
        image,
        idPost,
        idUser
    }
    const response = await axiosClient.post<IPostSuccessPayload>(apiRouter.editPost, data);
    return response;
}

export const deletePost = async (
    idUser : string,
    idPost : string,
)  => {
    const data = {
        idUser,
        idPost
    }
    const response = await axiosClient.post<IDeletePostSuccessPayload>(apiRouter.deletePost, data);
    return response;
}

export const likePost = async(
    idPost : string,
    idUser : string,
) => {
    const data = {
        idPost,
        idUser
    }

    const response = await axiosClient.post<IPostSuccessPayloadById>(apiRouter.likePost, data);
    return response;
}