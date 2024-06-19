import { IPost } from "@/interface/post";
import { Dispatch, SetStateAction } from "react";

export interface IModalCreatePost {
    open : boolean;
    onClose : () => void;
}