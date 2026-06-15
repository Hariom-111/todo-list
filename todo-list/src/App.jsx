import { useEffect, useMemo, useState } from 'react'
import './todo.css'

const STORAGE_KEY = 'todo.tasks.v1'

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16)
}

function safeParseTasks(raw) {
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter((t) => t && typeof t === 'object')
      .map((t) => ({
        id: String(t.id ?? uid()),
        text: String(t.text ?? '').trim(),
        completed: Boolean(t.completed),
        createdAt: Number(t.createdAt ?? Date.now()),
      }))
      .filter((t) => t.text.length > 0)
  } catch {
    return []
  }
}

export default function App() {
  const [text, setText] = useState('')
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')

  const [hasHydrated, setHasHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      // eslint-disable-next-line no-console
      console.debug('[todo] storage key:', STORAGE_KEY, 'raw exists:', raw != null, 'raw length:', raw?.length ?? 0)

      const initial = safeParseTasks(raw)
      // eslint-disable-next-line no-console
      console.debug('[todo] parsed tasks count:', initial.length, 'first task:', initial[0] || null)

      setTasks(initial)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('[todo] localStorage read failed', err)
      setTasks([])
    } finally {
      setHasHydrated(true)
    }
  }, [])

  useEffect(() => {
    if (!hasHydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('[todo] localStorage write failed', err)
    }
  }, [tasks, hasHydrated])


  const stats = useMemo(() => {
    const completed = tasks.filter((t) => t.completed).length
    return { total: tasks.length, completed, active: tasks.length - completed }
  }, [tasks])

  const visibleTasks = useMemo(() => {
    switch (filter) {
      case 'active':
        return tasks.filter((t) => !t.completed)
      case 'completed':
        return tasks.filter((t) => t.completed)
      default:
        return tasks
    }
  }, [tasks, filter])

  function addTask(e) {
    e?.preventDefault?.()
    const cleaned = text.trim()
    if (!cleaned) return

    setTasks((prev) => [
      {
        id: uid(),
        text: cleaned,
        completed: false,
        createdAt: Date.now(),
      },
      ...prev,
    ])
    setText('')
  }

  function toggleTask(id) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div className="todo-root">
      <header className="todo-header">
        <div>
          <h1 className="todo-title">To-Do List</h1>


        </div>
        <div className="todo-actions-meta" aria-live="polite">
          {stats.completed}/{stats.total} completed
        </div>
      </header>

      <div className="todo-card">
        <form className="todo-form" onSubmit={addTask}>
          <input
            className="todo-input"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a task and press Enter"
            aria-label="New task"
          />
          <button className="todo-button" type="submit" disabled={!text.trim()}>
            Add task
          </button>
        </form>

        <div className="todo-actions-row">
          <div className="todo-actions-meta">
            {stats.active} active • {stats.completed} completed
          </div>
          <div className="todo-filter" role="group" aria-label="Task filter">
            <button type="button" className="todo-chip" aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>
              All
            </button>
            <button type="button" className="todo-chip" aria-pressed={filter === 'active'} onClick={() => setFilter('active')}>
              Active
            </button>
            <button type="button" className="todo-chip" aria-pressed={filter === 'completed'} onClick={() => setFilter('completed')}>
              Completed
            </button>
          </div>
        </div>

        <div className="todo-list">
          {visibleTasks.length === 0 ? (
            <div className="todo-empty">
              <strong>No tasks.</strong> Add one above to get started.
            </div>
          ) : (
            visibleTasks
              .slice()
              .sort((a, b) => b.createdAt - a.createdAt)
              .map((task) => (
                <div key={task.id} className="todo-item" data-completed={task.completed}>
                  <label
                    className="todo-checkbox"
                    title={task.completed ? 'Mark as active' : 'Mark as completed'}
                    onContextMenu={(e) => {
                      e.preventDefault()
                      toggleTask(task.id)
                    }}
                    onDoubleClick={() => toggleTask(task.id)}
                  >
                    <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} />
                    <span className="todo-checkmark" />
                  </label>


                  <div className="todo-text">{task.text}</div>

                  <button className="todo-delete" type="button" onClick={() => deleteTask(task.id)} aria-label={`Delete ${task.text}`}>
                    Delete
                  </button>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  )
}

