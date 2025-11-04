import { BookOpen, Calendar, MessageSquare, User } from 'lucide-react'

const tabs = [
  { key: 'Courses', label: 'Courses', icon: BookOpen },
  { key: 'Schedule', label: 'Schedule', icon: Calendar },
  { key: 'Messages', label: 'Messages', icon: MessageSquare },
]

export default function Navbar({ currentTab, onChangeTab }) {
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 grid place-items-center text-white font-bold">
            T
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-900 leading-tight">TutorLink</div>
            <div className="text-xs text-gray-500">One-to-one learning made simple</div>
          </div>
        </div>

        <nav className="flex items-center gap-1">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => onChangeTab(key)}
              className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                currentTab === key
                  ? 'bg-gray-900 text-white shadow'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              aria-current={currentTab === key ? 'page' : undefined}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>

        <div className="hidden sm:flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-700 hover:bg-gray-200">
            <User size={18} />
            Sign in
          </button>
        </div>
      </div>
    </header>
  )
}
