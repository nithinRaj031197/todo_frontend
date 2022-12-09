import { createContext, FC, ReactNode, useState } from "react";
import { toast } from "react-toastify";
import instance from "../axios";
import { Strings } from "../constant";

export interface ITodo {
  _id?: string | undefined;
  todo: string;
  is_active: boolean;
  created_at: Date;
  isSelected?: boolean;
}

export type TodoContextType = {
  prefill: string;
  todos: ITodo[];
  completedTodos: ITodo[];
  loading: boolean;
  selectedId: string | undefined;
  singleCheck: boolean;
  setTodos: (todos: ITodo[]) => void;
  setcompletedTodos: (todos: ITodo[]) => void;
  saveTodo: (todo: Partial<ITodo>) => void;
  updateTodo: (id: string | undefined, todo: Partial<ITodo>, status?: string) => void;
  getAllTodos: () => void;
  getCompletedTodos: () => void;
  deleteTodo: (id: string | undefined, status?: string) => void;
  setSelectedId: (id: string | undefined) => void;
  setSingleCheck: (val: boolean) => void;
  setPrefill: (val: string) => void;
};

interface Props {
  children: ReactNode;
}

export const TodoContext = createContext<TodoContextType | null>(null);

export const TodoProvider: FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [completedTodos, setcompletedTodos] = useState<ITodo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [singleCheck, setSingleCheck] = useState(false);
  const [prefill, setPrefill] = useState("");

  const saveTodo = (data: Partial<ITodo>) => {
    setLoading(true);
    instance
      .post("/todos", data)
      .then((res) => {
        setTodos([...todos, res.data?.todo]);
        getAllTodos();
        toast.success(res.data?.message);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateTodo = (id: string | undefined, data: Partial<ITodo>, status?: string) => {
    setLoading(true);
    instance
      ?.put(`/todos/${id}`, data)
      .then((res) => {
        if (status === Strings.REACTIVATE_TODO_UPDATE) {
          getCompletedTodos();
          toast.success(Strings.TODO_REACTIVATE_UPDATE);
        } else if (status === Strings.COMPLETED_TODO_UPDATE) {
          getAllTodos();
          toast.success(Strings.TODO_COMPLETION_UPDATE);
        } else {
          getAllTodos();
          toast.success(res.data?.message);
        }
        setSingleCheck(false);
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getCompletedTodos = () => {
    setLoading(true);
    setcompletedTodos([]);
    instance
      .get("/todos/completed")
      .then((res) => {
        setcompletedTodos(res.data);
      })
      .catch((err) => {
        console.error(err);
        toast.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteTodo = (id: string | undefined, status?: string) => {
    setLoading(true);
    instance
      ?.delete(`/todos/${id}`)
      .then((res) => {
        if (status === Strings.COMPLETED_TODO_DELETE) {
          getCompletedTodos();
        } else if (status === Strings.ACTIVATED_TODO_DELETE) {
          getAllTodos();
        }
        toast.success(res?.data?.message);
      })
      .catch((err) => {
        console.error(err);
        toast.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getAllTodos = () => {
    setLoading(true);
    setTodos([]);
    instance
      .get("/todos")
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => {
        console.error(err);
        toast.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <TodoContext.Provider
      value={{
        prefill,
        completedTodos,
        selectedId,
        singleCheck,
        loading,
        todos,
        setcompletedTodos,
        setSelectedId,
        setSingleCheck,
        setPrefill,
        saveTodo,
        updateTodo,
        getAllTodos,
        deleteTodo,
        setTodos,
        getCompletedTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
