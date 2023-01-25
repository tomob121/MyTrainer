import http from './http.ts';

const apiEndpoint = 'http://localhost:3000/api/training';
const trainingLineApiEndpoint = 'http://localhost:3000/api/trainingLine';

export function getTrainings() {
  return http.get(apiEndpoint);
}

export function getTraining(id: number) {
  return http.get(apiEndpoint + '/' + id);
}

export function postTraining(training: object) {
  return http.post(apiEndpoint, training);
}

export function putTraining(exercise: object) {
  return http.post(apiEndpoint, exercise);
}

export function deleteTraining(id: number) {
  http.delete(trainingLineApiEndpoint + '/all/' + id);
  return http.delete(apiEndpoint + '/' + id);
}
