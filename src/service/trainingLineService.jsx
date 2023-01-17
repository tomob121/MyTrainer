import http from './http';

const apiEndpoint = 'http://localhost:3000/api/trainingLine';

export function getTrainingLines() {
  return http.get(apiEndpoint);
}

export function getTrainingLine(id) {
  return http.get(apiEndpoint + '/' + id);
}

export function postTrainingLine(training) {
  return http.post(apiEndpoint, training);
}
export function postTrainingLineAll(training) {
  return http.post(apiEndpoint + '/all', training);
}

export function putTrainingLine(trainingLineId, exercise) {
  return http.put(apiEndpoint + '/' + trainingLineId, exercise);
}

export function deleteTrainingLine(id) {
  return http.delete(apiEndpoint + '/' + id);
}
