import { useState } from 'react'

const CreateEvent = () => {
  const [form, setForm] = useState({ title: '', date: '', description: '' })

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log('Event Created:', form)
    // Later: send to backend
  }

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create a New Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow">
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          className="w-full p-2 border rounded"
          value={form.title}
          onChange={handleChange}
        />
        <input
          type="date"
          name="date"
          className="w-full p-2 border rounded"
          value={form.date}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Event Description"
          className="w-full p-2 border rounded"
          rows="4"
          value={form.description}
          onChange={handleChange}
        />
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Submit
        </button>
      </form>
    </div>
  )
}

export default CreateEvent
