import { apiRouter } from "@/config/apiRouter"
import { IInforUserSuccessPayload, IUserSuccessPayload } from "@/interface/user"
import axiosClient from "@/libs/api/axiosClient"

export const searchInforUser =async (fullName : string , id : string) => {

    const response = await axiosClient.get<IUserSuccessPayload>(
        `${apiRouter.searchUser}?fullName=${fullName}&id=${id}`
    )   
    return response.data
}

export const getUserById = async (id : string) => {
    const response = await axiosClient.get<IInforUserSuccessPayload>(
        `${apiRouter.getUserById}/${id}`
    )
    return response.data
}

export const followUser = async (
    idUser : string,
    idUserFollow : string
) => {
    const data = {
        idUser,
        idUserFollow
    }
    const response = await axiosClient.post<IInforUserSuccessPayload>
    (
        apiRouter.followUser, data
    )
    return response.data
}

export const userCanKnow = async ( 
    id : string 
) => {
    try {
        const response = await axiosClient.get<IUserSuccessPayload>(
            `${apiRouter.userCanKnow}/${id}`
        )
        return response.data
    } catch (error) {
        console.log(error)
    }
}