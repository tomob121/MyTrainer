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

const TrainingCourses = lazy(() => import('./components/TrainingCourses.tsx'))

function App() {
  document.title = 'MyTrainer'
  const [trainings, setTrainingData] = useState<Training[]>([])
  const [trainingLines, setTrainingLines] = useState<TrainingLine[]>([])
  const [number, setNumber] = useState(1)


  useEffect(() => {
   
      try {
        const fetchData = async () => {
          const { data: trainingLines } = await getTrainingLines()
          setTrainingLines(trainingLines)
          const { data: trainings } = await getTrainings()
          console.log(trainings + 'hello');
          setTrainingData(trainings)
        }
        fetchData()
      } catch (ex) { }
    
  }, [])




  async function handleDeleteTraining(trainingId: string) {
    let filtered = trainings.filter(training => training._id !== trainingId)
    setTrainingData(filtered)
    await deleteTraining(trainingId)
  }

  async function handleAddTraining() {
    const training = {
      title: `MyTraining ${number}`,
      duration: 0,
      timer: [],
    }
    setNumber(number + 1)
    const { data } = await postTraining(training)
    const addedTrainings = [data, ...trainings]
    setTrainingData(addedTrainings)
    return data
  }


  return (
    <div >
      <NavBar />
      <Routes>
        <Route path='/exercises/:id' element={<ExerciseDetails />} />
        <Route path='/exercises' element={<HomePage />} />
        <Route path='/trainingCourses/:id/end' element={<ExerciseEndScreen  />} />
        <Route path='/trainingCourses/:id/start' element={<Exercise />} />
        <Route path='/trainingCourses/:id' element={<TrCoursesHOP trainingsProps={trainings} />} />
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
