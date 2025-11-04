import { MessageSquare } from 'lucide-react'

const sampleConversations = [
  {
    id: 1,
    name: 'Maya Patel',
    course: 'Algebra Fundamentals',
    lastMessage: 'Great progress last time! Shall we review quadratic equations?',
    time: '2h ago',
    unread: 2,
  },
  {
    id: 2,
    name: 'Alex Johnson',
    course: 'Intro to Python',
    lastMessage: 'I shared a notebook on loops and functions.',
    time: '1d ago',
    unread: 0,
  },
  {
    id: 3,
    name: 'Dr. Emily Chen',
    course: 'AP Physics 1 Prep',
    lastMessage: 'Practice problems uploaded. Let me know questions.',
    time: '3d ago',
    unread: 0,
  },
]

function Avatar({ name }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
  return (
    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-indigo-500 text-white grid place-items-center text-sm font-semibold">
      {initials}
    </div>
  )
}

export default function Messages() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
          <MessageSquare size={22} /> Messages
        </h2>
        <button className="text-sm text-gray-600 hover:text-gray-900">New message</button>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white divide-y divide-gray-200 overflow-hidden shadow-sm">
        {sampleConversations.map((c) => (
          <div key={c.id} className="flex items-center gap-4 p-4 hover:bg-gray-50">
            <Avatar name={c.name} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="truncate font-medium text-gray-900">{c.name}</div>
                <div className="text-xs text-gray-500 whitespace-nowrap">{c.time}</div>
              </div>
              <div className="text-xs text-gray-500 truncate">{c.course}</div>
              <div className="text-sm text-gray-700 truncate mt-0.5">{c.lastMessage}</div>
            </div>
            {c.unread > 0 && (
              <span className="ml-2 inline-flex items-center justify-center rounded-full bg-gray-900 px-2.5 py-1 text-xs font-medium text-white">
                {c.unread}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
