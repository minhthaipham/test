import { apiRouter } from "@/config/apiRouter";
import { IPostSuccessPayload } from "@/interface/post";
import axiosClient from "@/libs/api/axiosClient";

export const getPost = async () => {
  try {
    const response = await axiosClient.get<IPostSuccessPayload>(apiRouter.getPost);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPostByIdUser = async (id: string) => {
  const response = await axiosClient.get<IPostSuccessPayload>(`${apiRouter.getPostByIdUser}/${id}`);
  return response.data;
}
