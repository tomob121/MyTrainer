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
import { getExercises } from './service/fakeExerciseService';
import ExerciseDetails from './components/ExerciseDetails';

function App() {
  const [exercises] = useState(getExercises())
  const [trainings, setTrainings] = useState(getTrainings())


  function handleDeleteTraining(trainingId) {
    let filtered = trainings.filter(training => training.id !== trainingId)
    setTrainings(filtered)
  }

  function handleAddTraining() {
    let addedTrainings = trainings
    addedTrainings.push({
      id: makeId(),
      title: 'Empty',
      trainingLines: [],
      duration: 0,
      timer: [],
    },)
    setTrainings(addedTrainings)
  }

  function makeId() {
    if (trainings.length === 0) return 1
    return trainings[trainings.length - 1].id + 1
  }

  return (
    <div >
      <NavBar />
      <Routes className="container">
        <Route path='/exercises/:id' element={<ExerciseDetails exercises={exercises} />} />
        <Route path='/exercises' element={<HomePage />} />
        <Route path='/trainingCourses/:id/end' element={<ExerciseEndScreen trainingsProps={trainings} />} />
        <Route path='/trainingCourses/:id/start' element={<Exercise trainingsProps={trainings} />} />
        <Route path='/trainingCourses/:id' element={<TrCourse trainingsProps={trainings} />} />
        <Route path='/trainingCourses' element={<TrainingCourses trainingsProps={trainings} deleteTraining={handleDeleteTraining} addTraining={handleAddTraining} />} />
        <Route path='/' element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
