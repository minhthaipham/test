import React, { createContext, useContext, ReactNode } from "react";
import { Socket, io } from "socket.io-client";
import { useAuth } from "./AuthContext";
import { IUser } from "@/model/user";

type SocketContextType = Socket | undefined;

const SocketContext = createContext<SocketContextType>(undefined);

type SocketProviderProps = {
  url: string;
  children: ReactNode;
};

export const useSocket = (): SocketContextType => {
  return useContext(SocketContext);
};

export const SocketProvider: React.FC<SocketProviderProps> = ({
  url,
  children,
}) => {
  const { user } = useAuth();
  const [onlineUsers, setOnlineUsers] = React.useState<IUser[]>([]);
  const socket = io(url);
  React.useEffect(() => {
    if (socket && user?._id) {
      socket.emit("online", user?._id);
      socket.on("getUsers", (users: IUser[]) => {
        setOnlineUsers(users);
      });
    }
  }, [socket, user?._id]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
