import { IUser } from "@/model/user";

export interface IChat{
    _id :string;
    chatName :string | null;
    groupAdmin : IUser | null;
    image :string | null;
    isGroupChat :boolean;
    users :IUser[];
    createdAt :string;
    updatedAt :string;
    __v :number;
    latestMessage: {
        _id : string;
        chat : string;
        users : string;
        nameUser: string;
        content : string;
        createdAt : string;
        updatedAt :string;
        __v :number;
    }
}
export interface IChatSuccessPayload {
    status :boolean;
    data :IChat[];
    message?:string;
}

export interface IChatDeletePayload {
    status :boolean;
    message :string;
}
