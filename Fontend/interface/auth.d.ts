import { IUser } from "@/model/user";

export interface IIUserSuccessPayload {
    status: boolean;
    message: string;
    user: IUser;
    token: string;
}

export interface IUserSuccess {
    status: boolean;
    data: IUser;
}