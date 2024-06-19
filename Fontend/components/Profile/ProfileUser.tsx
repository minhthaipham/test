import React from "react";
import { Avatar, Divider } from "@mui/material";
import ModalShowImageUser from "./ModalShowImageUser";
import { useRouter } from "next/router";
import { followUser, getUserById } from "@/api/userApi";
import { IUser } from "@/model/user";
import ListPostOfUser from "../ListPostOfUser/ListPostOfUser";
import ModalEditUser from "../EditUser/ModalEditUser";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";

const ProfileUser = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [profile, setProfile] = React.useState<IUser>({} as IUser);
  const [title, setTitle] = React.useState("");
  const handleClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    if (router.query.id) {
      const fetchData = async () => {
        try {
          const res = await getUserById(router.query.id as string);
          if (res.status) {
            setProfile(res.data);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [router.query.id]);

  React.useEffect(() => {
    if (router.query.id === user._id) {
      setTitle("Edit Profile");
    } else {
      if (profile.followers?.includes(user._id)) {
        setTitle("Unfollow");
      } else {
        setTitle("Follow");
      }
    }
  }, [router.query.id, user._id, profile.followers]);

  const handleUser = async () => {
    if (router.query.id === user._id) {
      setOpenModal(true);
    } else {
      try {
        const res = await followUser(user._id, router.query.id as string);
        if (res.status) {
          setProfile(res.data);
          toast(res.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCloseModal = React.useCallback(() => {
    setOpenModal(false);
  }, []);

  return (
    <div>
      <div className="mt-20 flex items-center justify-center ">
        <div className="mx-5 ">
          <img
            onClick={() => setOpen(true)}
            src={profile.avatar}
            alt="profile"
            className="  md:w-40 md:h-40 rounded-full cursor-pointer"
          />
        </div>
        <div className="">
          <div className="space-x-10 ">
            <span className="text-base font-semibold md:text-2xl  text-gray-700">
              {profile.fullName}
            </span>
            <button
              onClick={handleUser}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                {title}
              </span>
            </button>
          </div>
          <div className="space-x-10 flex items-center">
            <p className="text-base  md:text-2xl font-medium text-gray-700">
              posts
            </p>
            <p className="text-base  md:text-2xl font-medium text-gray-700">
              {profile.followers?.length} followers
            </p>
          </div>
          <div>
            <p>
              <span className="">{profile.address}</span>
            </p>
            <p>
              <span className="">{profile.email}</span>
            </p>
            <p className="text-base">Story : {profile.story}</p>
            <a className="hover:text-sky-500" target="_blank" rel="noreferrer">
              {profile.website}
            </a>
          </div>
        </div>
      </div>
      <Divider
        sx={{
          width: "80%",
          margin: "20px auto",
        }}
      />
      <ModalShowImageUser
        open={open}
        handleClose={handleClose}
        image={profile.avatar}
      />
      <ModalEditUser
        open={openModal}
        onClose={handleCloseModal}
        setProfile={setProfile}
      />
      <ListPostOfUser />
    </div>
  );
};

export default ProfileUser;
