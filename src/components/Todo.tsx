import { Box, Button, Typography } from "@mui/material";
import { FC, useContext } from "react";
import { ITodo, TodoContext, TodoContextType } from "../context/todoContext";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Strings } from "../constant";

interface Props {
  todo: ITodo;
  active: boolean;
}

const Todo: FC<Props> = ({ todo, active }) => {
  const { todo: todoData, _id } = todo;

  const todoContext = useContext(TodoContext);
  const { setPrefill, setSelectedId, singleCheck, setSingleCheck, deleteTodo, updateTodo } = todoContext as TodoContextType;

  const clickEdit = (id: string | undefined) => {
    setSelectedId(id);
    setSingleCheck(true);
    setPrefill(todoData);
  };

  const deleteTodoHandler = (id: string | undefined, status: string) => {
    if (!id) return;
    deleteTodo(id, status);
  };

  const completedTodoHandler = (id: string | undefined) => {
    updateTodo(id, { is_active: false }, Strings.COMPLETED_TODO_UPDATE);
  };

  const inCompletedTodoHandler = (id: string | undefined) => {
    updateTodo(id, { is_active: true }, Strings.REACTIVATE_TODO_UPDATE);
  };

  return (
    <>
      {active ? (
        <>
          <Box className="flex  align-center justify-between border-2  h-16 p-2" sx={{ width: "31rem" }}>
            <Box className="flex  align-items">
              {singleCheck ? (
                <>
                  <Box className="flex items-center justify-center">
                    <Typography>{todoData}</Typography>
                  </Box>
                </>
              ) : (
                <Typography sx={{ marginTop: "10px" }}>{todoData}</Typography>
              )}
            </Box>

            <Box className="flex flex-row gap-2">
              <Button onClick={() => completedTodoHandler(_id)} color="info" variant="outlined">
                Completed
              </Button>
              <Button onClick={() => clickEdit(_id)} color="warning" variant="contained">
                <EditIcon />
              </Button>
              <Button onClick={() => deleteTodoHandler(_id, Strings.ACTIVATED_TODO_DELETE)} color="error" variant="contained">
                <DeleteIcon />
              </Button>
            </Box>
          </Box>
        </>
      ) : (
        <>
          <Box className="flex  align-center justify-between border-2  h-16 p-2" sx={{ width: "31rem" }}>
            <Box className="flex  align-items">
              {singleCheck ? (
                <>
                  <Box className="flex items-center justify-center">
                    <Typography>{todoData}</Typography>
                  </Box>
                </>
              ) : (
                <Typography sx={{ marginTop: "10px" }}>{todoData}</Typography>
              )}
            </Box>

            <Box className="flex flex-row gap-2">
              <Button onClick={() => inCompletedTodoHandler(_id)} color="error" variant="outlined">
                Re-Activate
              </Button>
              <Button onClick={() => deleteTodoHandler(_id, Strings.COMPLETED_TODO_DELETE)} color="error" variant="contained">
                <DeleteIcon />
              </Button>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default Todo;
