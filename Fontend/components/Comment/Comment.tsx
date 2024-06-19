import React from "react";
import moment from "moment";
import {
  Reply,
  Favorite as FavoriteIcon,
  MoreVert,
  AutoFixHigh,
  DeleteForever,
} from "@mui/icons-material";
import { Avatar, ListItemIcon, MenuItem } from "@mui/material";
import {
  deleteComment,
  editComment,
  likeComment,
  replyComment,
} from "@/api/commentApi";
import { useAuth } from "@/context/AuthContext";
import { IComment } from "@/interface/commment";
import { usePostDispatch } from "@/libs/hook/usePost";
import MenuContainer from "../Menu/MenuContainer";
import { toast } from "react-toastify";

interface CommentProps {
  comment: IComment;
  children: React.ReactNode;
  setShowReply: React.Dispatch<React.SetStateAction<boolean>>;
}
const Comment = ({ comment, children, setShowReply }: CommentProps) => {
  const { user } = useAuth();
  const [showInputReply, setShowInputReply] = React.useState(false);
  const [content, setContent] = React.useState("");
  const [contentEdit, setContentEdit] = React.useState(comment.content || "");
  const dispatchPostRequest = usePostDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [edit, setEdit] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (content === "") return;
    try {
      const res = await replyComment(user?._id, content, comment._id);
      if (res.status === 200) {
        dispatchPostRequest();
        setContent("");
        setShowInputReply(false);
        setShowReply(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLikeComment = async () => {
    try {
      const res = await likeComment(user?._id, comment._id);
      if (res.status === 200) {
        dispatchPostRequest();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async () => {
    try {
      const res = await deleteComment(comment._id, user?._id);
      if (res.status === 200) {
        dispatchPostRequest();
        toast("Delete comment success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditComment = async (e: any) => {
    e.preventDefault();
    try {
      const res = await editComment(comment._id, contentEdit, user?._id);
      console.log(res);
      if (res.status === 200) {
        dispatchPostRequest();
        setEdit(false);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  React.useEffect(() => {
    setContentEdit(comment.content);
  }, [comment.content]);

  return (
    <div className="flex items-start space-x-2 w-full" key={comment._id}>
      <Avatar
        src={comment?.creator?.avatar}
        alt="avatar"
        className="w-10 h-10 rounded-full"
      />
      <div className="flex flex-col  w-full ">
        <div className="flex items-center justify-between bg-[#F2F3F5] px-3 py-2 rounded-2xl">
          {edit ? (
            <div>
              <form onSubmit={handleEditComment}>
                <input
                  type="text"
                  value={contentEdit}
                  onChange={(e) => setContentEdit(e.target.value)}
                  className=" rounded-md w-full bg-[#F2F3F5] focus:outline-none "
                />
              </form>
              <div className="flex items-center gap-3">
                <button
                  className="text-blue-500 text-sm"
                  onClick={() => setEdit(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col">
                <span className="font-semibold">
                  {comment?.creator?.fullName}
                </span>
                <span className="text-base">{comment?.content}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span
                  className="text-sm cursor-pointer"
                  onClick={handleLikeComment}
                >
                  <FavoriteIcon
                    color={
                      comment?.likes?.find((like) => like === user?._id)
                        ? "error"
                        : "inherit"
                    }
                  />
                </span>
                <MoreVert
                  className="cursor-pointer"
                  onClick={(e: any) => setAnchorEl(e.currentTarget)}
                />
              </div>
            </>
          )}
        </div>
        <div className="ml-4 space-x-2">
          <span
            className="font-medium text-sm cursor-pointer"
            onClick={() => setShowInputReply(!showInputReply)}
          >
            Reply
          </span>
          <span className="text-sm text-gray-400">
            {moment(comment?.createdAt).fromNow()}
          </span>
        </div>
        {children}

        {showInputReply && (
          <div className=" py-2 flex items-center space-x-3">
            <Avatar
              // src={comment.creator.avatar}
              src={user.avatar}
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
            <div className="w-full relative">
              <form className="" onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={content}
                  placeholder={`@${comment?.creator?.fullName}`}
                  onChange={(e) => setContent(e.target.value)}
                  className="p-2 rounded-md w-full bg-[#F2F3F5] focus:outline-none "
                />
                <button
                  type="submit"
                  className="absolute top-[50%] right-0 translate-y-[-50%] mr-3"
                >
                  <Reply className="text-blue-500" />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <MenuContainer
        anchorEl={anchorEl}
        open={open}
        handleClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => setEdit(true)}>
          <ListItemIcon>
            <AutoFixHigh fontSize="small" />
          </ListItemIcon>
          Edit Comment
        </MenuItem>
        <MenuItem onClick={handleDeleteComment}>
          <ListItemIcon>
            <DeleteForever fontSize="small" />
          </ListItemIcon>
          Delete Comment
        </MenuItem>
      </MenuContainer>
    </div>
  );
};

export default Comment;
