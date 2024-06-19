import { IUser } from "@/model/user";
import { IComment } from "./commment";

export interface IPostSuccessPayload {
    status :boolean;
    data :IPost[];
    message?:string;
}

export interface IPostSuccessPayloadById extends IPostSuccessPayload {
    data : IPost;
}

export interface IDeletePostSuccessPayload {
    status :boolean;
    message :string
}

export interface IPost {
    _id :string;
    content :string;
    image : string;
    likes :[],
    comments : IComment[],
    creator :IUser;
    createdAt :string;
    updatedAt :string;
    __v :number;
}
