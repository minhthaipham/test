import { IUser } from "@/model/user";
import React from "react";
import { Avatar, Badge, styled } from "@mui/material";
import { useAuth } from "@/context/AuthContext";
import { useDispatch } from "react-redux";
import { createChatRequest, getChatRequest } from "@/redux/chat/action";
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
interface IListUserSearchChat {
  listUser: IUser[];
  debouncedValue: string;
  setInputValue: (value: string) => void;
  setDebouncedValue: (value: string) => void;
  onlineUsers: IUser[];
}
const ListUserSearchChat: React.FC<IListUserSearchChat> = ({
  listUser,
  debouncedValue,
  setInputValue,
  setDebouncedValue,
  onlineUsers,
}) => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const handleGetChat = (idUser: string) => {
    dispatch(
      createChatRequest({
        ida: user?._id as string,
        idb: idUser,
      })
    );
    setInputValue("");
    setDebouncedValue("");
  };
  return (
    <div>
      {debouncedValue.length > 0 && listUser.length > 0 && (
        <div className="absolute top-12 w-full  bg-white rounded-xl px-4 py-2 z-50">
          {listUser.map((users, i) => (
            <>
              <div
                key={i}
                className="mt-3 cursor-pointer hover:bg-zinc-200  px-6 py-2"
                onClick={() => {
                  handleGetChat(users._id);
                }}
              >
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
                    <Avatar
                      alt={users.fullName}
                      src={users.avatar}
                      sx={{ width: 32, height: 32 }}
                    />
                  </StyledBadge>
                  <div>
                    <p className="text-black text-bold text-xl  ml-3">
                      {users?.fullName}
                    </p>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListUserSearchChat;
