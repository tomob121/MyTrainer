import http from './http';

const apiEndpoint = 'http://localhost:3000/api/exercise';

export function getExercises() {
  return http.get(apiEndpoint);
}

export function getExercise(id) {
  return http.get(apiEndpoint + '/' + id);
}

export function postExercise(exercise) {
  return http.post(apiEndpoint, exercise);
}

export function putExercise(exercise) {
  return http.post(apiEndpoint, exercise);
}

export function deleteExercise(id) {
  return http.delete(apiEndpoint + id);
}
