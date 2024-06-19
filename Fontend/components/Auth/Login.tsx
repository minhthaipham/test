import React from "react";
import { TextField } from "@mui/material";
import { RemoveRedEye } from "@mui/icons-material";
import Button from "../Button/Button";
import Link from "next/link";
import axiosClient from "@/libs/api/axiosClient";
import { apiRouter } from "@/config/apiRouter";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { ConnectButton } from "thirdweb/react";
import { chain, client } from "@/utils/constant";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [hide, setHide] = React.useState<boolean>(true);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-4xl p-5 ">
      <div className="md:w-1/2 px-8 py-15">
        <h2 className="font-bold text-3xl text-[#002D74]">Login</h2>
        <p className="text-2xs mt-4 text-[#002D74]">
          If you are already a member, easily log in
        </p>
        {
          <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              name="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative">
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                type={hide ? "password" : "text"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
              />
              <RemoveRedEye
                className="absolute right-0 top-0 mt-5 mr-5 cursor-pointer"
                onClick={() => setHide(!hide)}
              />
            </div>
            <Button
              title="Login"
              variant="outlined"
              className={
                "w-full bg-[#3E54AC] text-white p-2 rounded-md text-center hover:text-black"
              }
              type="submit"
            />
          </form>
        }
        <p className="border-b-2 p-2 text-2sm">Forgot password</p>
        <div className="flex">
          <p className="px-2 mt-5">If you do not have an account . Create</p>
          <button className="text-[#002D74] mt-5 underline">
            <Link href="/register">Register</Link>
          </button>
        </div>
      </div>
      <div className="w-1/2 hidden md:block ">
        <img
          className="object-cover w-full h-full rounded-2xl"
          src="https://i.pinimg.com/564x/5a/87/0b/5a870b63f6309f59fcdd8ec799224977.jpg"
          alt="loli"
        />
      </div>
    </div>
  );
};

export default Login;
