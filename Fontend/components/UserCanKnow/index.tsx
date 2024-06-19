import { userCanKnow } from "@/api/userApi";
import { useAuth } from "@/context/AuthContext";
import { IUser } from "@/model/user";
import { Avatar, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import React from "react";
import { useSocket } from "@/context/SocketContext";
import { List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import {
  Image as ImageIcon,
  Work as WorkIcon,
  BeachAccess as BeachAccessIcon,
} from "@mui/icons-material";
import Link from "next/link";
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
interface IUserCanKnow {
  onlineUsers: IUser[];
}
const UserCanKnow: React.FC<IUserCanKnow> = ({ onlineUsers }) => {
  const { user } = useAuth();
  const socket = useSocket();
  const [users, setUsers] = React.useState<IUser[]>([]);
  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        if (user?._id) {
          const res = await userCanKnow(user?._id);
          if (res?.status) {
            setUsers(res.data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [user?._id]);

  return (
    <div className="flex-1 ">
      <div className="flex items-center justify-center">
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            position: "fixed",
            top: 0,
            mt: 10,
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            Users you may know
          </Typography>
          {users?.map((user) => (
            <ListItem key={user._id}>
              <ListItemAvatar>
                <Link href={`/profile/${user._id}`}>
                  {/* <Avatar
                    alt={user.fullName}
                    src={user.avatar}
                    sx={{ width: 32, height: 32 }}
                  /> */}
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant={
                      onlineUsers.includes(user._id as unknown as IUser)
                        ? "dot"
                        : "standard"
                    }
                  >
                    <Avatar
                      alt={user.fullName}
                      src={user.avatar}
                      sx={{ width: 32, height: 32 }}
                    />
                  </StyledBadge>
                </Link>
              </ListItemAvatar>
              <ListItemText
                primary={user.fullName}
                secondary={user.followers.length + " followers"}
              />
            </ListItem>
          ))}
        </List>
      </div>
      <div></div>
    </div>
  );
};

export default UserCanKnow;
