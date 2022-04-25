import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import TrainingCourses from './components/TrainingCourses';
import NavBar from './components/NavBar';
import './App.css';

function App() {
  return (
    <div >
      <NavBar />
      <Routes className="container">
        <Route path='/home' element={<HomePage />} />
        <Route path='/trainingCourses' element={<TrainingCourses />} />
        <Route path='/' element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
