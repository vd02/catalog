import React from "react";
import Box from "@mui/joy/Box";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";

const CustomTabs = ({ tabIndex, onTabChange }) => {
  const handleChange = (event, value) => {
    onTabChange(value); // Notify parent about the tab change
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        m: -2,
        overflowX: "hidden",
        backgroundColor: "white",
        fontFamily: "MyCustomFont",
      }}
    >
      <Tabs
        aria-label="Stock Dashboard Tabs"
        value={tabIndex}
        onChange={handleChange}
        sx={{ backgroundColor: "white", fontFamily: "MyCustomFont" }}
      >
        <TabList
          sx={{
            pt: 1,
            justifyContent: "center",
            backgroundColor: "white",
            alignSelf: "baseline",
            fontFamily: "MyCustomFont",
            [`&& .${tabClasses.root}`]: {
              flex: "initial",
              bgcolor: "transparent",
              "&:hover": {
                bgcolor: "transparent",
              },
              [`&.${tabClasses.selected}`]: {
                color: "#4B40EE",
                "&::after": {
                  height: 2,
                  borderTopLeftRadius: 3,
                  borderTopRightRadius: 3,
                  bgcolor: "#4B40EE",
                },
              },
            },
          }}
        >
          <Tab indicatorInset>Summary</Tab>
          <Tab indicatorInset>Chart</Tab>
          <Tab indicatorInset>Statistics</Tab>
          <Tab indicatorInset>Analysis</Tab>
          <Tab indicatorInset>Settings</Tab>
        </TabList>
        <Box
          sx={(theme) => ({
            "--bg": "white",
            background: "var(--bg)",
            boxShadow: "0 0 0 100vmax var(--bg)",
            clipPath: "inset(0 -100vmax)",
            fontFamily: "MyCustomFont",
          })}
        >
          <TabPanel value={0}></TabPanel>
          <TabPanel value={1}></TabPanel>
          <TabPanel value={2}></TabPanel>
          <TabPanel value={3}></TabPanel>
          <TabPanel value={4}></TabPanel>
        </Box>
      </Tabs>
    </Box>
  );
};

export default CustomTabs;
