import http from './http.ts';

const apiEndpoint = 'http://localhost:3000/api/exercise';

export function getExercises() {
  return http.get(apiEndpoint);
}

export function getExercise(id: string) {
  return http.get(apiEndpoint + '/' + id);
}

export function postExercise(exercise: object) {
  return http.post(apiEndpoint, exercise);
}

export function putExercise(exercise: object) {
  return http.post(apiEndpoint, exercise);
}

export function deleteExercise(id: string) {
  return http.delete(apiEndpoint + id);
}
