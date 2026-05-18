import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

export default function TodoList() {
  const { user } = useAuth()
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => { axios.get('/api/todos').then(res => setTodos(res.data)) }, [])

  const addTodo = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    const res = await axios.post('/api/todos', { title, description })
    setTodos([res.data, ...todos])
    setTitle(''); setDescription('')
  }

  const toggleTodo = async (todo) => {
    const res = await axios.put(`/api/todos/${todo._id}`, { completed: !todo.completed })
    setTodos(todos.map(t => t._id === todo._id ? res.data : t))
  }

  const deleteTodo = async (id) => {
    await axios.delete(`/api/todos/${id}`)
    setTodos(todos.filter(t => t._id !== id))
  }

  const filtered = todos.filter(t =>
    filter === 'active' ? !t.completed : filter === 'completed' ? t.completed : true
  )

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h1>My Tasks</h1>
        <p>{user?.email}</p>
      </div>

      <div className="stats">
        <span>Total: {todos.length}</span>
        <span>Done: {todos.filter(t => t.completed).length}</span>
        <span>Pending: {todos.filter(t => !t.completed).length}</span>
      </div>

      <div className="add-card">
        <form onSubmit={addTodo}>
          <input placeholder="Task title" value={title} onChange={e => setTitle(e.target.value)} required />
          <input placeholder="Description (optional)" value={description} onChange={e => setDescription(e.target.value)} />
          <button type="submit">Add Task</button>
        </form>
      </div>

      <div className="filters">
        {['all', 'active', 'completed'].map(f => (
          <button key={f} className={filter === f ? 'active' : ''} onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="todo-list">
        {filtered.length === 0 && <p className="empty">No tasks here!</p>}
        {filtered.map(todo => (
          <div key={todo._id} className={`todo-item ${todo.completed ? 'done' : ''}`}>
            <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo)} />
            <div className="todo-text">
              <p className="todo-title">{todo.title}</p>
              {todo.description && <p className="todo-desc">{todo.description}</p>}
            </div>
            <button className="delete-btn" onClick={() => deleteTodo(todo._id)}>🗑️</button>
          </div>
        ))}
      </div>
    </div>
  )
}
