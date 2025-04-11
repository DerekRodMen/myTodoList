import { useState, useEffect } from 'react'
import './App.css'

interface Todo {
  description: string;
  completed: boolean;
  completedAt?: string;
}

function App() {
  const [todoDescription, setTodoDescription] = useState('')
  const [todoList, setTodoList] = useState<Todo[]>([])

  // Cargar desde LocalStorage
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos')
    if (storedTodos) {
      setTodoList(JSON.parse(storedTodos))
    }
  }, [])

  // Guardar en LocalStorage
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

  return (
    <div style={{ border: '1px solid red', padding: 10 }}>
      <div>
        <input
          type='text'
          value={todoDescription}
          onChange={handleChange}
          style={{ marginRight: 10 }}
        />
        <button onClick={handleAdd}>Add Item</button>
      </div>

      <div style={{ marginTop: 20 }}>TODOs Here:</div>
      <ul>
        {todoList.map((todo, index) => (
          <li key={index}>
            <input
              type='checkbox'/>
              {todo.description}
            
           
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
  