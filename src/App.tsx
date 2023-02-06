import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage.tsx';
import TrCoursesHOP from './components/TrainingCourse/withTrCourse.tsx';
import Exercise from './components/Exercise.tsx';
import NavBar from './components/NavBar.tsx';
import ExerciseEndScreen from './components/ExerciseEndScreen.tsx';
import { useState, useEffect, Suspense, lazy } from 'react';
import './App.css';
import ExerciseDetails from './components/ExerciseDetails.tsx';
import { getTrainings, postTraining, deleteTraining } from './service/trainingService.tsx';
import { getTrainingLines } from './service/trainingLineService.tsx';
import { Training, TrainingLine } from './utility/interface';
import TrCourse from './components/TrainingCourse/TrCourseFC.tsx';

const TrainingCourses = lazy(() => import('./components/TrainingCourses.tsx'))

function App() {
  document.title = 'MyTrainer'

  return (
    <div >
      <NavBar />
      <Routes>
        <Route path='/exercises/:id' element={<ExerciseDetails />} />
        <Route path='/exercises' element={<HomePage />} />
        <Route path='/trainingCourses/:id/end' element={<ExerciseEndScreen  />} />
        <Route path='/trainingCourses/:id/start' element={<Exercise />} />
        <Route path='/trainingCourses/:id' element={<TrCourse />} />
        <Route path='/trainingCourses' element={<Suspense fallback={<h1></h1>}>
          <TrainingCourses />
        </Suspense>} />
        <Route path='/' element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
