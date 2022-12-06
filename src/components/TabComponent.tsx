import * as React from "react";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { TodoContext } from "../context/todoContext";
import { ActiveTodoComponent, CompletedTodoComponent } from "./TodoList";
import { LinearProgress } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`full-width-tabpanel-${index}`} aria-labelledby={`full-width-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 1 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
  };
}

export default function TabComponent() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const todoContext = React.useContext(TodoContext);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: "background.paper", width: 500 }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Active Todos" {...a11yProps(0)} />
          <Tab label="Completed Todos" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <Box>{todoContext?.loading && <LinearProgress />}</Box>
      <SwipeableViews axis={theme.direction === "rtl" ? "x-reverse" : "x"} index={value} onChangeIndex={handleChangeIndex}>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <ActiveTodoComponent />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <CompletedTodoComponent />
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}
