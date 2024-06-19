import { IUser } from "@/model/user";

export interface IUserSuccessPayload {
    status: boolean;
    data : IUser[];
}

export interface IInforUserSuccessPayload {
    status: boolean;
    data : IUser;
    message?: string;
}

