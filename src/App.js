import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import TrainingCourses from './components/TrainingCourses';
import TrCourse from './components/TrCourse';
import Exercise from './components/Exercise';
import NavBar from './components/NavBar';
import ExerciseEndScreen from './components/ExerciseEndScreen';
import { getTrainings } from './service/fakeTrainingCourses';
import { useState } from 'react';
import './App.css';

function App() {

  const [trainings] = useState(getTrainings())

  return (
    <div >
      <NavBar />
      <Routes className="container">
        <Route path='/home' element={<HomePage />} />
        <Route path='/trainingCourses/:id/end' element={<ExerciseEndScreen trainingsProps={trainings} />} />
        <Route path='/trainingCourses/:id/start' element={<Exercise trainingsProps={trainings} />} />
        <Route path='/trainingCourses/:id' element={<TrCourse trainingsProps={trainings} />} />
        <Route path='/trainingCourses' element={<TrainingCourses trainingsProps={trainings} />} />
        <Route path='/' element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
