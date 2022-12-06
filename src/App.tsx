import "./App.css";
import { TodoProvider } from "./context/todoContext";
import TodoLayout from "./components/TodoLayout";

function App() {
  return (
    <TodoProvider>
      <div className="flex  justify-center">
        <TodoLayout />
      </div>
    </TodoProvider>
  );
}

export default App;
