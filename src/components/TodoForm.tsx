import { Box, Button, Container, TextField } from "@mui/material";
import { ChangeEvent, FC, FormEvent, useContext, useEffect, useState } from "react";
import { Strings } from "../constant";
import { TodoContext, TodoContextType } from "../context/todoContext";

const TodoForm: FC = () => {
  const [todoInput, setTodoInput] = useState("");
  const [disable, setDisable] = useState(false);

  const todoContext = useContext(TodoContext);
  const { prefill, saveTodo, selectedId, singleCheck, updateTodo, getAllTodos } = todoContext as TodoContextType;

  useEffect(() => {
    if (!todoInput) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [todoInput]);

  useEffect(() => {
    setTodoInput(prefill);
  }, [prefill]);

  const addTodoHandler = (e: FormEvent) => {
    e.preventDefault();
    if (!todoInput) {
      return;
    }

    saveTodo({ todo: todoInput });
    setTodoInput("");
  };

  const editTodoHandler = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedId) return;

    if (!todoInput) {
      return;
    }

    updateTodo(selectedId, { todo: todoInput }, Strings.TODO_DATA_UPDATE);
    setTodoInput("");
  };

  return (
    <Container sx={{ marginTop: 3 }} className="flex items-center justify-between">
      {singleCheck ? (
        <>
          <Box component="form" onSubmit={editTodoHandler} className="flex items-center justify-center">
            <TextField
              sx={{ marginRight: 5, width: 250 }}
              id="todo_field"
              name="todo_field"
              label="Update Todo"
              type="text"
              variant="standard"
              value={todoInput}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTodoInput(e.target.value)}
            />
            <Button disabled={disable} type="submit" color="primary" variant="contained">
              Update
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Box component="form" onSubmit={addTodoHandler} className="flex items-center justify-center">
            <TextField
              sx={{ marginRight: 5, width: 250 }}
              id="todo_field"
              name="todo_field"
              label="Add Todo"
              type="text"
              variant="standard"
              value={todoInput}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTodoInput(e.target.value)}
            />
            <Button disabled={disable} type="submit" color="primary" variant="contained">
              Create
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default TodoForm;
