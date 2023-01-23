import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import TrCourse from './components/withTrCourse';
import Exercise from './components/Exercise';
import NavBar from './components/NavBar';
import ExerciseEndScreen from './components/ExerciseEndScreen';
import { useState, useEffect, Suspense, lazy } from 'react';
import './App.css';
import ExerciseDetails from './components/ExerciseDetails';
import { getTrainings, postTraining, deleteTraining } from './service/trainingService';
import { getTrainingLines } from './service/trainingLineService';

const TrainingCourses = lazy(() => import('./components/TrainingCourses'))

function App() {
  document.title = 'MyTrainer'
  const [trainings, setTrainingData] = useState()
  const [trainingLines, setTrainingLines] = useState()
  const [followUpdates, setFollowUpdates] = useState(0)


  useEffect(() => {
    if (!trainings) {
      try {
        const fetchData = async () => {
          const { data: trainingLines } = await getTrainingLines()
          setTrainingLines(trainingLines)
          const { data: trainings } = await getTrainings()
          setTrainingData(trainings)
        }
        fetchData()
      } catch (ex) { }
    }
  }, [trainings, trainingLines, followUpdates])




  async function handleDeleteTraining(trainingId) {
    let filtered = trainings.filter(training => training._id !== trainingId)
    setTrainingData(filtered)
    await deleteTraining(trainingId)
  }

  async function handleAddTraining() {
    const training = {
      title: 'Empty',
      duration: 0,
      timer: [],
    }
    const { data } = await postTraining(training)
    const addedTrainings = [data, ...trainings]
    setTrainingData(addedTrainings)
    return data
  }


  return (
    <div >
      <NavBar />
      <Routes className="container">
        <Route path='/exercises/:id' element={<ExerciseDetails />} />
        <Route path='/exercises' element={<HomePage />} />
        <Route path='/trainingCourses/:id/end' element={<ExerciseEndScreen trainingsProps={trainings} />} />
        <Route path='/trainingCourses/:id/start' element={<Exercise trainingsProps={trainings} trainingLiness={trainingLines} />} />
        <Route path='/trainingCourses/:id' element={<TrCourse trainingsProps={trainings} followUpdates={setFollowUpdates} />} />
        <Route path='/trainingCourses' element={<Suspense fallback={<h1></h1>}>
          <TrainingCourses
            trainingsProps={trainings}
            deleteTraining={handleDeleteTraining}
            addTraining={handleAddTraining}
            trainingLinesProps={trainingLines} />
        </Suspense>} />
        <Route path='/' element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
