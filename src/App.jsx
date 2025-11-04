import { useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import Courses, { courseData } from './components/Courses'
import Scheduler from './components/Scheduler'
import Messages from './components/Messages'

function App() {
  const [tab, setTab] = useState('Home')
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

  const FeaturedCourses = () => (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {courseData.slice(0, 4).map((c) => (
        <button
          key={c.id}
          onClick={() => handleSelectCourse(c)}
          className="text-left rounded-xl border border-gray-200 bg-white/80 backdrop-blur p-4 hover:shadow-md transition-shadow"
        >
          <div className="text-sm text-gray-500">{c.tutor}</div>
          <div className="mt-1 font-semibold text-gray-900 line-clamp-2">{c.title}</div>
          <div className="mt-2 inline-flex items-center rounded-full bg-gray-900 px-2.5 py-1 text-xs text-white">
            ${c.price}/hr
          </div>
        </button>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50">
      <Navbar currentTab={tab} onChangeTab={setTab} />

      {tab === 'Home' && (
        <main>
          <section className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]">
              <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-fuchsia-300/40 blur-3xl" />
              <div className="absolute top-1/3 -left-10 h-72 w-72 rounded-full bg-indigo-300/40 blur-3xl" />
              <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-violet-300/40 blur-3xl" />
            </div>

            <div className="relative max-w-6xl mx-auto px-4 pt-12 pb-10">
              <div className="max-w-2xl">
                <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900">
                  Master any subject with one-to-one tutoring
                </h1>
                <p className="mt-4 text-gray-600 text-lg">
                  Personalized sessions with vetted tutors. Book in minutes and start learning today.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setTab('Courses')}
                    className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                  >
                    Browse courses
                  </button>
                  <button
                    onClick={() => setTab('Schedule')}
                    className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-900 border border-gray-300 hover:bg-gray-50"
                  >
                    Book a session
                  </button>
                </div>

                <FeaturedCourses />
              </div>
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Top tutors', desc: 'Experienced, vetted experts across subjects.' },
                { title: 'Flexible scheduling', desc: 'Find times that fit your routine.' },
                { title: 'Online or in person', desc: 'Learn the way you prefer.' },
                { title: 'Fair pricing', desc: 'Transparent hourly rates with no surprises.' },
              ].map((f) => (
                <div key={f.title} className="rounded-xl border border-gray-200 bg-white p-5">
                  <div className="font-semibold text-gray-900">{f.title}</div>
                  <div className="mt-1 text-sm text-gray-600">{f.desc}</div>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

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
