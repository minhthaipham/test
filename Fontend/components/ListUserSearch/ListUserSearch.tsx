import { Avatar } from "@mui/material";
import React, { FC } from "react";
import { IListSearchUser } from "./type";
import Link from "next/link";
const ListUserSearch: FC<IListSearchUser> = ({
  listUser,
  debouncedValue,
  setInputValue,
  setDebouncedValue,
}) => {
  return (
    <>
      {debouncedValue.length > 0 && listUser.length > 0 && (
        <div className="absolute top-12 w-full  bg-white rounded-xl px-4 py-2">
          {listUser.map((user) => (
            <Link
              href={`/profile/${user._id}`}
              key={user._id}
              onClick={() => {
                setInputValue("");
                setDebouncedValue("");
              }}
            >
              <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-200 rounded-xl px-3 py-4">
                <Avatar
                  src={user.avatar}
                  alt="avatar"
                  sx={{ width: 24, height: 24 }}
                />
                <p className="text-sm">{user.fullName}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default ListUserSearch;
