import React from "react";
import { Close, Search } from "@mui/icons-material";
import { IUser } from "@/model/user";
import { searchInforUser } from "@/api/userApi";
import { useAuth } from "@/context/AuthContext";
import ListUserSearchChat from "./ListUserSearchChat";
import { useSocket } from "@/context/SocketContext";
import { searchInforUserChat } from "@/api/chat";
import { useDispatch } from "react-redux";
import { getChatRequest } from "@/redux/chat/action";
interface ISideBarSearchUser {
  onlineUsers: IUser[];
}
const SideBarSearchUser: React.FC<ISideBarSearchUser> = ({ onlineUsers }) => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = React.useState("");
  const [debouncedValue, setDebouncedValue] = React.useState("");
  const [listUser, setListUser] = React.useState<IUser[]>([]);

  let timeoutId: NodeJS.Timeout;
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setDebouncedValue(newValue);
    }, 200);
  };
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await searchInforUserChat(debouncedValue, user._id);
        console.log(res);
        if (res.status) {
          setListUser(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (debouncedValue) {
      fetchData();
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [debouncedValue]);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search"
        value={inputValue}
        onChange={handleInputChange}
        className="bg-white rounded-full w-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
      />
      {/* <Search className="absolute top-[50%] left-0 translate-y-[-50%] ml-2 " /> */}
      {debouncedValue.length > 0 ? (
        <Close
          className="absolute right-2 text-gray-500 cursor-pointer top-2"
          onClick={() => {
            setInputValue("");
            setDebouncedValue("");
          }}
        />
      ) : (
        <Search className="absolute top-[50%] left-0 translate-y-[-50%] ml-2 " />
      )}
      <ListUserSearchChat
        listUser={listUser}
        debouncedValue={debouncedValue}
        setInputValue={setInputValue}
        setDebouncedValue={setDebouncedValue}
        onlineUsers={onlineUsers}
      />
    </div>
  );
};

export default SideBarSearchUser;
