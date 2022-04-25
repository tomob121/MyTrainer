import { getTraining } from './fakeTrainingCourses';

const exercises = [
  {
    id: 1,
    title: 'Bench Press',
    bodyPart: 'Arms',
    type: 'Push',
    reps: 0,
  },
  {
    id: 2,
    title: 'Pull up',
    bodyPart: 'Arms',
    type: 'Pull',
    reps: 0,
  },
  {
    id: 3,
    title: 'Squat',
    bodyPart: 'Legs',
    type: 'Push',
    reps: 0,
  },
  {
    id: 4,
    title: 'Dead Lift',
    bodyPart: 'Legs',
    type: 'Pull',
    reps: 0,
  },
  {
    id: 5,
    title: 'Goblet Squat',
    bodyPart: 'Legs',
    type: 'Push',
    reps: 0,
  },
  {
    id: 6,
    title: 'Front Squat',
    bodyPart: 'Legs',
    type: 'Push',
    reps: 0,
  },
  {
    id: 7,
    title: 'Back Squat',
    bodyPart: 'Legs',
    type: 'Push',
    reps: 0,
  },
  {
    id: 8,
    title: 'Overhead Squat',
    bodyPart: 'Legs',
    type: 'Push',
    reps: 0,
  },
  {
    id: 9,
    title: 'Split Squat',
    bodyPart: 'Legs',
    type: 'Push',
    reps: 0,
  },
  {
    id: 10,
    title: 'Unilateral Squat',
    bodyPart: 'Legs',
    type: 'Push',
    reps: 0,
  },
  {
    id: 11,
    title: 'Lunges',
    bodyPart: 'Legs',
    type: 'Push',
    reps: 0,
  },
  {
    id: 12,
    title: 'Shoulder Press',
    bodyPart: 'Arms',
    type: 'Push',
    reps: 0,
  },
  {
    id: 13,
    title: 'Push Press',
    bodyPart: 'Arms',
    type: 'Push',
    reps: 0,
  },
  {
    id: 14,
    title: 'Sumo Dead Lift',
    bodyPart: 'Legs',
    type: 'Pull',
    reps: 0,
  },
  {
    id: 15,
    title: 'One Leag Dead Lift',
    bodyPart: 'Legs',
    type: 'Pull',
    reps: 0,
  },
  {
    id: 16,
    title: 'Chin Up',
    bodyPart: 'Arms',
    type: 'Pull',
    reps: 0,
  },
  {
    id: 17,
    title: 'Inverted Row',
    bodyPart: 'Arms',
    type: 'Pull',
    reps: 0,
  },
  {
    id: 18,
    title: 'Thruster',
    bodyPart: 'Hole Body',
    type: 'Hole Body',
    reps: 0,
  },
  {
    id: 19,
    title: 'Sumo Dead Lift High Pull',
    bodyPart: 'Hole Body',
    type: 'Hole Body',
    reps: 0,
  },
  {
    id: 20,
    title: 'Clean',
    bodyPart: 'Hole Body',
    type: 'Hole Body',
    reps: 0,
  },
  {
    id: 21,
    title: 'Snatch',
    bodyPart: 'Hole Body',
    type: 'Hole Body',
    reps: 0,
  },
  {
    id: 22,
    title: 'Farmer Walk',
    bodyPart: 'Hole Body',
    type: 'Hole Body',
    reps: 0,
  },
  {
    id: 23,
    title: 'Waiter Walk',
    bodyPart: 'Hole Body',
    type: 'Hole Body',
    reps: 0,
  },
  {
    id: 24,
    title: 'Suitcase Walk',
    bodyPart: 'Hole Body',
    type: 'Hole Body',
    reps: 0,
  },
  {
    id: 25,
    title: 'Turkish Get UP',
    bodyPart: 'Hole Body',
    type: 'Hole Body',
    reps: 0,
  },
  {
    id: 26,
    title: 'Kettelbell Swing',
    bodyPart: 'Hole Body',
    type: 'Hole Body',
    reps: 0,
  },
  {
    id: 27,
    title: 'Dead Bug',
    bodyPart: 'Hole Body',
    type: 'Relax',
    reps: 0,
  },
  {
    id: 28,
    title: 'Baby Roll',
    bodyPart: 'Hole Body',
    type: 'Relax',
    reps: 0,
  },
  {
    id: 29,
    title: 'Crawl Forward',
    bodyPart: 'Core',
    type: 'Endure',
    reps: 0,
  },
  {
    id: 30,
    title: 'Crawl Side Ways',
    bodyPart: 'Core',
    type: 'Endure',
    reps: 0,
  },
  {
    id: 31,
    title: 'Plank',
    bodyPart: 'Core',
    type: 'Endure',
    reps: 0,
  },
  {
    id: 32,
    title: 'Antirotation',
    bodyPart: 'Core',
    type: 'Endure',
    reps: 0,
  },
];

export function getExercises() {
  return exercises;
}

export function getExercise(id) {
  return exercises.find((exercise) => exercise.id === id);
}

export function deleteExercise(title) {
  let exerciseLoc = exercises.find((exercise) => exercise.title === title);
  exercises.splice(exercises.indexOf(exerciseLoc), 1);
  return exerciseLoc;
}
