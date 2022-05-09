import * as fakeExerciseService from './fakeExerciseService';

export const trainingData = [
  {
    id: 1,
    title: 'Core body workout',
    trainingLines: [],
    duration: 20,
  },
  {
    id: 2,
    title: 'Upper body workout',
    trainingLines: [],
    duration: 30,
  },
  {
    id: 3,
    title: 'Lower body workout',
    trainingLines: [],
    duration: 40,
  },
];

export const trainingLineData = [
  {
    id: 1,
    trainingId: 3,
    exerciseId: 11,
    reps: null,
  },
  {
    id: 2,
    trainingId: 3,
    exerciseId: 10,
    reps: null,
  },
  {
    id: 3,
    trainingId: 3,
    exerciseId: 9,
    reps: null,
  },
  {
    id: 4,
    trainingId: 3,
    exerciseId: 4,
    reps: null,
  },
  {
    id: 5,
    trainingId: 1,
    exerciseId: 31,
    reps: null,
  },
  {
    id: 6,
    trainingId: 1,
    exerciseId: 32,
    reps: null,
  },
  {
    id: 7,
    trainingId: 1,
    exerciseId: 30,
    reps: null,
  },
  {
    id: 8,
    trainingId: 1,
    exerciseId: 29,
    reps: null,
  },
  {
    id: 9,
    trainingId: 2,
    exerciseId: 1,
    reps: null,
  },
  {
    id: 10,
    trainingId: 2,
    exerciseId: 16,
    reps: null,
  },
  {
    id: 11,
    trainingId: 2,
    exerciseId: 17,
    reps: null,
  },
  {
    id: 12,
    trainingId: 2,
    exerciseId: 13,
    reps: null,
  },
  {
    id: 13,
    trainingId: 2,
    exerciseId: 31,
    reps: null,
  },
];

export function getTraining(id) {
  let training = trainingData.find(
    (trainingCourse) => trainingCourse.id === id
  );
  let trainingLines = trainingLineData.filter(
    (trainingLine) => trainingLine.trainingId === id
  );
  trainingLines.forEach((trainingLine) => {
    trainingLine.exercise = fakeExerciseService.getExercise(
      trainingLine.exerciseId
    );
  });
  // .map((relation) => relation.exerciseId)
  // .map((exerciseId) => fakeExerciseService.getExercise(exerciseId));

  training.trainingLines = trainingLines;
  return training;
}

export function getTrainings() {
  return trainingData.map((training) => getTraining(training.id));
}
