import { Close, Search } from "@mui/icons-material";
import React from "react";
import ListUserSearch from "../ListUserSearch/ListUserSearch";
import { IUser } from "@/model/user";
import { searchInforUser } from "@/api/userApi";
import { useAuth } from "@/context/AuthContext";
const InputSearch = () => {
  const { user } = useAuth();
  const [inputValue, setInputValue] = React.useState("");
  const [debouncedValue, setDebouncedValue] = React.useState("");
  const [listUser, setListUser] = React.useState<IUser[]>([]);
  let timeoutId: NodeJS.Timeout;
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setDebouncedValue(newValue);
    }, 200);
  };
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await searchInforUser(debouncedValue, user?._id);
        if (res.status) {
          setListUser(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (debouncedValue) {
      fetchData();
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [debouncedValue]);

  return (
    <div className="flex items-center justify-center  h-10 px-2 bg-[#F2F3F5] border border-gray-300 rounded-2xl shadow-sm relative">
      <input
        type="text"
        placeholder="Search"
        value={inputValue}
        onChange={handleInputChange}
        className="px-3 h-full text-sm text-gray-500 outline-none rounded-md bg-[#F2F3F5]
          md:min-w-[300px]  w-[150px]
        "
      />
      {debouncedValue.length > 0 ? (
        <Close
          className="absolute right-2 text-gray-500 cursor-pointer"
          onClick={() => {
            setInputValue("");
            setDebouncedValue("");
          }}
        />
      ) : (
        <Search className="absolute right-2 text-gray-500 cursor-pointer" />
      )}
      <ListUserSearch
        listUser={listUser}
        debouncedValue={debouncedValue}
        setInputValue={setInputValue}
        setDebouncedValue={setDebouncedValue}
      />
    </div>
  );
};

export default InputSearch;
