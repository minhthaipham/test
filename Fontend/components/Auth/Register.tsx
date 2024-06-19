import React from "react";
import {
  TextField,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Radio,
} from "@mui/material";
import { RemoveRedEye } from "@mui/icons-material";
import Button from "../Button/Button";
import Link from "next/link";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
const Register = () => {
  const { register } = useAuth();
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [hide, setHide] = React.useState<boolean>(true);
  const [hide1, setHide1] = React.useState<boolean>(true);
  const [gender, setGender] = React.useState("");

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password and confirm password not match");
      return;
    }
    register(fullName, email, password, gender);
  };

  return (
    <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-4xl p-5 ">
      <div className="md:w-1/2 px-8 py-15">
        <h2 className="font-bold text-3xl text-[#002D74]">Register</h2>
        <p className="text-2xs mt-4 text-[#002D74]">
          If you are not a member, easily register
        </p>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            type="text"
            name="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative">
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type={hide ? "password" : "text"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <RemoveRedEye
              className="absolute right-0 top-0 mt-5 mr-5 cursor-pointer"
              onClick={() => setHide(!hide)}
            />
          </div>
          <div className="relative mt-[30px]">
            <TextField
              label="Confirm Password"
              variant="outlined"
              fullWidth
              type={hide1 ? "password" : "text"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <RemoveRedEye
              className="absolute right-0 top-0 mt-5 mr-5 cursor-pointer"
              onClick={() => setHide1(!hide1)}
            />
          </div>
          <FormLabel
            component="legend"
            className="text-2xs mt-4 text-[#002D74]"
          >
            Gender
          </FormLabel>
          <FormControl component="fieldset">
            <RadioGroup
              name="gender"
              value={gender}
              onChange={handleGenderChange}
              row
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
          <div>
            <Button
              title="Register"
              variant="contained"
              className={
                "w-full bg-[#3E54AC] text-white p-2 rounded-md text-center hover:text-black"
              }
              type="submit"
            />
          </div>
        </form>

        <div className="flex">
          <p className="px-2 mt-5">Already have an account? </p>
          <button className="text-[#002D74] mt-5 underline">
            <Link href="/login">Login</Link>
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

export default Register;
