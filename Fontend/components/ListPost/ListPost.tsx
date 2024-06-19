import React, { Fragment } from "react";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  MenuItem,
  ListItemIcon,
  Divider,
} from "@mui/material";
import {
  Close,
  Favorite as FavoriteIcon,
  MoreHoriz,
  Share as ShareIcon,
  AutoFixHigh,
  Bookmark,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  getPost,
  getPostByIdUserRequest,
  getPostRequest,
} from "@/redux/post/actions";
import { IPost } from "@/interface/post";
import MenuContainer from "../Menu/MenuContainer";
import ModalCreatePost from "../CreatePost/ModalCreatePost";
import { useRouter } from "next/router";
import Link from "next/link";
import { deletePost, likePost } from "@/api/postApi";
import { useAuth } from "@/context/AuthContext";
import { listPost, listPostByIdUser } from "@/redux/post/selectors";
import CommentContainer from "../Comment/CommentContainer";
import { toast } from "react-toastify";
import { usePostDispatch } from "@/libs/hook/usePost";
import { useSocket } from "@/context/SocketContext";
import { IComment } from "@/interface/commment";
export default function ListPost() {
  const socket = useSocket();
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const router = useRouter();
  // const listPostSL = useSelector(listPost);
  // const listPostByIDSel = useSelector(listPostByIdUser);
  // const listPostName =
  //   router.pathname === "/profile/[id]" ? listPostByIDSel : listPostSL;
  const [listPostName, setListPostName] = React.useState<IPost[]>([]);

  const listPostSL = useSelector(listPost);
  const listPostByIDSel = useSelector(listPostByIdUser);

  React.useEffect(() => {
    const updatedListPostName =
      router.pathname === "/profile/[id]" ? listPostByIDSel : listPostSL;
    setListPostName(updatedListPostName);
  }, [router.pathname, listPostSL, listPostByIDSel]);
  const open = Boolean(anchorEl);
  const [openModal, setOpenModal] = React.useState(false);
  const [likePosted, setLikePosted] = React.useState(false);
  const dispatchPostRequest = usePostDispatch();
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();
  const handleGetIdPost = (post: IPost) => {
    dispatch(
      getPost({
        content: post.content,
        image: post.image,
        idPost: post._id,
      })
    );
  };

  const handleLikePost = async (idPost: string) => {
    socket?.emit("join", idPost);
    try {
      const res = await likePost(idPost, user?._id);
      if (res.status === 200) {
        if (res.data.status) {
          dispatchPostRequest();
          socket?.emit("likePost", { post: res.data.data, idPost });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(listPostName, "listPostName");
  const handleDeletePost = async (idPost: string) => {
    const result = confirm("Are you sure you want to delete this post?");
    if (result) {
      try {
        const res = await deletePost(user?._id, idPost);
        if (res.status === 200) {
          if (res.data.status) {
            toast(res.data.message);
            dispatchPostRequest();
          } else {
            toast.error(res.data.message);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  React.useEffect(() => {
    if (socket) {
      if (socket.connected) {
        socket.on("getPosts", handleGetPosts);
      } else {
        socket.on("connect", () => {
          socket.on("getPosts", handleGetPosts);
        });
      }
    }

    // Clean up listener
    return () => {
      if (socket) {
        socket.off("getPosts", handleGetPosts);
      }
    };
  }, [socket]);
  const handleGetPosts = (data: IPost) => {
    console.log(data);
    setListPostName((prev) => [data, ...prev]);
  };
  const handleReceiveLike = (data: IPost) => {
    console.log(data);
    setListPostName((prevList) => {
      // Tìm post có id tương ứng trong danh sách các bài post hiện tại
      const updatedList = prevList.map((post) => {
        if (post._id === data._id) {
          // Cập nhật post với dữ liệu mới voi commentPosted duoc nhan o duoi
          return { ...data, comments: post.comments };
        }
        return post;
      });
      return updatedList;
    });
  };

  React.useEffect(() => {
    if (socket) {
      socket.on("receiveLike", handleReceiveLike);
    }

    // Clean up listener
    return () => {
      if (socket) {
        socket.off("receiveLike", handleReceiveLike);
      }
    };
  }, [socket]);

  const handleReceiveComment = (comment: IComment, idPost: string) => {
    console.log(comment, idPost);
    setListPostName((prevList) => {
      // Tìm post có id tương ứng trong danh sách các bài post hiện tại
      const updatedList = prevList.map((post) => {
        if (post._id === idPost) {
          // Cập nhật post với dữ liệu mới
          return { ...post, comments: [...post.comments, comment] };
        }
        return post;
      });
      return updatedList;
    });
  };
  React.useEffect(() => {
    if (socket) {
      socket.on("receiveComment", handleReceiveComment);
    }

    // Clean up listener
    return () => {
      if (socket) {
        socket.off("receiveComment", handleReceiveComment);
      }
    };
  }, [socket]);
  return (
    <div>
      {listPostName?.length > 0 ? (
        listPostName?.map((post, index) => (
          <div key={index} onClick={() => handleGetIdPost(post)}>
            <Card
              sx={{
                maxWidth: 600,
                margin: "0 auto",
                marginTop: "1rem",
                boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                borderRadius: "10px",
                "&:hover": {
                  boxShadow: "0 0 10px rgba(0,0,0,0.5)",
                },
              }}
              className="my-3"
            >
              <CardHeader
                titleTypographyProps={{
                  fontWeight: "bold",
                }}
                avatar={
                  <Link href={`/profile/${post?.creator?._id}`}>
                    <Avatar
                      src={post?.creator?.avatar}
                      alt={post?.creator?.fullName}
                      className="cursor-pointer"
                    >
                      {post?.creator?.fullName}
                    </Avatar>
                  </Link>
                }
                action={
                  <div
                    aria-label="settings"
                    className="space-x-2 cursor-pointer"
                  >
                    <MoreHoriz onClick={handleClick} />
                    <Close onClick={() => handleDeletePost(post._id)} />
                  </div>
                }
                title={post.creator?.fullName}
                subheader={moment(post.createdAt).fromNow()}
              />
              {post?.image && (
                <CardMedia
                  component="img"
                  image={post?.image}
                  alt={post?.content}
                  className="cursor-pointer
            object-cover
          "
                />
              )}
              <CardContent>
                <Typography variant="h6" color="text.secondary">
                  {post.content}
                </Typography>
              </CardContent>
              <div className="flex items-center justify-between">
                <CardActions disableSpacing>
                  <IconButton
                    aria-label="add to favorites"
                    onClick={() => handleLikePost(post._id)}
                  >
                    <FavoriteIcon
                      color={
                        post?.likes.find((like) => like === user?._id)
                          ? "error"
                          : "inherit"
                      }
                    />
                  </IconButton>
                </CardActions>
                <div className="mr-3 cursor-pointer">
                  {post?.likes.length}{" "}
                  {post?.likes.length > 1 ? "likes" : "like"}
                  <span className="ml-3">
                    {post?.comments.length}{" "}
                    {post?.comments.length > 1 ? "comments" : "comment"}
                  </span>
                </div>
              </div>
              <Divider
                sx={{
                  width: "80%",
                  margin: "0px auto",
                }}
              />
              <CommentContainer comment={post?.comments} />
            </Card>
          </div>
        ))
      ) : (
        <div className="animate-pulse">
          <img
            src="https://i.pinimg.com/originals/3d/6a/a9/3d6aa9082f3c9e285df9970dc7b762ac.gif"
            alt="loading"
          />
        </div>
      )}

      <MenuContainer anchorEl={anchorEl} open={open} handleClose={handleClose}>
        {router.pathname === "/profile/[id]" ? (
          <MenuItem onClick={() => setOpenModal(true)}>
            <ListItemIcon>
              <AutoFixHigh fontSize="small" />
            </ListItemIcon>
            Edit Post
          </MenuItem>
        ) : (
          <MenuItem>
            <ListItemIcon>
              <Bookmark fontSize="small" />
            </ListItemIcon>
            Save Post
          </MenuItem>
        )}
      </MenuContainer>
      <ModalCreatePost open={openModal} onClose={handleCloseModal} />
    </div>
  );
}

// export default ListPost;
