import { useState } from 'react'
import { Calendar, Clock, ChevronRight } from 'lucide-react'

export default function Scheduler({ courses = [], onScheduled }) {
  const [courseId, setCourseId] = useState(courses[0]?.id ?? '')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [mode, setMode] = useState('Online')
  const [note, setNote] = useState('')
  const [success, setSuccess] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const course = courses.find((c) => String(c.id) === String(courseId))
    const payload = { course, date, time, mode, note }
    setSuccess(payload)
    onScheduled?.(payload)
  }

  return (
    <section className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-1">Schedule a session</h2>
      <p className="text-gray-500 mb-6">Pick a course, time, and format that works for you.</p>

      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm text-gray-700">Course</span>
            <select
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
            >
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title} — {c.tutor}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm text-gray-700">Mode</span>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
            >
              <option>Online</option>
              <option>In person</option>
            </select>
          </label>

          <label className="block">
            <span className="text-sm text-gray-700">Date</span>
            <div className="relative mt-1">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
              />
              <Calendar size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </label>

          <label className="block">
            <span className="text-sm text-gray-700">Time</span>
            <div className="relative mt-1">
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
              />
              <Clock size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </label>
        </div>

        <label className="block mt-4">
          <span className="text-sm text-gray-700">Notes for your tutor</span>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            placeholder="Share goals, topics, or materials you'd like to cover"
            className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
          />
        </label>

        <div className="mt-6 flex items-center justify-end">
          <button
            type="submit"
            disabled={!courseId || !date || !time}
            className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
          >
            Confirm booking <ChevronRight size={18} />
          </button>
        </div>

        {success && (
          <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
            Session booked: <strong>{success.course?.title}</strong> with{' '}
            <strong>{success.course?.tutor}</strong> on <strong>{success.date}</strong> at{' '}
            <strong>{success.time}</strong> ({success.mode}).
          </div>
        )}
      </form>
    </section>
  )
}
