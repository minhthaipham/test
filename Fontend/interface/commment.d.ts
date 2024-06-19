import { IUser } from "@/model/user";

export interface ICommentSuccesPayload {
    status : boolean,
    data : IComment,
    message? : string,
}

export interface IComment {
    _id :string;
    content :string;
    creator :IUser;
    replies : IReply[],
    likes :[],
    postId :string;
    postUserId :string;
    createdAt :string;
    updatedAt :string;
}

export interface IReply {
    _id :string;
    content :string;
    creator :IUser;
    likes :[],
    postId :string;
    postUserId :string;
    createdAt :string;
    updatedAt :string;
}


