import { IUser } from "@/model/user";

export interface IMess {
    _id : string;
    chat : string;
    users : IUser;
    nameUser : string | null;
    type : string;
    content : string;
    createdAt :string;
    updatedAt :string;
    __v :number;
}

export interface IMessSuccessPayload {
    status : boolean;
    data : IMess[];
}

export interface IMessPayload {
    status : boolean;
    data : IMess;
}
