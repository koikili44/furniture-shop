import React, { useState, useEffect } from 'react'

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn a tech skill', done: false },
    { id: 2, text: 'Learn how to drive', done: false },
    { id: 3, text: 'Establish a big business', done: false },
    { id: 4, text: 'Enroll for a professional certification', done: false }
  ])
  const [text, setText] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('goals')
    if (saved) setTodos(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (!text.trim()) return
    setTodos([...todos, { id: Date.now(), text, done: false }])
    setText('')
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 px-6 py-8">
            <h1 className="text-3xl font-bold text-white text-center">🎯 My Life Goals</h1>
            <p className="text-amber-100 text-center mt-2">Track your journey to success</p>
          </div>

          <div className="p-6">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-amber-50 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-amber-600">{todos.length}</div>
                <div className="text-xs text-amber-500">Total Goals</div>
              </div>
              <div className="bg-green-50 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-green-600">{todos.filter(t => !t.done).length}</div>
                <div className="text-xs text-green-500">Active</div>
              </div>
              <div className="bg-purple-50 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-purple-600">{todos.filter(t => t.done).length}</div>
                <div className="text-xs text-purple-500">Completed</div>
              </div>
            </div>

            {/* Add Goal */}
            <div className="flex gap-3 mb-6">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                placeholder="Add a new goal..."
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <button
                onClick={addTodo}
                disabled={!text.trim()}
                className="px-6 py-3 bg-amber-600 text-white font-medium rounded-xl hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Add Goal
              </button>
            </div>

            {/* Goal List */}
            <div className="space-y-3">
              {todos.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <span className="text-5xl block mb-3">🎯</span>
                  <p>No goals yet. Start by adding your first goal!</p>
                </div>
              ) : (
                todos.map(todo => (
                  <div
                    key={todo.id}
                    className={`flex items-center gap-3 p-4 rounded-xl transition-all ${
                      todo.done ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-100 hover:border-amber-200'
                    }`}
                  >
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        todo.done 
                          ? 'bg-green-500 border-green-500 text-white' 
                          : 'border-gray-300 hover:border-amber-500'
                      }`}
                    >
                      {todo.done && '✓'}
                    </button>
                    <span className={`flex-1 ${todo.done ? 'line-through text-gray-400' : 'text-gray-700 font-medium'}`}>
                      {todo.text}
                    </span>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="text-red-400 hover:text-red-600 transition-colors text-xl px-2"
                    >
                      ×
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="mt-8 pt-4 border-t border-gray-100 text-center text-sm text-gray-400">
              ✨ Your goals are saved automatically
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TodoList