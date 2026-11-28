
import { useEffect, useState } from 'react'
import './TravelJournal.css'

const JOURNAL_STORAGE_KEY = 'wanderly-travel-journal'

function getSavedEntries() {
  try {
    const saved = JSON.parse(
      localStorage.getItem(JOURNAL_STORAGE_KEY) || '[]'
    )

    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

function getToday() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function TravelJournal({ destinations }) {
  const [entries, setEntries] = useState(getSavedEntries)
  const [title, setTitle] = useState('')
  const [destination, setDestination] = useState('')
  const [date, setDate] = useState(getToday)
  const [memory, setMemory] = useState('')
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem(
        JOURNAL_STORAGE_KEY,
        JSON.stringify(entries)
      )
    } catch (error) {
      console.error('Unable to save journal entries:', error)
    }
  }, [entries])

  function resetForm() {
    setTitle('')
    setDestination('')
    setDate(getToday())
    setMemory('')
    setEditingId(null)
  }

  function handleSubmit(event) {
    event.preventDefault()

    const journalEntry = {
      id: editingId || `${Date.now()}-${Math.random()}`,
      title: title.trim(),
      destination,
      date,
      memory: memory.trim()
    }

    if (editingId) {
      setEntries((current) =>
        current.map((entry) =>
          entry.id === editingId ? journalEntry : entry
        )
      )
    } else {
      setEntries((current) => [journalEntry, ...current])
    }

    resetForm()
  }

  function handleEdit(entry) {
    setTitle(entry.title)
    setDestination(entry.destination)
    setDate(entry.date)
    setMemory(entry.memory)
    setEditingId(entry.id)

    document.getElementById('journal-title')?.focus()
  }

  function handleDelete(id) {
    setEntries((current) =>
      current.filter((entry) => entry.id !== id)
    )

    if (editingId === id) {
      resetForm()
    }
  }

  return (
    <section className="travel-journal" id="journal">
      <div className="journal-heading">
        <span className="section-tag">✦ YOUR MEMORIES</span>
        <h2>A Journal of Journeys</h2>
        <p>
          Every destination has a story. Save your favourite
          moments and keep your travel memories close.
        </p>
      </div>

      <div className="journal-content">
        <form className="journal-form" onSubmit={handleSubmit}>
          <div className="journal-form-heading">
            <span className="journal-icon">✎</span>
            <div>
              <h3>{editingId ? 'Edit Your Memory' : 'Write a Memory'}</h3>
              <p>Capture a moment from your journey.</p>
            </div>
          </div>

          <label htmlFor="journal-title">Memory title</label>
          <input
            id="journal-title"
            type="text"
            placeholder="e.g. A beautiful evening in Goa"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            maxLength={70}
            required
          />

          <div className="journal-form-row">
            <div>
              <label htmlFor="journal-destination">Destination</label>
              <select
                id="journal-destination"
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
                required
              >
                <option value="">Choose a destination</option>
                {destinations.map((place) => (
                  <option key={place.name} value={place.name}>
                    {place.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="journal-date">Date</label>
              <input
                id="journal-date"
                type="date"
                value={date}
                max={getToday()}
                onChange={(event) => setDate(event.target.value)}
                required
              />
            </div>
          </div>

          <label htmlFor="journal-memory">Your memory</label>
          <textarea
            id="journal-memory"
            placeholder="Write about the places you visited, the people you met, or a moment you never want to forget..."
            value={memory}
            onChange={(event) => setMemory(event.target.value)}
            rows="5"
            maxLength={1000}
            required
          />

          <div className="journal-form-footer">
            <span aria-live="polite">{memory.length}/1000 characters</span>
            <div>
              {editingId && (
                <button
                  type="button"
                  className="journal-cancel"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}
              <button type="submit" className="journal-submit">
                {editingId ? 'Update Memory' : 'Save Memory'}
              </button>
            </div>
          </div>
        </form>

        <div className="journal-entries">
          <div className="journal-entries-heading">
            <div>
              <span className="section-tag">✦ THE STORY SO FAR</span>
              <h3>Your Travel Memories</h3>
            </div>
            <span className="journal-count">
              {entries.length} {entries.length === 1 ? 'ENTRY' : 'ENTRIES'}
            </span>
          </div>

          {entries.length === 0 ? (
            <div className="journal-empty">
              <span>✧</span>
              <h3>Your story starts here</h3>
              <p>
                Your saved travel memories will appear here.
                Write your first entry to get started!
              </p>
            </div>
          ) : (
            <div className="journal-entry-list">
              {entries.map((entry) => (
                <article className="journal-entry" key={entry.id}>
                  <div className="journal-entry-top">
                    <span className="journal-entry-destination">
                      {entry.destination}
                    </span>
                    <time dateTime={entry.date}>
                      {new Date(`${entry.date}T00:00:00`).toLocaleDateString(
                        'en-IN',
                        {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        }
                      )}
                    </time>
                  </div>

                  <h4>{entry.title}</h4>
                  <p className="journal-entry-memory">{entry.memory}</p>

                  <div className="journal-entry-actions">
                    <button
                      type="button"
                      onClick={() => handleEdit(entry)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(entry.id)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default TravelJournal
