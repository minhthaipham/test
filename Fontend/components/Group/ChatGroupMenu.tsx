import React from "react";
import { styled, alpha } from "@mui/material/styles";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { Delete, Logout } from "@mui/icons-material";
import RenameGroupModal from "./RenameGroupModal";
import { useSelector, useDispatch } from "react-redux";
import { inforChat, listChatByIdUser } from "@/redux/chat/selectors";
import AddMembersGroupModal from "./AddMembersGroupModal";
import {
  changeStatusCheck,
  deleteGroupRequest,
  leaveGroupRequest,
} from "@/redux/chat/action";
import { useAuth } from "@/context/AuthContext";
import { deleteGroup } from "@/api/chat";
const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const ChatGroupMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openReNameGroupModal, setOpenReNameGroupModal] = React.useState(false);
  const [openAddMembers, setOpenAddMembers] = React.useState(false);
  const dispatch = useDispatch();
  const chat = useSelector(inforChat);
  const { user } = useAuth();
  const open = Boolean(anchorEl);
  const handleClick = () => {
    setAnchorEl(
      anchorEl ? null : document.getElementById("demo-customized-button")
    );
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpenModalRename = () => {
    setOpenReNameGroupModal(true);
    setAnchorEl(null);
  };
  const handleCloseModal = () => {
    setOpenReNameGroupModal(false);
  };
  const handleOpenAddMembers = () => {
    setOpenAddMembers(true);
    setAnchorEl(null);
  };
  const handleCloseAddMembers = () => {
    setOpenAddMembers(false);
  };
  const handleDeleteGroup = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this group?"
    );
    if (confirmDelete) {
      dispatch(
        deleteGroupRequest({
          chatId: chat._id,
        })
      );
      // try {
      //   const res = await deleteGroup(chat._id);
      //   console.log(res);
      //   if (res.status) {
      //     dispatch(changeStatusCheck());
      //   }
      // } catch (error) {}
    }
    setAnchorEl(null);
  };
  const handleLeaveRoom = () => {
    const confirmLeave = window.confirm(
      "Are you sure you want to leave this group?"
    );
    if (confirmLeave) {
      dispatch(
        leaveGroupRequest({
          chatId: chat._id,
        })
      );
    }
    setAnchorEl(null);
  };

  return (
    <div className="cursor-pointer">
      <MoreVertOutlinedIcon
        id="demo-customized-button"
        aria-controls={anchorEl ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      />
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem disableRipple onClick={handleOpenModalRename}>
          <div className="my-0 ml-0 mr-[5px]">
            <EditIcon />
          </div>
          Rename group
        </MenuItem>
        <MenuItem disableRipple onClick={handleOpenAddMembers}>
          <div className="my-0 ml-0 mr-[5px]">
            <PersonAddAltIcon />
          </div>
          Add people
        </MenuItem>
        {user._id === chat?.groupAdmin?._id && (
          <MenuItem
            disableRipple
            onClick={handleDeleteGroup}
            sx={{
              color: "red",
            }}
          >
            <div className="my-0 ml-0 mr-[5px]">
              <Delete />
            </div>
            Delete group
          </MenuItem>
        )}
        <MenuItem
          disableRipple
          onClick={handleLeaveRoom}
          sx={{
            color: "red",
          }}
        >
          <div className="my-0 ml-0 mr-[5px]">
            <Logout />
          </div>
          Leave group
        </MenuItem>
      </StyledMenu>
      <RenameGroupModal
        open={openReNameGroupModal}
        handleClose={handleCloseModal}
        chat={chat}
      />
      <AddMembersGroupModal
        open={openAddMembers}
        handleClose={handleCloseAddMembers}
        chat={chat}
      />
    </div>
  );
};

export default ChatGroupMenu;
