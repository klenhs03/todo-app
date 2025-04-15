import React, { useState } from 'react';

const TodoItem = ({ todo, onDelete, onToggle, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title || todo.text);
  const isCompleted = todo.completed ?? false;

  const handleToggle = () => {
    console.log(`Click checkbox: ${todo.title}, id: ${todo.id}, completed: ${!isCompleted}`);
    onToggle(todo.id);
  };

  const handleEdit = () => {
    if (isCompleted) return; // Không cho phép chỉnh sửa nếu đã hoàn thành
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!newTitle.trim()) return;
    onUpdate(todo.id, newTitle);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewTitle(todo.title || todo.text);
    setIsEditing(false);
  };

  return (
    <li style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px',
      marginBottom: '5px',
      background: isCompleted ? '#e0e0e0' : '#f9f9f9',
      borderRadius: '5px'
    }}>
      {isEditing ? (
        <div style={{ flex: 1, display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={{ flex: 1, padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <button
            onClick={handleSave}
            style={{ padding: '5px 10px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px' }}
          >
            Lưu
          </button>
          <button
            onClick={handleCancel}
            style={{ padding: '5px 10px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '5px' }}
          >
            Hủy
          </button>
        </div>
      ) : (
        <>
          <div style={{ flex: 1 }}>
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={handleToggle}
            />
            <span style={{
              marginLeft: '10px',
              textDecoration: isCompleted ? '' : 'none'
            }}>
              {todo.title || todo.text}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {!isCompleted && ( 
              <button
                onClick={handleEdit}
                style={{ padding: '5px 10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}
              >
                Sửa
              </button>
            )}
            <button
              onClick={() => onDelete(todo.id)}
              style={{ padding: '5px 10px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '5px' }}
            >
              Xóa
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default TodoItem;