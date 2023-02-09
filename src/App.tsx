import { Routes, Route } from 'react-router-dom'
import AllExercises from './components/AllExercises.tsx'
import Exercise from './components/Exercise.tsx'
import NavBar from './components/NavBar.tsx'
import ExerciseEndScreen from './components/ExerciseEndScreen.tsx'
import { Suspense, lazy } from 'react'
import './App.css'
import ExerciseDetails from './components/ExerciseDetails.tsx'
import TrCourse from './components/TrainingCourse/TrCourse.tsx'

const TrainingCourses = lazy(
  () => import('./components/TrainingCourses/TrainingCourses.tsx')
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
