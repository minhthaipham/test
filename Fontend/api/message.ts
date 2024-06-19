import { apiRouter } from "@/config/apiRouter";
import { IChatSuccessPayload } from "@/interface/chat";
import { IMessPayload, IMessSuccessPayload } from "@/interface/mess";
import { IUserSuccessPayload } from "@/interface/user";
import axiosClient from "@/libs/api/axiosClient";
import { IUser } from "@/model/user";

export const getMessages = async (idChat: string) => {
    const response = await axiosClient.get<IMessSuccessPayload>(
        `${apiRouter.getMessage}/${idChat}`
    )
    return response.data
}

export const sendMessage = async (idChat: string, content:string,idUser:string,type:string) => {
   const data = {
         idChat,
         content,
         idUser,
         type
    }
    const response = await axiosClient.post<IMessPayload>(
        `${apiRouter.createMessage}`,
        data
    )
    return response.data
}