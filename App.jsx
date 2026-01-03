import { useState } from 'react'
import './App.css'

function App() {
  const [courses, setCourses] = useState([
    { id: 1, name: 'React Fundamentals' },
    { id: 2, name: 'JavaScript Advanced' },
    { id: 3, name: 'CSS Mastery' },
    { id: 4, name: 'Node.js Backend' },
    { id: 5, name: 'Database Design' }
  ])

  const [draggedCourse, setDraggedCourse] = useState(null)

  const handleDragStart = (e, course) => {
    setDraggedCourse(course)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e, targetCourse) => {
    e.preventDefault()
    
    if (draggedCourse.id === targetCourse.id) return

    const draggedIndex = courses.findIndex(c => c.id === draggedCourse.id)
    const targetIndex = courses.findIndex(c => c.id === targetCourse.id)

    const newCourses = [...courses]
    newCourses.splice(draggedIndex, 1)
    newCourses.splice(targetIndex, 0, draggedCourse)

    setCourses(newCourses)
    setDraggedCourse(null)
  }

  return (
    <div className="app-container">
      <h1>Draggable Courses</h1>
      <p className="instructions">Drag and drop to reorder courses</p>
      <div className="courses-container">
        {courses.map((course) => (
          <div
            key={course.id}
            className="course-card"
            draggable
            onDragStart={(e) => handleDragStart(e, course)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, course)}
          >
            <div className="course-number">{course.id}</div>
            <h3 className="course-name">{course.name}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
