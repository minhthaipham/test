import { IUser } from "@/model/user";

export interface IListSearchUser {
    listUser: IUser[];
    debouncedValue: string;
    setInputValue : (value : string) => void;
    setDebouncedValue : (value : string) => void;
}