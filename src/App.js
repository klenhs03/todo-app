import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (todos.length === 0) {
      axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
        .then(response => {
          console.log('Dữ liệu từ API:', response.data);
          setTodos(response.data);
        })
        .catch(error => console.error('Error fetching todos:', error));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    console.log('Todos hiện tại:', todos);
    console.log('Công việc đã hoàn thành:', todos.filter(todo => todo.completed));
  }, [todos]);

  const handleAddTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      title: text,
      completed: false
    };
    console.log('Thêm công việc:', newTodo);
    
    axios.post('https://jsonplaceholder.typicode.com/todos', newTodo)
      .then(() => {
        setTodos([newTodo, ...todos]);
      })
      .catch(error => console.error('Error adding todo:', error));
  };

  const handleDeleteTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(() => setTodos(todos.filter(todo => todo.id !== id)))
      .catch(error => console.error('Error deleting todo:', error));
  };

  const handleToggleTodo = (id) => {
    console.log('Toggle id:', id);
    setTodos(prevTodos => {
      const todo = prevTodos.find(t => t.id === id);
      if (!todo) {
        console.error('Không tìm thấy todo với id:', id);
        return prevTodos;
      }
      const updatedTodo = { ...todo, completed: !todo.completed };
      console.log('Cập nhật todo:', updatedTodo);
      return prevTodos.map(t => (t.id === id ? updatedTodo : t));
    });

    const todo = todos.find(t => t.id === id);
    if (todo) {
      const updatedTodo = { ...todo, completed: !todo.completed };
      axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, updatedTodo)
        .catch(error => console.error('Error updating todo:', error));
    }
  };

  const handleUpdateTodo = (id, newTitle) => {
    console.log('Cập nhật công việc id:', id, 'thành:', newTitle);
    setTodos(prevTodos => {
      const todo = prevTodos.find(t => t.id === id);
      if (!todo) {
        console.error('Không tìm thấy todo với id:', id);
        return prevTodos;
      }
      // Không cho phép chỉnh sửa nếu công việc đã hoàn thành
      if (todo.completed) {
        console.log('Công việc đã hoàn thành, không thể chỉnh sửa:', todo);
        return prevTodos;
      }
      const updatedTodo = { ...todo, title: newTitle };
      return prevTodos.map(t => (t.id === id ? updatedTodo : t));
    });

    const todo = todos.find(t => t.id === id);
    if (todo && !todo.completed) {
      const updatedTodo = { ...todo, title: newTitle };
      axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, updatedTodo)
        .catch(error => console.error('Error updating todo:', error));
    }
  };

  const handleClearAll = () => {
    console.log('Xóa tất cả dữ liệu');
    setTodos([]);
    localStorage.removeItem('todos');
  };

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto', fontFamily: 'Arial' }}>
      <h2 style={{ textAlign: 'center' }}>Todo List</h2>
      <TodoForm onAdd={handleAddTodo} />
      <TodoList
        todos={todos}
        onDelete={handleDeleteTodo}
        onToggle={handleToggleTodo}
        onUpdate={handleUpdateTodo}
        filter={filter}
        setFilter={setFilter}
        onClearAll={handleClearAll}
      />
    </div>
  );
}

export default App;