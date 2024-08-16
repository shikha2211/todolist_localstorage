import { useEffect, useState } from "react";
import "./styles.css";

type Todo = {
  id: number;
  task: string;
  isSelected: boolean;
};

export default function App() {
  const [todolist, setTodoList] = useState<Todo[]>([
    { id: 1, task: "Grocery", isSelected: false },
    { id: 2, task: "Pay Rent", isSelected: false },
  ]);

  const [todoname, setTodoName] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("todolist"));
    if (stored) {
      console.log("In stored", stored);
      setTodoList(stored);
    }
  }, []);

  const updatelocalStorage = (updatedTasks: Todo[]) => {
    localStorage.setItem("todolist", JSON.stringify(updatedTasks));
    setTodoList(updatedTasks);
  };

  const AddTodo = () => {
    //console.log(todoname);
    const task_id = todolist.length + 1;
    const updatedTasks = [
      ...todolist,
      { id: task_id, task: todoname, isSelected: false },
    ];
    updatelocalStorage(updatedTasks);
  };

  return (
    <div className="App">
      <h1>Todo list with local storage</h1>
      <div>
        <input
          type="text"
          placeholder="Enter task"
          onChange={(e) => setTodoName(e.target.value)}
        />
        <button onClick={AddTodo}>Add</button>
      </div>
      <div>
        {todolist.map((item) => {
          return (
            <li key={item.id}>
              <input type="checkbox" />
              {item.task}
            </li>
          );
        })}
      </div>
    </div>
  );
}
