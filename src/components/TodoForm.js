import React, { useState } from 'react';

const TodoForm = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onAdd(inputValue);
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Nhập công việc..."
        style={{ flex: 1, padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      <button
        type="submit"
        style={{ padding: '8px 15px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}
      >
        Thêm
      </button>
    </form>
  );
};

export default TodoForm;