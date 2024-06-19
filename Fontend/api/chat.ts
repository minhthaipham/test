import { apiRouter } from "@/config/apiRouter";
import { IChatDeletePayload, IChatSuccessPayload } from "@/interface/chat";
import { IUserSuccessPayload } from "@/interface/user";
import axiosClient from "@/libs/api/axiosClient";
import { IUser } from "@/model/user";
export const searchInforUserChat =async (fullName : string , id : string) => {

    const response = await axiosClient.get<IUserSuccessPayload>(
        `${apiRouter.searchUser}?fullName=${fullName}&id=${id}`
    )   
    return response.data
}

export const listChatOfUser = async (id:string) => {
    const response = await axiosClient.get<IUserSuccessPayload>(
        `${apiRouter.listChatOfUser}?id=${id}`
    )
    return response.data
}

export const accessChat = async (ida : string, idb : string) => {
    const response = await axiosClient.post<IChatSuccessPayload>(
        `${apiRouter.createChat}`,
        {ida, idb}
    )
    return response.data
}

export const createGroup = async(idUser : string[], image : any, chatName : string) => {
    const data = {
        idUser,
        image,
        chatName
    }
    const response = await axiosClient.post<IChatSuccessPayload>(
        `${apiRouter.createGroup}`,
        data
    )
    return response.data
}

export const searchAddMember = async (chatId : string, fullName : string) => {
    const response = await axiosClient.get<IUserSuccessPayload>(
        `${apiRouter.searchAddMember}?chatId=${chatId}&fullName=${fullName}`
    )
    return response.data
}

export const addMember = async (chatId : string, userId : string[]) => {
    const data = {
        chatId,
        userId
    }   
    const response = await axiosClient.put<IChatSuccessPayload>(
        `${apiRouter.addMember}`,
        data
    )
    return response.data
}

export const deleteGroup = async(chatId : string) => {
    const data = {
        chatId
    }
    const response = await axiosClient.delete<IChatDeletePayload>(
        `${apiRouter.deleteGroup}`,
        {data}
    )
    return response.data
}
