import * as fakeExerciseService from './fakeExerciseService';

export const trainingCourses = [
  {
    id: 1,
    title: 'Core body workout',
    exercises: [],
    duration: 20,
  },
  {
    id: 2,
    title: 'Upper body workout',
    exercises: [],
    duration: 30,
  },
  {
    id: 3,
    title: 'Lower body workout',
    exercises: [],
    duration: 40,
  },
];

export const trainingExerciseRelation = [
  {
    trainingId: 3,
    exerciseId: 11,
  },
  {
    trainingId: 3,
    exerciseId: 10,
  },
  {
    trainingId: 3,
    exerciseId: 9,
  },
  {
    trainingId: 3,
    exerciseId: 4,
  },
  {
    trainingId: 1,
    exerciseId: 31,
  },
  {
    trainingId: 1,
    exerciseId: 32,
  },
  {
    trainingId: 1,
    exerciseId: 30,
  },
  {
    trainingId: 1,
    exerciseId: 29,
  },
  {
    trainingId: 2,
    exerciseId: 1,
  },
  {
    trainingId: 2,
    exerciseId: 16,
  },
  {
    trainingId: 2,
    exerciseId: 17,
  },
  {
    trainingId: 2,
    exerciseId: 13,
  },
];

export function getTraining(id) {
  let training = trainingCourses.find(
    (trainingCourse) => trainingCourse.id === id
  );
  let exercises = trainingExerciseRelation
    .filter((relation) => relation.trainingId === id)
    .map((relation) => relation.exerciseId)
    .map((exerciseId) => fakeExerciseService.getExercise(exerciseId));

  training.exercises = exercises;

  return training;
}
