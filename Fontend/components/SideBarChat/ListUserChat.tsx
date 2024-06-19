import React from "react";
import { Avatar, Badge, styled } from "@mui/material";
import { IUser } from "@/model/user";
import { IChat } from "@/interface/chat";
import { useAuth } from "@/context/AuthContext";
import { useDispatch } from "react-redux";
import { getChatByIdRequest } from "@/redux/chat/action";
import { useSocket } from "@/context/SocketContext";
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));
interface IListUserChat {
  id: string;
  users: IUser;
  onlineUsers: IUser[];
  item: IChat;
}
const ListUserChat: React.FC<IListUserChat> = ({
  id,
  users,
  onlineUsers,
  item,
}) => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  // const [quantity, setQuantity] = React.useState<IChat[]>([]);
  // const socket = useSocket();
  // React.useEffect(() => {
  //   if (socket) {
  //     socket.on("notify", (data: IChat) => {
  //       setQuantity((prev) => [...prev, data]);

  //     });
  //   }
  // }, []);
  const LatestMessage = () => {
    if (item?.latestMessage?.users === user?._id) {
      // return "You: " + item?.latestMessage?.content;
      if (item?.latestMessage?.content.length > 20) {
        return "You: " + item?.latestMessage?.content.slice(0, 20) + "...";
      }
    } else {
      if (item?.latestMessage?.content.length > 20) {
        return item?.latestMessage?.content.slice(0, 20) + "...";
      }
    }
  };
  const handleGetChat = (id: string) => {
    dispatch(
      getChatByIdRequest({
        id,
      })
    );
  };
  return (
    <div
      className="mt-3 cursor-pointer hover:bg-[rgba(0,0,0,0.1)] px-6 py-2"
      onClick={() => {
        handleGetChat(id);
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant={
              onlineUsers.includes(users._id as unknown as IUser)
                ? "dot"
                : "standard"
            }
          >
            {/* <Avatar
              alt={users.fullName}
              src={users.avatar}
              sx={{ width: 32, height: 32 }}
            /> */}
            <img
              alt={users.fullName}
              src={users.avatar}
              className="w-14 h-14 object-cover rounded-full"
            />
          </StyledBadge>
          {/* <h1 className="text-white text-bold text-xl">{user?.fullName}</h1> */}
          <div className="flex flex-col items-start">
            <p className="text-white text-bold text-xl ml-3 ">
              {users?.fullName}
            </p>
            <p className="text-white text-bold text-sm ml-3 opacity-[0.7]">
              {LatestMessage()}
              {/* {item?.latestMessage?.content} */}
            </p>
          </div>
        </div>
        {/* {noti > 0 && (
          <div
            className="rounded-full  w-[25px] h-[25px] bg-red-500
          flex items-center justify-center text-white font-bold text-[18px]
        "
          >
            {noti}
          </div>
        )} */}

        {/* {quantity.length > 0 && (
          <div
            className="rounded-full  w-[25px] h-[25px] bg-red-500
            flex items-center justify-center text-white font-bold text-[18px]
          "
          >
            {quantity.length}
          </div>
        )} */}

        {/* {!check && noti > 0 ? (
          <div
            className="rounded-full  w-[25px] h-[25px] bg-red-500
          flex items-center justify-center text-white font-bold text-[18px]
        "
          >
            {noti}
          </div>
        ) : null} */}
      </div>
    </div>
  );
};

export default ListUserChat;
