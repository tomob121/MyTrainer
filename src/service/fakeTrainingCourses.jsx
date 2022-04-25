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
    trainingId: 2,
    exerciseId: 1,
  },
  {
    trainingId: 2,
    exerciseId: 3,
  },
  {
    trainingId: 2,
    exerciseId: 4,
  },
  {
    trainingId: 2,
    exerciseId: 5,
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
