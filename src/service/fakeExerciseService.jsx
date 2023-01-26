const exercises = [
  {
    id: 0,
    title: '',
    bodyPart: '',
    type: '',
  },
  {
    id: '1',
    title: 'Bench Press',
    bodyPart: 'Arms',
    type: 'Push',
  },
  {
    id: '2',
    title: 'Pull up',
    bodyPart: 'Arms',
    type: 'Pull',
  },
  {
    id: '3',
    title: 'Squat',
    bodyPart: 'Legs',
    type: 'Push',
  },
  {
    id: '4',
    title: 'Dead Lift',
    bodyPart: 'Legs',
    type: 'Pull',
  },
  {
    id: '5',
    title: 'Goblet Squat',
    bodyPart: 'Legs',
    type: 'Push',
  },
  {
    id: '6',
    title: 'Front Squat',
    bodyPart: 'Legs',
    type: 'Push',
  },
  {
    id: '7',
    title: 'Back Squat',
    bodyPart: 'Legs',
    type: 'Push',
  },
  {
    id: '8',
    title: 'Overhead Squat',
    bodyPart: 'Legs',
    type: 'Push',
  },
  {
    id: '9',
    title: 'Split Squat',
    bodyPart: 'Legs',
    type: 'Push',
  },
  {
    id: '10',
    title: 'Unilateral Squat',
    bodyPart: 'Legs',
    type: 'Push',
  },
  {
    id: '11',
    title: 'Lunges',
    bodyPart: 'Legs',
    type: 'Push',
  },
  {
    id: '12',
    title: 'Shoulder Press',
    bodyPart: 'Arms',
    type: 'Push',
  },
  {
    id: '13',
    title: 'Push Press',
    bodyPart: 'Arms',
    type: 'Push',
  },
  {
    id: '14',
    title: 'Sumo Dead Lift',
    bodyPart: 'Legs',
    type: 'Pull',
  },
  {
    id: '15',
    title: 'One Leag Dead Lift',
    bodyPart: 'Legs',
    type: 'Pull',
  },
  {
    id: '16',
    title: 'Chin Up',
    bodyPart: 'Arms',
    type: 'Pull',
  },
  {
    id: '17',
    title: 'Inverted Row',
    bodyPart: 'Arms',
    type: 'Pull',
  },
  {
    id: '18',
    title: 'Thruster',
    bodyPart: 'HoleBody',
    type: 'HoleBody',
  },
  {
    id: '19',
    title: 'Sumo Dead Lift High Pull',
    bodyPart: 'HoleBody',
    type: 'HoleBody',
  },
  {
    id: '20',
    title: 'Clean',
    bodyPart: 'HoleBody',
    type: 'HoleBody',
  },
  {
    id: '21',
    title: 'Snatch',
    bodyPart: 'HoleBody',
    type: 'HoleBody',
  },
  {
    id: '22',
    title: 'Farmer Walk',
    bodyPart: 'HoleBody',
    type: 'HoleBody',
  },
  {
    id: '23',
    title: 'Waiter Walk',
    bodyPart: 'HoleBody',
    type: 'HoleBody',
  },
  {
    id: '24',
    title: 'Suitcase Walk',
    bodyPart: 'HoleBody',
    type: 'HoleBody',
  },
  {
    id: '25',
    title: 'Turkish Get UP',
    bodyPart: 'HoleBody',
    type: 'HoleBody',
  },
  {
    id: '26',
    title: 'Kettelbell Swing',
    bodyPart: 'HoleBody',
    type: 'HoleBody',
  },
  {
    id: '27',
    title: 'Dead Bug',
    bodyPart: 'HoleBody',
    type: 'Relax',
  },
  {
    id: '28',
    title: 'Baby Roll',
    bodyPart: 'HoleBody',
    type: 'Relax',
  },
  {
    id: '29',
    title: 'Crawl Forward',
    bodyPart: 'Core',
    type: 'Endure',
  },
  {
    id: '30',
    title: 'Crawl Side Ways',
    bodyPart: 'Core',
    type: 'Endure',
  },
  {
    id: '31',
    title: 'Plank',
    bodyPart: 'Core',
    type: 'Endure',
  },
  {
    id: '32',
    title: 'Antirotation',
    bodyPart: 'Core',
    type: 'Endure',
  },
];

export function getExercises() {
  return exercises;
}

export function getExercise(id) {
  return exercises.find((exercise) => exercise.id === id);
}
export function getExerciseByTitle(title) {
  let exercise = exercises.find((exercise) => exercise.title === title);
  return exercise;
}

export function deleteExercise(id) {
  let exerciseLoc = exercises.find((exercise) => exercise.id === id);
  exercises.splice(exercises.indexOf(exerciseLoc), 1);
  return exerciseLoc;
}
