import { apiRouter } from "@/config/apiRouter";
import { IChatDeletePayload, IChatSuccessPayload } from "@/interface/chat";
import axiosClient from "@/libs/api/axiosClient";
export const getChat = async (id: string) => {
    const response = await axiosClient.get<IChatSuccessPayload>(`${apiRouter.listChatOfUser}/${id}`);
    return response.data;
  }

export const createChat = async (ida: string, idb: string) => {
    const response = await axiosClient.post<IChatSuccessPayload>(`${apiRouter.createChat}`, {ida, idb});
    return response.data;
  }

export const getChatById = async (id: string) => {
    const response = await axiosClient.get<IChatSuccessPayload>(`${apiRouter.getChat}/${id}`);
    return response.data;
  }
  export const createGroup = async(id : string[], image : any, chatName : string) => {
    const data = {
        id,
        image,
        chatName
    }
    const response = await axiosClient.post<IChatSuccessPayload>(
        `${apiRouter.createGroup}`,
        data
    )
    return response.data
}

export const renameGroup = async(chatId : string, chatName : string,image : any) => {
    const data = {
        chatId,
        chatName,
        image
    }
    const response = await axiosClient.put<IChatSuccessPayload>(
        `${apiRouter.reNameGroup}`,
        data
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


export const leaveGroup = async(chatId : string) => {
   const data = {
         chatId
        }
    const response = await axiosClient.put<IChatSuccessPayload>(
        `${apiRouter.leaveGroup}`,
        data
    )
    
    return response.data
}

export const deleteGroup = async(chatId : string) => {
    const data = {
        chatId
    }
    const response = await axiosClient.delete<IChatSuccessPayload>(
        `${apiRouter.deleteGroup}`,
        {data}
    )
    return response.data
}
