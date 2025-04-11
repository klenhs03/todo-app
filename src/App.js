import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState(() => {
    // Khôi phục từ localStorage
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [filter, setFilter] = useState('all');

  // Lấy dữ liệu từ API nếu localStorage rỗng
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

  // Lưu todos vào localStorage và kiểm tra
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    console.log('Todos hiện tại:', todos);
    console.log('Công việc đã hoàn thành:', todos.filter(todo => todo.completed));
  }, [todos]);

  // Thêm todo mới
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

  // Xóa todo
  const handleDeleteTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(() => setTodos(todos.filter(todo => todo.id !== id)))
      .catch(error => console.error('Error deleting todo:', error));
  };

  // Toggle trạng thái hoàn thành
  const handleToggleTodo = (id) => {
    console.log('Toggle id:', id);
    const todo = todos.find(t => t.id === id);
    if (!todo) {
      console.error('Không tìm thấy todo với id:', id);
      return;
    }
    const updatedTodo = { ...todo, completed: !todo.completed };
    console.log('Cập nhật todo:', updatedTodo);
    
    setTodos(todos.map(t => (t.id === id ? updatedTodo : t)));
    
    axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, updatedTodo)
      .catch(error => console.error('Error updating todo:', error));
  };

  // Xóa tất cả dữ liệu
  const handleClearAll = () => {
    console.log('Xóa tất cả dữ liệu');
    setTodos([]); // Xóa state todos
    localStorage.removeItem('todos'); // Xóa localStorage
  };

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto', fontFamily: 'Arial' }}>
      <h2 style={{ textAlign: 'center' }}>Todo List</h2>
      <TodoForm onAdd={handleAddTodo} />
      <TodoList
        todos={todos}
        onDelete={handleDeleteTodo}
        onToggle={handleToggleTodo}
        filter={filter}
        setFilter={setFilter}
        onClearAll={handleClearAll} // Truyền hàm xóa tất cả
      />
    </div>
  );
}

export default App;