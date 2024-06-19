import React from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import ListPostOfUser from "../ListPostOfUser/ListPostOfUser";
const TabContextContainer = () => {
  const [value, setValue] = React.useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div className="mx-auto w-[80%]">
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
          }}
          className=" flex justify-center "
        >
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Posts" value="1" />
            <Tab label="Images" value="2" />
            <Tab label="List friend" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1" className="">
          <ListPostOfUser />
        </TabPanel>
        <TabPanel value="2">Item 2</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </div>
  );
};

export default TabContextContainer;
