import { Box, Paper, Typography } from "@mui/material";
import { FC } from "react";
import TabComponent from "./TabComponent";
import TodoForm from "./TodoForm";

const TodoLayout: FC = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            mt: 5,
            width: 800,
            minHeight: "90vh",
          },
        }}
      >
        <Paper className="flex justify-center items-center flex-col" elevation={3}>
          <Typography className="text-center text-5xl" variant="h3">
            TODO LIST
          </Typography>
          <Box className="flex flex-col gap-3 justify-center items-center" sx={{ maxWidth: "400px" }}>
            <TodoForm />
            <TabComponent />
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default TodoLayout;
