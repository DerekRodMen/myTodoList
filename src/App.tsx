import { useState, useEffect } from 'react'
import './App.css'
import TodoItem from './components/TodoItem'

interface Todo {
  description: string;
  completed: boolean;
  completedAt?: string;
}

function App() {
  const [todoDescription, setTodoDescription] = useState('')
  const [todoList, setTodoList] = useState<Todo[]>([])

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos')
    if (storedTodos) {
      setTodoList(JSON.parse(storedTodos))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoList))
  }, [todoList])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoDescription(e.target.value)
  }

  const handleAdd = () => {
    if (!todoDescription.trim()) return
    const newTodo: Todo = {
      description: todoDescription,
      completed: false
    }
    setTodoList([newTodo, ...todoList])
    setTodoDescription('')
  }

  const handleToggleComplete = (index: number) => {
    const updatedTodos = [...todoList]
    const todo = updatedTodos[index]
    todo.completed = !todo.completed
    todo.completedAt = todo.completed ? new Date().toLocaleString() : undefined

    const reordered = [
      ...updatedTodos.filter(t => !t.completed),
      ...updatedTodos.filter(t => t.completed)
    ]

    setTodoList(reordered)
  }

  const handleDelete = (index: number) => {
    const updatedTodos = [...todoList]
    updatedTodos.splice(index, 1)
    setTodoList(updatedTodos)
  }

  return (
    <div className="app-container">
      <div className="input-container">
        <input
          type='text'
          value={todoDescription}
          onChange={handleChange}
          placeholder="New Task"
        />
        <button onClick={handleAdd}>Add Item</button>
      </div>

      <div className="todo-list">
        <h3>TODOs:</h3>
        <ul>
          {todoList.map((todo, index) => (
            <TodoItem
              key={index}
              todo={todo}
              index={index}
              handleToggleComplete={handleToggleComplete}
              handleDelete={handleDelete}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
