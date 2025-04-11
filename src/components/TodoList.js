import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onDelete, onToggle, filter, setFilter, onClearAll }) => {
  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    return true;
  });

  return (
    <div>
      <div style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
        <button
          onClick={() => setFilter('all')}
          style={{
            padding: '5px 10px',
            background: filter === 'all' ? '#007bff' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '5px'
          }}
        >
          Tất cả
        </button>
        <button
          onClick={() => setFilter('active')}
          style={{
            padding: '5px 10px',
            background: filter === 'active' ? '#007bff' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '5px'
          }}
        >
          Chưa hoàn thành
        </button>
        <button
          onClick={() => setFilter('completed')}
          style={{
            padding: '5px 10px',
            background: filter === 'completed' ? '#007bff' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '5px'
          }}
        >
          Đã hoàn thành
        </button>
        <button
          onClick={onClearAll}
          style={{
            padding: '5px 10px',
            background: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '5px'
          }}
        >
          Xóa tất cả
        </button>
      </div>
      <p style={{ marginBottom: '10px', color: '#555' }}>
        {todos.filter(todo => todo.completed).length} công việc đã hoàn thành
      </p>
      {filteredTodos.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888' }}>
          Không có công việc nào trong danh sách này.
        </p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={onDelete}
              onToggle={onToggle}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;