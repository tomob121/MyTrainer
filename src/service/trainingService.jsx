import http from './http';

const apiEndpoint = 'http://localhost:3000/api/training';
const trainingLineApiEndpoint = 'http://localhost:3000/api/trainingLine';

export function getTrainings() {
  return http.get(apiEndpoint);
}

export function getTraining(id) {
  return http.get(apiEndpoint + '/' + id);
}

export function postTraining(training) {
  return http.post(apiEndpoint, training);
}

export function putTraining(exercise) {
  return http.post(apiEndpoint, exercise);
}

export function deleteTraining(id) {
  http.delete(trainingLineApiEndpoint + '/all/' + id);
  return http.delete(apiEndpoint + '/' + id);
}
