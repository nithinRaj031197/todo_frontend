import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { Strings } from "../constant";
import { TodoContext, TodoContextType } from "../context/todoContext";

interface Props {
  status: string;
}

const TodoStatus = ({ status }: Props) => {
  console.log(status);
  const todoContext = useContext(TodoContext);

  const { todos } = todoContext as TodoContextType;

  return (
    <Box component="form" className="flex items-center justify-start my-3">
      <Typography className="text-start">
        {status === Strings.ACTIVE_TODOS ? "Todo Remaining count " : "Completed Todos count "}
        {todos?.length}
      </Typography>
    </Box>
  );
};

export default TodoStatus;
