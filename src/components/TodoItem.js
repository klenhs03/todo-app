import React from 'react';

const TodoItem = ({ todo, onDelete, onToggle }) => {
  const isCompleted = todo.completed ?? false;

  const handleToggle = () => {
    console.log(`Click checkbox: ${todo.title}, id: ${todo.id}, completed: ${!isCompleted}`);
    onToggle(todo.id);
  };

  return (
    <li style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px',
      marginBottom: '5px',
      background: isCompleted ? '#e0e0e0' : '#f9f9f9',
      borderRadius: '5px'
    }}>
      <div>
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={handleToggle}
        />
        <span style={{
          marginLeft: '10px',
          textDecoration: isCompleted ? 'line-through' : 'none'
        }}>
          {todo.title || todo.text}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        style={{ color: 'red', border: 'none', background: 'transparent' }}
      >
        Xóa
      </button>
    </li>
  );
};

export default TodoItem;