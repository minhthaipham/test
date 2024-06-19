import { IUser } from "@/model/user";

export interface IEditUserProps {
    open: boolean;
    onClose: () => void;
    setProfile: React.Dispatch<React.SetStateAction<IUser>>;
}