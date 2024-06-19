import { apiRouter } from "@/config/apiRouter"
import { ICommentSuccesPayload } from "@/interface/commment"
import axiosClient from "@/libs/api/axiosClient"

export const createComment = async (
    idPost : string,
    idUser : string,
    content : string,
)  => {
    const data = {
        idPost,
        idUser,
        content,
    }
    const response = await axiosClient.post<ICommentSuccesPayload>(apiRouter.createComment, data)
    return response
}

export const replyComment = async (
    idUser : string,
    content : string,
    idComment : string,
)  => {
    const data = {
        idUser,
        content,
        idComment,
    }

    const response = await axiosClient.post<ICommentSuccesPayload>(apiRouter.replyComment, data)
    return response
}

export const likeComment = async (
    idUser : string,
    idComment : string,
) => {
    const data = {
        idUser,
        idComment,
    }

    const response = await axiosClient.post<ICommentSuccesPayload>(apiRouter.likeComment, data)
    return response
}

export const editComment = async (
    idComment : string,
    content : string,
    idUser : string
) => {
    const data = {
        idComment,
        content,
        idUser,
    }
    
    const response = await axiosClient.post<ICommentSuccesPayload>(apiRouter.editComment, data)
    return response
}

export const deleteComment = async (
    idComment : string,
    idUser : string
) => {
    const data = {
        idComment,
        idUser,
    }
    
    const response = await axiosClient.post<ICommentSuccesPayload>(apiRouter.deleteComment, data)
    return response
}