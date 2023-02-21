import { Routes, Route } from 'react-router-dom'
import AllExercises from './components/AllExercises'
import Exercise from './components/Exercise'
import NavBar from './components/NavBar'
import ExerciseEndScreen from './components/ExerciseEndScreen'
import { Suspense, lazy } from 'react'
import ExerciseDetails from './components/ExerciseDetails'
import TrCourse from './components/TrainingCourse/TrainingCourse'
import TestGround from './components/TestGround'
import './App.css'

const TrainingCourses = lazy(
  () => import('./components/TrainingCourses/TrainingCourses')
)

function App() {
  document.title = 'MyTrainer'

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/exercises/:id" element={<ExerciseDetails />} />
        <Route path="/exercises" element={<AllExercises />} />
        <Route
          path="/trainingCourses/:id/end"
          element={<ExerciseEndScreen />}
        />
        <Route path="/trainingCourses/:id/start" element={<Exercise />} />
        <Route path="/trainingCourses/:id" element={<TrCourse />} />
        <Route
          path="/trainingCourses"
          element={
            <Suspense fallback={<h1></h1>}>
              <TrainingCourses />
            </Suspense>
          }
        />
        <Route path="/" element={<AllExercises />} />
      </Routes>
    </div>
  )
}

export default App
