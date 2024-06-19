import { getPostByIdUserRequest, getPostRequest } from "@/redux/post/actions";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
export const usePostDispatch = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const router = useRouter();
  const dispatchPostRequest = () => {
    if (router.pathname === "/profile/[id]") {
      dispatch(
        getPostByIdUserRequest({
          id: router.query.id as string,
        })
      );
    } else {
      dispatch(getPostRequest());
    }
  };

  return dispatchPostRequest;
};
