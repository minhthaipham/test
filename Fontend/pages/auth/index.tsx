import Image from "next/image";
import React from "react";
import { Tab, Tabs, Box, Typography } from "@mui/material";
import Login from "@/components/Auth/Login";
import Register from "@/components/Auth/Register";

const AuthContainer = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  return (
    <div className="bg-red-50 min-h-screen flex items-center justify-center flex-col ">
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Login" {...a11yProps(0)} />
        <Tab label="Register" {...a11yProps(1)} />
      </Tabs>
      {value === 0 && <Login />}
      {value === 1 && <Register />}
    </div>
  );
};

export default AuthContainer;
