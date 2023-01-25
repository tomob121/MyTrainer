import http from "./http.ts";

const apiEndpoint = 'http://localhost:3000/api/trainingLine';

export function getTrainingLines() {
  return http.get(apiEndpoint);
}

export function getTrainingLine(id: number) {
  return http.get(apiEndpoint + '/' + id);
}

export function postTrainingLine(training: object) {
  return http.post(apiEndpoint, training);
}
export function postTrainingLineAll(training: object[]) {
  return http.post(apiEndpoint + '/all', training);
}

export function putTrainingLine(trainingLineId: number, exercise: object) {
  return http.put(apiEndpoint + '/' + trainingLineId, exercise);
}

export function deleteTrainingLine(id: number) {
  return http.delete(apiEndpoint + '/' + id);
}
