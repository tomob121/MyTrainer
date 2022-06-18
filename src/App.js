import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import TrainingCourses from './components/TrainingCourses';
import TrCourse from './components/TrCourse';
import Exercise from './components/Exercise';
import NavBar from './components/NavBar';
import ExerciseEndScreen from './components/ExerciseEndScreen';
import './App.css';

function App() {
  return (
    <div >
      <NavBar />
      <Routes className="container">
        <Route path='/home' element={<HomePage />} />
        <Route path='/trainingCourses/:id/end' element={<ExerciseEndScreen />} />
        <Route path='/trainingCourses/:id/start' element={<Exercise />} />
        <Route path='/trainingCourses/:id' element={<TrCourse />} />
        <Route path='/trainingCourses' element={<TrainingCourses />} />
        <Route path='/' element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
