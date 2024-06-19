import React from "react";
import ListPost from "../ListPost/ListPost";
import { useRouter } from "next/router";
import { getPostByIdUserRequest } from "@/redux/post/actions";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "@/context/AuthContext";
import { loadingPost } from "@/redux/post/selectors";
const ListPostOfUser = () => {
  const { user } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();
  // const loading = useSelector(loadingPost);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  React.useEffect(() => {
    if (router.query.id) {
      dispatch(
        getPostByIdUserRequest({
          id: router.query.id as string,
        })
      );
    }
  }, [router.query.id, dispatch, user]);
  return (
    <div>
      {isLoading ? (
        <div className="animate-pulse flex items-center justify-center">
          <img
            src="https://i.pinimg.com/originals/3d/6a/a9/3d6aa9082f3c9e285df9970dc7b762ac.gif"
            alt="loading"
          />
        </div>
      ) : (
        <ListPost />
      )}
    </div>
  );
};

export default ListPostOfUser;
