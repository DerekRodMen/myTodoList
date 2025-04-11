interface Todo {
    description: string;
    completed: boolean;
    completedAt?: string;
  }
  
  interface Props {
    todo: Todo;
    index: number;
    handleToggleComplete: (index: number) => void;
    handleDelete: (index: number) => void;
  }
  
  const TodoItem = ({ todo, index, handleToggleComplete, handleDelete }: Props) => {
    return (
      <li style={{ marginBottom: 10 }}>
        <input
          type='checkbox'
          checked={todo.completed}
          onChange={() => handleToggleComplete(index)}
        />
  
  <span
  style={{
    textDecoration: todo.completed ? 'line-through' : 'none',
  }}
>
  {todo.description}
</span>

{todo.completed && (
  <div className="done-date">
    (Done at {todo.completedAt})
  </div>
)}

<button
  onClick={() => handleDelete(index)}
  className="delete-btn"
>
  Delete
</button>

      </li>
    );
  };
  
  export default TodoItem;
  