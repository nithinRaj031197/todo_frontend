import { Box, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Strings } from "../constant";
import { ITodo, TodoContext, TodoContextType } from "../context/todoContext";
import Todo from "./Todo";
import TodoStatus from "./TodoStatus";

export const ActiveTodoComponent = () => {
  const todoContext = useContext(TodoContext);
  const { todos, getAllTodos } = todoContext as TodoContextType;

  useEffect(() => {
    getAllTodos();
  }, []);

  return (
    <>
      <Box className="flex flex-col gap-3 mt-5 justify-center items-center w-full">
        {todos?.length ? (
          todos?.map((todo: ITodo) => {
            return <Todo key={todo?._id} todo={todo} active={true} />;
          })
        ) : (
          <Typography>No Active Todos</Typography>
        )}
      </Box>
      {todos?.length > 0 && <TodoStatus status={Strings.ACTIVE_TODOS} />}
    </>
  );
};

export const CompletedTodoComponent = () => {
  const todoContext = useContext(TodoContext);
  const { completedTodos, getCompletedTodos } = todoContext as TodoContextType;
  useEffect(() => {
    getCompletedTodos();
  }, []);
  return (
    <>
      <Box className="flex flex-col gap-3 mt-5 justify-center items-center">
        {completedTodos?.length ? (
          completedTodos?.map((todo: ITodo) => {
            return <Todo key={todo?._id} todo={todo} active={false} />;
          })
        ) : (
          <Typography>No Completed Todos</Typography>
        )}
      </Box>
      {completedTodos?.length > 0 && <TodoStatus status={Strings.COMPLETED_TODOS} />}
    </>
  );
};
