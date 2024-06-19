import React from "react";
import { Avatar, Badge, styled } from "@mui/material";
import { IUser } from "@/model/user";
import { IChat } from "@/interface/chat";
import { useAuth } from "@/context/AuthContext";
import { useDispatch } from "react-redux";
import { getChatByIdRequest } from "@/redux/chat/action";
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
interface IListUserChatGroup {
  key: string;
  item: IChat;
}
const ListUserChatGroup: React.FC<IListUserChatGroup> = ({ key, item }) => {
  const dispatch = useDispatch();
  const LatestMessage = () => {
    // if (item?.latestMessage) {
    //   if (
    //     item?.latestMessage?.users === result?._id ||
    //     user?.latestMessage?.users === result?._id
    //   ) {
    //     return (
    //       "Bạn : " + item?.latestMessage?.content ||
    //       user?.latestMessage?.content
    //     );
    //   } else {
    //     return (
    //       item?.latestMessage?.nameUser +
    //         " : " +
    //         item?.latestMessage?.content ||
    //       user?.latestMessage?.nameUser + " : " + user?.latestMessage?.content
    //     );
    //   }
    // } else {
    //   return "";
    // }
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
      key={key}
      className="mt-3 cursor-pointer hover:bg-[rgba(0,0,0,0.1)] px-6 py-2"
      onClick={() => {
        handleGetChat(item._id);
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={item?.image || ""}
            className="w-14 h-14 object-cover rounded-full"
            alt={item?.chatName || ""}
          />
          <div className="flex flex-col">
            <p className="text-white text-bold text-xl ml-3 ">
              {item?.chatName}
            </p>
            <p className="text-white text-bold text-sm  opacity-[0.7]">
              {/* {LatestMessage()} */}
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

export default ListUserChatGroup;
