import { apiRouter } from "@/config/apiRouter"
import { IIUserSuccessPayload, IUserSuccess } from "@/interface/auth"
import { IInforUserSuccessPayload } from "@/interface/user"
import axiosClient from "@/libs/api/axiosClient"

export const loginByEmail = (email: string, password: string) => {
    const data = {
        email,
        password
    }
        const response =  axiosClient.post<IIUserSuccessPayload>(apiRouter.login, data)
        return response
}

export const registerByEmail = (fullName : string ,email: string, password: string , gender : string) => {
    const data = {
        fullName,
        email,
        password,
        gender
    }
        const response =  axiosClient.post<IIUserSuccessPayload>(apiRouter.register, data)
        return response
}

export const loginByToken = (token : string) => {
    const data = {
        token
    }
        const response =  axiosClient.post<IIUserSuccessPayload>(apiRouter.loginByToken, data)
        return response
}

export const editProfileUser = (
    avatar : string,
    fullName : string,
    mobile : string,
    address : string,
    story : string,
    website : string,
    id : string
) => {
    const data = {
        avatar,
        fullName,
        mobile,
        address,
        story,
        website,
    }

    const response = axiosClient.post<IUserSuccess>(`${apiRouter.editUser}/${id}`, data)
    return response
}

export const getUserByIdApi =  (id : string) => {
    const response =  axiosClient.get<IInforUserSuccessPayload>(
        `${apiRouter.getUserById}/${id}`
    )
    return response
}