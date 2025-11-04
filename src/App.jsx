import { useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import Courses, { courseData } from './components/Courses'
import Scheduler from './components/Scheduler'
import Messages from './components/Messages'

function App() {
  const [tab, setTab] = useState('Courses')
  const [selectedCourseId, setSelectedCourseId] = useState(null)

  const orderedCourses = useMemo(() => {
    if (!selectedCourseId) return courseData
    const selected = courseData.find((c) => c.id === selectedCourseId)
    const rest = courseData.filter((c) => c.id !== selectedCourseId)
    return selected ? [selected, ...rest] : courseData
  }, [selectedCourseId])

  const handleSelectCourse = (course) => {
    setSelectedCourseId(course.id)
    setTab('Schedule')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50">
      <Navbar currentTab={tab} onChangeTab={setTab} />

      {tab === 'Courses' && <Courses onSelectCourse={handleSelectCourse} />}

      {tab === 'Schedule' && (
        <Scheduler
          courses={orderedCourses}
          onScheduled={() => {
            setTab('Messages')
          }}
        />
      )}

      {tab === 'Messages' && <Messages />}

      <footer className="mt-16 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>© {new Date().getFullYear()} TutorLink. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <a className="hover:text-gray-900" href="#">Privacy</a>
            <a className="hover:text-gray-900" href="#">Terms</a>
            <a className="hover:text-gray-900" href="#">Support</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
