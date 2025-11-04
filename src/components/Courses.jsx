import { Star, BookOpen, ChevronRight } from 'lucide-react'

const courseData = [
  {
    id: 1,
    title: 'Algebra Fundamentals',
    tutor: 'Maya Patel',
    rating: 4.8,
    reviews: 124,
    tags: ['Math', 'High School'],
    price: 35,
  },
  {
    id: 2,
    title: 'Intro to Python',
    tutor: 'Alex Johnson',
    rating: 4.9,
    reviews: 201,
    tags: ['Programming', 'Beginner'],
    price: 40,
  },
  {
    id: 3,
    title: 'AP Physics 1 Prep',
    tutor: 'Dr. Emily Chen',
    rating: 4.7,
    reviews: 89,
    tags: ['Physics', 'Exam Prep'],
    price: 45,
  },
  {
    id: 4,
    title: 'Spanish Conversation',
    tutor: 'Carlos Martínez',
    rating: 4.6,
    reviews: 76,
    tags: ['Language', 'Intermediate'],
    price: 30,
  },
]

function Rating({ value }) {
  const full = Math.floor(value)
  const half = value - full >= 0.5
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className={
            i < full || (i === full && half)
              ? 'fill-amber-400 text-amber-400'
              : 'text-gray-300'
          }
        />
      ))}
      <span className="ml-1 text-xs text-gray-500">{value.toFixed(1)}</span>
    </div>
  )
}

export default function Courses({ onSelectCourse }) {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <BookOpen size={22} /> Courses
          </h2>
          <p className="text-gray-500 text-sm">Browse and book one-to-one sessions</p>
        </div>
        <div className="relative w-72 hidden sm:block">
          <input
            type="text"
            placeholder="Search courses, tutors, topics..."
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:border-gray-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courseData.map((course) => (
          <article
            key={course.id}
            className="group rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700">
                  {course.title}
                </h3>
                <div className="mt-1 text-sm text-gray-600">with {course.tutor}</div>
              </div>
              <div className="text-right">
                <Rating value={course.rating} />
                <div className="text-xs text-gray-500">{course.reviews} reviews</div>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {course.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-gray-900 font-semibold">${course.price}/hr</div>
              <button
                onClick={() => onSelectCourse?.(course)}
                className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-800"
              >
                Book session <ChevronRight size={18} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export { courseData }
