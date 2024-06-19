import React from "react";
import {
  Avatar,
  Drawer,
  Fab,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import {
  Add,
  ArrowBack,
  ContactPage,
  MoreVert,
  PeopleOutline,
  PhoneBluetoothSpeaker,
  Restore,
  Search,
} from "@mui/icons-material";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import GroupsIcon from "@mui/icons-material/Groups";
import SideBarSearchUser from "./SideBarSearchUser";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import InputSearch from "../InputSearch/InputSearch";
import { useAuth } from "@/context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { getChatRequest } from "@/redux/chat/action";
import { listChatByIdUser } from "@/redux/chat/selectors";
import ListUserChat from "./ListUserChat";
import { useSocket } from "@/context/SocketContext";
import { IUser } from "@/model/user";
import PopupGroup from "../Group/PopupGroup";
import ListUserChatGroup from "./ListUserChatGroup";
import { IChat } from "@/interface/chat";
const SideBarChat = () => {
  const listChat = useSelector(listChatByIdUser);
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  const handleBack = () => {};
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const [onlineUsers, setOnlineUsers] = React.useState<IUser[]>([]);
  const socket = useSocket();
  const { user } = useAuth();
  React.useEffect(() => {
    dispatch(
      getChatRequest({
        id: user?._id,
      })
    );

    if (socket && user?._id) {
      socket.emit("online", user?._id);
      socket.on("getUsers", (users: IUser[]) => {
        setOnlineUsers(users);
      });
    }
  }, [socket, user?._id]);
  React.useEffect(() => {
    if (socket) {
      socket.on("accessChat", (data: IChat) => {
        dispatch(getChatRequest({ id: user?._id }));
      });
    }
  }, [listChat]);
  return (
    <div className=" h-full w-full ">
      <div className="flex items-center justify-between px-6 pt-6">
        <div onClick={handleBack}>
          <h1 className="text-white text-bold text-2xl cursor-pointer">
            {user?.fullName}
          </h1>
        </div>
        <div className="flex items-center">
          <Fab
            color="primary"
            aria-label="add"
            size="small"
            onClick={handleOpen}
          >
            <Add />
          </Fab>
        </div>
      </div>
      <div className="mt-5 px-6">
        <SideBarSearchUser onlineUsers={onlineUsers} />
      </div>
      <div>
        <div className="mt-5 px-6">
          <div className="flex items-center justify-between ">
            <AccessAlarmIcon className="text-white" fontSize="large" />
            <GroupsIcon className="text-white" fontSize="large" />
            <PhoneInTalkIcon className="text-white" fontSize="large" />
            <ContactPage className="text-white" fontSize="large" />
          </div>
        </div>
        {listChat?.map((item, index) =>
          !item?.isGroupChat ? (
            item?.users?.map(
              (u, index) =>
                u?._id !== user?._id && (
                  <ListUserChat
                    id={item._id}
                    key={index}
                    users={u}
                    onlineUsers={onlineUsers}
                    item={item}
                  />
                )
            )
          ) : (
            <ListUserChatGroup key={item._id} item={item} />
          )
        )}
      </div>
      {/* )} */}
      <PopupGroup open={open} handleClose={handleClose} />
    </div>
  );
};

export default SideBarChat;
