import { useEffect, useState } from "react";
import { Title } from "./components/Title";
import { TodoInput } from "./components/TodoInput";
import { TodoList } from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'Finish A Plague Tale Requiem',
      completed: false,
    },
    {
      id: 2,
      title: 'Smoking a cigarette',
      completed: false,
    },
    {
      id: 3,
      title: 'Take a Bath',
      completed: false,
    },
    {
      id: 4,
      title: 'Break',
      completed: false,
    }
  ]);

  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);

  const addTodo = (title) => {
    const lastId = todos.length > 0 ? todos[todos.length - 1].id : 0;

    const newTodo = {
      id: lastId + 1,
      title,
      completed: false
    };

    setTodos([...todos, newTodo]);
  }

  const handleSetComplete = (id) => {
    const updatedList = todos.map(todo => {
      if(todo.id === id) {
        return {...todo, completed: !todo.completed}
      }
      return todo;
    });

    setTodos(updatedList);
  }

  const handleDelete = (id) => {
    const updatedList = todos.filter(todo => todo.id !== id);
    setTodos(updatedList);
  }

  const handleClearComplete = () => {
    const updatedList = todos.filter(todo => !todo.completed);
    setTodos(updatedList);
  }

  const showAllTodos = () => {
    setActiveFilter('all');
  }

  const showActiveTodos = () => {
    setActiveFilter('active');
  }

  const showCompletedTodos = () => {
    setActiveFilter('completed');
  }

  useEffect(() => {
    if(activeFilter === 'all') {
      setFilteredTodos(todos);
    } else if(activeFilter === 'active') {
      const activeTodos = todos.filter(todo => !todo.completed);
      setFilteredTodos(activeTodos);
    } else if(activeFilter === 'completed') {
      const completedTodos = todos.filter(todo => todo.completed);
      setFilteredTodos(completedTodos);
    }
  }, [activeFilter, todos]);
  
  return (
    <div className="bg-gray-900 min-h-screen h-full font-inter text-gray-100 flex items-center justify-center py-20 px-5">
      <div className="container flex flex-col max-w-xl">
        <Title />
        <TodoInput addTodo={addTodo} />
        <TodoList 
          activeFilter={activeFilter}
          
          todos={filteredTodos}
          handleSetComplete={handleSetComplete}
          handleDelete={handleDelete}
          showAllTodos={showAllTodos}
          showActiveTodos={showActiveTodos}
          showCompletedTodos={showCompletedTodos}
          handleClearComplete={handleClearComplete}
        />
      </div>
    </div>
  );
}

export default App;



