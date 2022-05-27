import * as fakeExerciseService from './fakeExerciseService';
import { getExerciseByTitle } from './fakeExerciseService';

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

export let trainingLineData = [
  {
    id: 0,
    trainingId: 3,
    exerciseId: 11,
    reps: 0,
  },
  {
    id: 1,
    trainingId: 3,
    exerciseId: 11,
    reps: 0,
  },
  {
    id: 2,
    trainingId: 3,
    exerciseId: 10,
    reps: 0,
  },
  {
    id: 3,
    trainingId: 3,
    exerciseId: 9,
    reps: 0,
  },
  {
    id: 4,
    trainingId: 3,
    exerciseId: 4,
    reps: 0,
  },
  {
    id: 5,
    trainingId: 1,
    exerciseId: 31,
    reps: 0,
  },
  {
    id: 6,
    trainingId: 1,
    exerciseId: 32,
    reps: 0,
  },
  {
    id: 7,
    trainingId: 1,
    exerciseId: 30,
    reps: 0,
  },
  {
    id: 8,
    trainingId: 1,
    exerciseId: 29,
    reps: 0,
  },
  {
    id: 9,
    trainingId: 2,
    exerciseId: 1,
    reps: 0,
  },
  {
    id: 10,
    trainingId: 2,
    exerciseId: 16,
    reps: 0,
  },
  {
    id: 11,
    trainingId: 2,
    exerciseId: 17,
    reps: 0,
  },
  {
    id: 12,
    trainingId: 2,
    exerciseId: 13,
    reps: 0,
  },
  {
    id: 13,
    trainingId: 2,
    exerciseId: 31,
    reps: 0,
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

export function deleteTrainingLine(lineId) {
  let trLines = trainingLineData.filter((line) => line.id !== lineId);
  trainingLineData = trLines;
}

export function addTrainingLine(trainingId) {
  trainingLineData.push({
    id: trainingLineData[trainingLineData.length - 1].id + 1,
    trainingId: trainingId,
    exerciseId: 0,
    reps: 0,
  });
}

export function deleteEmptyLines() {
  let filteredEmptyLines = trainingLineData.filter(
    (line) => line.exerciseId !== 0
  );
  return (trainingLineData = filteredEmptyLines);
}

export function changeTrainingExercise(lineDataId, newExerciseTitle) {
  let exercise = getExerciseByTitle(newExerciseTitle);
  let training = trainingLineData.filter(
    (line) => line.id === parseInt(lineDataId)
  );
  training[0].exerciseId = exercise.id;
}

export function getTrainings() {
  return trainingData.map((training) => getTraining(training.id));
}
